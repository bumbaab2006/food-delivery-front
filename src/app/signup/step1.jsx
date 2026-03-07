"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Step1({ email, setEmail, goNext }) {
  const router = useRouter();
  const [error, setError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmail = (value) => {
    setEmail(value);

    if (!value) {
      setError("");
      return;
    }

    if (!emailRegex.test(value)) setError("Invalid email.");
    else setError("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => router.push("/main")}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ddd0] bg-[#fff8f3] px-4 py-2 text-sm font-medium text-[#5a3622] hover:-translate-y-0.5 hover:border-[#f59e0b]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to menu
      </button>

      <div className="flex flex-col gap-2">
        <p className="text-3xl leading-tight text-[#20150f] [font-family:var(--font-fraunces)]">
          Your email comes first.
        </p>
        <p className="text-sm leading-6 text-[#7a6252]">
          We&apos;ll use this address for sign in, order updates, and checkout
          confirmation.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-[#3f2a1f]">
          Email address
        </span>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          className={`h-[52px] w-full rounded-2xl border bg-[#fffaf6] px-4 text-sm text-[#20150f] shadow-sm outline-none focus:ring-4 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-[#ecd9cb] focus:border-[#f97316] focus:ring-[#fed7aa]/70"
          }`}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <button
        disabled={!email || error}
        onClick={goNext}
        className={`flex h-[52px] w-full items-center justify-center rounded-2xl text-sm font-semibold text-white shadow-[0_18px_40px_rgba(32,21,15,0.2)] ${
          !email || error
            ? "cursor-not-allowed bg-[#d9ccc1] text-[#7d6b5d] shadow-none"
            : "bg-[#20150f] hover:-translate-y-0.5"
        }`}
      >
        Continue
      </button>

      <div className="flex flex-wrap gap-2 text-sm text-[#7a6252]">
        <p>Already have an account?</p>
        <button
          type="button"
          className="font-semibold text-[#ef4444]"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
      </div>
    </>
  );
}
