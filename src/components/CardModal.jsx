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
  deliveryLocation, 
  setDeliveryLocation, 
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
          className="w-full max-w-[420px] overflow-y-auto border-l border-[#3b2920] bg-[#20150f] p-6 text-white"
        >
          <SheetHeader className="flex flex-row justify-between items-center mb-4">
            <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
              Order detail
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-full mt-20">
            <p className="text-center text-white/62">
              Your cart is currently empty.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-[420px] overflow-y-auto border-l border-[#3b2920] bg-[#20150f] p-6 text-white"
      >
        <SheetHeader className="flex flex-row justify-between items-center mb-4">
          <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
            Order detail
          </SheetTitle>
        </SheetHeader>

        <div className="mb-6 flex rounded-full bg-white/8 p-1">
          <button className="w-1/2 rounded-full bg-[#ef4444] py-2 text-center text-sm font-medium">
            Cart
          </button>
          <button className="w-1/2 py-2 text-center text-sm text-white/62">
            Order
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3">My cart</h3>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 rounded-[24px] border border-white/8 bg-white/6 p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold text-[#ffd2b0]">{item.name}</p>
                <p className="text-sm text-white/62">{item.description}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => onDecrease(item._id)}
                    className="rounded-full bg-white/8 px-2 py-1"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item._id)}
                    className="rounded-full bg-white/8 px-2 py-1"
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
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white placeholder:text-white/36"
          />
        </div>

        <div className="mt-8 rounded-[28px] bg-white/8 p-4 text-sm">
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
                alert("Please enter a delivery location.");
                return;
              }
              onCheckout(deliveryLocation);
            }}
            className="mt-4 w-full rounded-2xl bg-[#ef4444] py-3 font-semibold text-white"
          >
            Checkout
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
