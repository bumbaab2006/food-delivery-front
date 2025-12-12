"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CartModal({
  open,
  onOpenChange,
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  deliveryLocation, // 🟢 from header
  setDeliveryLocation, // 🟢 from header
}) {
  const itemsTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0.99;
  const total = itemsTotal + shipping;

  if (cart.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-[420px] p-6 overflow-y-auto bg-[#2e2e2e] text-white"
        >
          <SheetHeader className="flex flex-row justify-between items-center mb-4">
            <SheetTitle className="text-xl font-semibold flex items-center gap-2">
              🛒 Order detail
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-full mt-20">
            <p className="text-gray-400">Your cart is currently empty.</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[420px] p-6 overflow-y-auto bg-[#2e2e2e] text-white"
      >
        <SheetHeader className="flex flex-row justify-between items-center mb-4">
          <SheetTitle className="text-xl font-semibold flex items-center gap-2">
            🛒 Order detail
          </SheetTitle>
        </SheetHeader>

        <div className="flex mb-6 bg-[#1f1f1f] rounded-full p-1">
          <button className="w-1/2 py-2 rounded-full bg-red-500 text-center font-medium">
            Cart
          </button>
          <button className="w-1/2 py-2 text-center text-gray-300">
            Order
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3">My cart</h3>

        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-red-300">{item.name}</p>
                <p className="text-sm text-gray-300">{item.description}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => onDecrease(item._id)}
                    className="px-2 py-1 bg-[#1f1f1f] rounded"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item._id)}
                    className="px-2 py-1 bg-[#1f1f1f] rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-2">Delivery location</h3>
          <input
            type="text"
            placeholder="Please share your complete address"
            value={deliveryLocation} // 🟢 bind to header state
            onChange={(e) => setDeliveryLocation(e.target.value)} // 🟢 update header
            className="w-full bg-transparent border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400"
          />
        </div>

        <div className="mt-8 bg-[#1f1f1f] rounded-2xl p-4 text-sm">
          <h3 className="font-semibold text-lg mb-4">Payment info</h3>

          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>${itemsTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <hr className="border-gray-700 my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              if (!deliveryLocation) {
                alert("Please enter delivery location!");
                return;
              }
              onCheckout(deliveryLocation);
            }}
            className="w-full bg-red-500 text-white py-3 rounded-xl mt-4 font-semibold"
          >
            Checkout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
