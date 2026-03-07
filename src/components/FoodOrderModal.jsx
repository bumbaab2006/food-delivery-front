"use client";
import React, { useState } from "react";

export default function FoodOrderModal({ product, onClose, cart, setCart }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    const newItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      description: product.description,
    };

    const existingIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart = [...cart];
    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push(newItem);
    }

    setCart(updatedCart);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20150f]/65 p-4 backdrop-blur-sm">
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-[36px] border border-[#f0ddd0] bg-white md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl text-[#20150f]"
        >
          ×
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[380px] md:h-full object-cover"
        />

        <div className="flex flex-col justify-between p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ef4444]">
              Order detail
            </p>
            <h2 className="mb-4 mt-3 text-4xl text-[#20150f] [font-family:var(--font-fraunces)]">
              {product.name}
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-[#6f5a4b]">
              Select quantity and confirm your order.
            </p>

            <p className="mb-6 text-3xl font-semibold text-[#20150f]">
              Price: ${product.price}
            </p>

            <div className="flex items-center gap-5 mb-6">
              <button
                onClick={decrease}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff5eb] text-3xl text-[#20150f]"
              >
                –
              </button>
              <span className="text-3xl font-semibold w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff5eb] text-3xl text-[#20150f]"
              >
                +
              </button>
            </div>

            <p className="text-2xl font-bold">
              Total:{" "}
              <span className="text-green-600">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </p>
          </div>

          <button
            onClick={addToCart}
            className="mt-10 w-full rounded-full bg-[#20150f] px-6 py-3 text-lg text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
