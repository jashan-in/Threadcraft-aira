export type CartItem = {
  cartItemId: string;

  productId: number;
  name: string;
  price: number;
  image: string;
  slug: string;

  quantity: number;

  size: string;
  colour: string;
  embroideryLocation: string;

  customText?: string;
  notes?: string;

  uploadedFileName?: string;
};