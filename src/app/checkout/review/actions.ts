"use server";

import { redirect } from "next/navigation";

import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

type CheckoutCartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  slug: string;

  quantity: number;

  size?: string;
  colour?: string;
  embroideryLocation?: string;
  customText?: string;
  notes?: string;
  uploadedFileName?: string;
};

export async function createOrder(
  addressId: string,
  checkoutKey: string,
  cartItems: CheckoutCartItem[]
) {
  const user = await getDbUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/checkout");
  }

  if (!addressId) {
    throw new Error("Delivery address is required.");
  }

  if (!checkoutKey) {
    throw new Error("Checkout key is required.");
  }

  if (!cartItems.length) {
    throw new Error("Your cart is empty.");
  }

  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId: user.id,
    },
  });

  if (!address) {
    throw new Error("Delivery address could not be found.");
  }

  // If this checkout was already submitted,
  // return the existing order instead of creating another one.
  const existingOrder = await prisma.order.findUnique({
    where: {
      checkoutKey,
    },
  });

  if (existingOrder) {
    if (existingOrder.userId !== user.id) {
      throw new Error("Invalid checkout.");
    }

    return {
      orderId: existingOrder.id,
      orderNumber: existingOrder.orderNumber,
    };
  }

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const orderNumber = `TA-${Date.now()}`;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      checkoutKey,

      userId: user.id,
      addressId: address.id,

      subtotal,
      shipping,
      total,

      status: "PENDING",
      paymentStatus: "PENDING",

      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.name,
          productSlug: item.slug,
          image: item.image,

          price: item.price,
          quantity: item.quantity,

          size: item.size || null,
          colour: item.colour || null,

          embroideryLocation:
            item.embroideryLocation || null,

          customText:
            item.customText || null,

          notes:
            item.notes || null,

          uploadedDesignUrl: null,
        })),
      },
    },
  });

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
  };
}