"use server";

import { redirect } from "next/navigation";

import { getDbUser } from "@/lib/getDbUser";
import { prisma } from "@/lib/prisma";

export async function saveCheckoutAddress(
  formData: FormData
) {
  const user = await getDbUser();

  if (!user) {
    redirect("/sign-in?redirect_url=/checkout");
  }

  const fullName = String(
    formData.get("fullName") || ""
  ).trim();

  const phone = String(
    formData.get("phone") || ""
  ).trim();

  const addressLine1 = String(
    formData.get("addressLine1") || ""
  ).trim();

  const addressLine2 = String(
    formData.get("addressLine2") || ""
  ).trim();

  const city = String(
    formData.get("city") || ""
  ).trim();

  const state = String(
    formData.get("state") || ""
  ).trim();

  const postalCode = String(
    formData.get("postalCode") || ""
  ).trim();

  const country = String(
    formData.get("country") || ""
  ).trim();

  if (
    !fullName ||
    !addressLine1 ||
    !city ||
    !state ||
    !postalCode ||
    !country
  ) {
    throw new Error(
      "Please complete all required delivery fields."
    );
  }

  await prisma.address.updateMany({
    where: {
      userId: user.id,
      isDefault: true,
    },
    data: {
      isDefault: false,
    },
  });

  const address = await prisma.address.create({
    data: {
      userId: user.id,
      fullName,
      phone: phone || null,
      addressLine1,
      addressLine2:
        addressLine2 || null,
      city,
      state,
      postalCode,
      country,
      isDefault: true,
    },
  });

  redirect(
    `/checkout/review?addressId=${address.id}`
  );
}