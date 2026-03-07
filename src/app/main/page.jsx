"use client";
import { useEffect, useState } from "react";
import MainPageBody from "./Body";
import Header from "./Header";
import Footer from "./Footer";

export default function MainPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedCart = localStorage.getItem("nomnom-cart");

      if (!storedCart) {
        return;
      }

      try {
        setCart(JSON.parse(storedCart));
      } catch (_error) {
        localStorage.removeItem("nomnom-cart");
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    localStorage.setItem("nomnom-cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header cart={cart} setCart={setCart} />
      <MainPageBody cart={cart} setCart={setCart} />
      <Footer />
    </div>
  );
}
