"use client";

import { useState, useEffect } from "react";
import Logo from "../_icons/logo";
import LocationIcon from "../_icons/LocationIcon";
import ShoppingIcon from "../_icons/ShoppingIcon";
import UserIcon from "../_icons/UserIcon";
import AddresRightChevronIcon from "../_icons/AddresRightChevronIcon";
import CartModal from "@/components/CardModal";
import axios from "axios";

export default function Header({ cart, setCart }) {
  const [showCart, setShowCart] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // --------------------------
  // 🟢 localStorage зөвхөн browser дээр унших
  // --------------------------
  useEffect(() => {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(t);

    if (t) {
      try {
        const payload = t.split(".")[1];
        setUser(JSON.parse(atob(payload)));
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  // --------------------------
  // 🟢 Cart functions
  // --------------------------
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // --------------------------
  // 🟢 Confirm Order
  // --------------------------
  const confirmOrder = async (location) => {
    if (!user?.id) {
      alert("Please login first!");
      return;
    }

    if (!location) {
      alert("Please enter delivery location!");
      return;
    }

    try {
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await axios.post(
        "https://food-delivery-back-1-cev0.onrender.com/order-foods",
        {
          user: {
            id: user.id,
            email: user.email,
          },
          foodItems: cart.map((i) => ({
            foodId: i._id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
          totalPrice,
          deliveryLocation: location,
        }
      );

      alert("Order saved successfully!");
      setCart([]);
      setShowCart(false);
      setDeliveryLocation("");
    } catch (err) {
      console.error("Order Save Error:", err);
      alert("Failed to save order");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full h-16 px-20 bg-black">
        <Logo />

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-white">
            <LocationIcon />
            <p className="text-red-500 text-xs font-medium leading-4">
              Delivery address:
            </p>
            <p className="text-gray-500 text-xs font-normal leading-4">
              {deliveryLocation || "Add Location"}
            </p>
            <AddresRightChevronIcon />
          </button>

          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setShowCart(true)}
          >
            <ShoppingIcon className="w-5 h-5" />
          </button>

          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition">
            <UserIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div
        className="w-full h-[900px] bg-cover bg-center"
        style={{ backgroundImage: "url('/mainPageHeaderImage.png')" }}
      ></div>

      <CartModal
        open={showCart}
        onOpenChange={setShowCart}
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={confirmOrder}
        deliveryLocation={deliveryLocation}
        setDeliveryLocation={setDeliveryLocation}
      />
    </div>
  );
}
