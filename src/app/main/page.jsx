"use client";
import { useEffect, useState } from "react";
import MainPageBody from "./Body";
import Header from "./Header";
import Footer from "./Footer";

export default function MainPage() {
  const [cart, setCart] = useState([]);

  return (
    <div className="flex w-full flex-col items-center bg-[#404040]">
      <Header cart={cart} setCart={setCart} />
      <MainPageBody cart={cart} setCart={setCart} />
      <Footer />
    </div>
  );
}
