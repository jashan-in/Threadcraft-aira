"use client";

import { useState } from "react";
import { Heart, Minus, Plus, Upload } from "lucide-react";

import type { Product } from "@/types/product";

type ProductDetailsProps = {
  product: Product;
};

const sizes = ["S", "M", "L", "XL", "XXL"];

const colours = [
  {
    name: "White",
    value: "#ffffff",
  },
  {
    name: "Black",
    value: "#222222",
  },
  {
    name: "Pink",
    value: "#e8a5ad",
  },
  {
    name: "Beige",
    value: "#d8c5aa",
  },
];

const locations = [
  "Left Chest",
  "Right Chest",
  "Sleeve",
  "Center",
  "Back",
];

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColour, setSelectedColour] =
    useState("White");

  const [selectedLocation, setSelectedLocation] =
    useState("Left Chest");

  const [quantity, setQuantity] = useState(1);

  const [customText, setCustomText] = useState("");
  const [notes, setNotes] = useState("");

  const [uploadedFile, setUploadedFile] =
    useState<File | null>(null);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const totalPrice = product.price * quantity;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d98186]">
        {product.category}
      </p>

      <h1 className="mt-3 font-serif text-4xl text-[#2f2928]">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl font-semibold text-[#2f2928]">
        ₹{totalPrice.toLocaleString("en-IN")}
      </p>

      <p className="mt-6 max-w-lg text-sm leading-7 text-neutral-600">
        Handmade embroidery created with care and attention
        to detail. Personalize this product and make it
        uniquely yours.
      </p>

      {/* Size */}
      <div className="mt-8 border-t border-[#eee2de] pt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            Choose Size
          </p>

          <button
            type="button"
            className="text-xs text-[#d98186] hover:underline"
          >
            Size Guide
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`flex h-11 min-w-14 items-center justify-center rounded-full border px-4 text-sm transition ${
                selectedSize === size
                  ? "border-[#d98186] bg-[#d98186] text-white"
                  : "border-[#eadad6] bg-white hover:border-[#d98186] hover:text-[#d98186]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Colour
        </p>

        <p className="mt-1 text-xs text-neutral-500">
          Selected: {selectedColour}
        </p>

        <div className="mt-4 flex flex-wrap gap-4">
          {colours.map((colour) => (
            <button
              key={colour.name}
              type="button"
              onClick={() =>
                setSelectedColour(colour.name)
              }
              aria-label={colour.name}
              title={colour.name}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                selectedColour === colour.name
                  ? "border-[#d98186]"
                  : "border-transparent"
              }`}
            >
              <span
                className="h-7 w-7 rounded-full border border-neutral-300"
                style={{
                  backgroundColor: colour.value,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Embroidery Location */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Embroidery Location
        </p>

        <div className="mt-3 flex flex-wrap gap-3">
          {locations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() =>
                setSelectedLocation(location)
              }
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                selectedLocation === location
                  ? "border-[#d98186] bg-[#fcebea] text-[#c46f75]"
                  : "border-[#eadad6] bg-white text-[#2f2928] hover:border-[#d98186]"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Personalization */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Custom Text
        </p>

        <input
          value={customText}
          onChange={(event) =>
            setCustomText(event.target.value)
          }
          type="text"
          maxLength={30}
          placeholder="Example: Jashan, A ❤️ S, Mom"
          className="mt-3 w-full rounded-xl border border-[#eadad6] px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
        />

        <div className="mt-2 text-right text-xs text-neutral-400">
          {customText.length}/30
        </div>
      </div>

      {/* Upload */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Upload Your Design
        </p>

        <p className="mt-1 text-xs text-neutral-500">
          Optional. Upload a logo, reference image, or design
          idea.
        </p>

        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#eadad6] bg-[#fffaf8] px-6 py-8 text-center transition hover:border-[#d98186]">
          <Upload
            size={24}
            className="text-[#d98186]"
          />

          <span className="mt-3 text-sm font-medium text-[#2f2928]">
            Click to upload design
          </span>

          <span className="mt-1 text-xs text-neutral-500">
            PNG, JPG or JPEG
          </span>

          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                setUploadedFile(file);
              }
            }}
          />
        </label>

        {uploadedFile && (
          <div className="mt-3 rounded-lg bg-[#fff8f4] px-4 py-3 text-xs text-neutral-600">
            Uploaded:{" "}
            <span className="font-semibold">
              {uploadedFile.name}
            </span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Special Instructions
        </p>

        <textarea
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          rows={4}
          placeholder="Tell us how you'd like your embroidery to look..."
          className="mt-3 w-full resize-none rounded-xl border border-[#eadad6] px-4 py-3 text-sm outline-none transition focus:border-[#d98186]"
        />
      </div>

      {/* Quantity */}
      <div className="mt-8">
        <p className="text-sm font-semibold">
          Quantity
        </p>

        <div className="mt-3 flex w-fit items-center rounded-full border border-[#eadad6] bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="flex h-11 w-11 items-center justify-center rounded-l-full transition hover:bg-[#fff0ef]"
          >
            <Minus size={15} />
          </button>

          <span className="min-w-12 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="flex h-11 w-11 items-center justify-center rounded-r-full transition hover:bg-[#fff0ef]"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl bg-[#fff8f4] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#d98186]">
          Your Selection
        </p>

        <div className="mt-4 space-y-2 text-sm text-neutral-600">
          <div className="flex justify-between">
            <span>Size</span>
            <span className="font-medium text-[#2f2928]">
              {selectedSize}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Colour</span>
            <span className="font-medium text-[#2f2928]">
              {selectedColour}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Embroidery</span>
            <span className="font-medium text-[#2f2928]">
              {selectedLocation}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Quantity</span>
            <span className="font-medium text-[#2f2928]">
              {quantity}
            </span>
          </div>

          {customText && (
            <div className="flex justify-between">
              <span>Custom Text</span>
              <span className="font-medium text-[#2f2928]">
                {customText}
              </span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-t border-[#eadad6] pt-4 text-base">
            <span className="font-semibold">
              Total
            </span>

            <span className="font-semibold text-[#d98186]">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          className="flex-1 rounded-full bg-[#d98186] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#bd656b]"
        >
          ADD TO BAG
        </button>

        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex h-13 w-13 items-center justify-center rounded-full border border-[#d98186] text-[#d98186] transition hover:bg-[#fff0ef]"
        >
          <Heart size={20} />
        </button>
      </div>

      <div className="mt-8 space-y-2 rounded-xl border border-[#f1e4df] p-5 text-sm text-neutral-600">
        <p>🌸 Handmade with care</p>
        <p>🎁 Perfect for gifting</p>
        <p>🪡 Custom embroidery available</p>
        <p>🚚 Delivery available</p>
      </div>
    </div>
  );
}