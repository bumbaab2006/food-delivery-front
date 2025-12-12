"use client";
import React, { useState } from "react";
import axios from "axios";
import { Description } from "@radix-ui/react-dialog";

export default function FoodOrderModal({ product, onClose, cart, setCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-black z-50"
        >
          ×
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[380px] md:h-full object-cover"
        />

        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold text-red-500 mb-4">
              {product.name}
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Select quantity and confirm your order.
            </p>

            <p className="text-3xl font-semibold text-gray-900 mb-6">
              Price: ${product.price}
            </p>

            <div className="flex items-center gap-5 mb-6">
              <button
                onClick={decrease}
                className="w-12 h-12 rounded-full bg-gray-200 text-3xl flex items-center justify-center hover:bg-gray-300 transition"
              >
                –
              </button>
              <span className="text-3xl font-semibold w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="w-12 h-12 rounded-full bg-gray-200 text-3xl flex items-center justify-center hover:bg-gray-300 transition"
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
            disabled={loading}
            className="mt-10 w-full px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition"
          >
            {loading ? "Saving..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
