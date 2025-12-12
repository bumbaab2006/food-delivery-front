"use client";

import axios from "axios";
import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step2({ email, goBack }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const passwordMatch = password && confirm && password === confirm;

  // async function createUser() {
  //   if (!email || !passwordMatch) {
  //     alert("Email or password invalid!");
  //     return;
  //   }

  //   console.log("Sending to backend:", { email, password });

  //   try {
  //     const response = await axios.post(
  //       "https://food-delivery-back-1-cev0.onrender.com/users",
  //       {
  //         email,
  //         password,
  //       },
  //       {
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     console.log("Амжилттай:", response.data);
  //     router.push("/login");
  //   } catch (error) {
  //     console.error("Алдаа:", error.response?.data || error.message);
  //     alert(error.response?.data?.message || "Алдаа гарлаа!");
  //   }
  // }
  async function createUser() {
    if (!email || !passwordMatch) {
      alert("Email or password invalid!");
      return;
    }

    try {
      const response = await axios.post(
        "https://food-delivery-back-1-cev0.onrender.com/users/signup",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Амжилттай:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Алдаа:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Алдаа гарлаа!");
    }
  }

  return (
    <>
      <ChevronLeftIcon className="cursor-pointer" onClick={goBack} />

      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold">Create a strong password</p>
        <p className="text-[#71717A] text-sm">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-[#c9c9d3] rounded-md w-full h-10 px-3 text-sm"
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border border-[#c9c9d3] rounded-md w-full h-10 px-3 text-sm"
        />

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
          />
          Show password
        </label>
      </div>

      <button
        disabled={!passwordMatch}
        onClick={createUser}
        className={`flex justify-center items-center rounded-md w-full h-10 text-white font-medium ${
          !passwordMatch ? "bg-gray-200 cursor-not-allowed" : "bg-[#18181B]"
        }`}
      >
        Let&apos;s Go
      </button>

      <div className="flex gap-2 text-sm">
        <p className="text-[#71717A]">Already have an account?</p>
        <p
          className="text-[#2563EB] cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Log in
        </p>
      </div>
    </>
  );
}
