"use client";

import { useEffect, useState } from "react";
import FoodMenu from "./foodMenu";
import OrderInfo from "./OrderInfo";

import MainLogo from "../_icons/mainLogo";
import FoodMenuDashboardIcon from "../_icons/FoodMenuDashboardIcon";
import OrderTruckIcon from "../_icons/Order-TruckIcon";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("food");
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole !== "admin") {
      router.push("/main");
    }
  }, [router]);

  if (role === null) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (role !== "admin") {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-lg font-medium">You do not have permission.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-full bg-[#F5F5F5]">
      {/* Sidebar */}
      <div className="flex flex-col w-[205px] h-screen px-5 py-9 gap-10 bg-white">
        <div className="flex items-center gap-2">
          <MainLogo />
          <div className="flex flex-col">
            <p className="text-[#09090B] text-lg font-semibold">NomNom</p>
            <p className="text-[#71717A] text-xs">Swift delivery</p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-6">
          {/* Food Menu Button */}
          <div
            className={`flex h-10 px-6 py-2 items-center gap-2 cursor-pointer 
              ${activeTab === "food" ? "rounded-full bg-[#18181B]" : ""}`}
            onClick={() => setActiveTab("food")}
          >
            <FoodMenuDashboardIcon />
            <p
              className={`${
                activeTab === "food" ? "text-white" : "text-[#09090B]"
              } text-sm font-medium`}
            >
              Food menu
            </p>
          </div>

          {/* Orders Button */}
          <div
            className={`flex h-10 px-6 py-2 items-center gap-2 cursor-pointer 
              ${activeTab === "orders" ? "rounded-full bg-[#18181B]" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <OrderTruckIcon />
            <p
              className={`${
                activeTab === "orders" ? "text-white" : "text-[#09090B]"
              } text-sm font-medium`}
            >
              Orders
            </p>
          </div>
        </div>
      </div>

      {/* MAIN PAGE SWITCH */}
      <div className="flex flex-1">
        {activeTab === "food" ? <FoodMenu /> : <OrderInfo />}
      </div>
    </div>
  );
}
