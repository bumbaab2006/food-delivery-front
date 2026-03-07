"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Step2({ email, goBack }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordMatch = password && confirm && password === confirm;
  const passwordStrong = password.length >= 8;

  async function createUser() {
    if (!email || !passwordMatch || !passwordStrong) {
      setErrorMessage("Please use a matching password with at least 8 characters.");
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage("");
      await api.post("/users/signup", { email, password });
      router.push("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ddd0] bg-[#fff8f3] px-4 py-2 text-sm font-medium text-[#5a3622] hover:-translate-y-0.5 hover:border-[#f59e0b]"
        onClick={goBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex flex-col gap-2">
        <p className="text-3xl leading-tight text-[#20150f] [font-family:var(--font-fraunces)]">
          Create a secure password.
        </p>
        <p className="text-sm leading-6 text-[#7a6252]">
          Use at least 8 characters so you can sign in reliably later.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[#3f2a1f]">Password</span>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[52px] w-full rounded-2xl border border-[#ecd9cb] bg-[#fffaf6] px-4 text-sm text-[#20150f] shadow-sm outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]/70"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[#3f2a1f]">
            Confirm password
          </span>
          <input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-[52px] w-full rounded-2xl border border-[#ecd9cb] bg-[#fffaf6] px-4 text-sm text-[#20150f] shadow-sm outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]/70"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-[#f0ddd0] bg-[#fff8f3] px-4 py-3 text-sm text-[#5a3622]">
          <input
            type="checkbox"
            checked={show}
            onChange={() => setShow(!show)}
            className="h-4 w-4"
          />
          Show password
        </label>

        <div className="rounded-2xl border border-[#f0ddd0] bg-[#fff8f3] px-4 py-4 text-sm text-[#7a6252]">
          <p className={passwordStrong ? "text-[#15803d]" : "text-[#7a6252]"}>
            Minimum 8 characters
          </p>
          <p className={passwordMatch ? "text-[#15803d]" : "text-[#7a6252]"}>
            Password and confirmation match
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className="rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b42318]">
          {errorMessage}
        </p>
      )}

      <button
        disabled={!passwordMatch || !passwordStrong || submitting}
        onClick={createUser}
        className={`flex h-[52px] w-full items-center justify-center rounded-2xl text-sm font-semibold text-white shadow-[0_18px_40px_rgba(32,21,15,0.2)] ${
          !passwordMatch || !passwordStrong || submitting
            ? "cursor-not-allowed bg-[#d9ccc1] text-[#7d6b5d] shadow-none"
            : "bg-[#20150f] hover:-translate-y-0.5"
        }`}
      >
        {submitting ? "Creating account..." : "Create account"}
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
