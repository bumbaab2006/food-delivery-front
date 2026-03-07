"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import AuthShowcase from "@/components/auth/AuthShowcase";
import { api } from "@/lib/api";
import { setAuthSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await api.post("/users/login", { email, password });

      if (response.data.loggedIn) {
        setAuthSession({
          token: response.data.token,
          role: response.data.user.role,
        });
        router.push(response.data.user.role === "admin" ? "/admin" : "/main");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-4 py-6 sm:px-6 lg:px-10">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">
        <section className="rounded-[36px] border border-[#f0ddd0] bg-white/90 p-6 shadow-[0_24px_80px_rgba(133,89,58,0.12)] backdrop-blur sm:p-8 lg:p-10">
          <button
            type="button"
            onClick={() => router.push("/main")}
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#f0ddd0] bg-[#fff8f3] px-4 py-2 text-sm font-medium text-[#5a3622] hover:-translate-y-0.5 hover:border-[#f59e0b]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to menu
          </button>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#ef4444]">
              Welcome back
            </p>
            <h1 className="text-4xl leading-tight text-[#20150f] [font-family:var(--font-fraunces)] sm:text-5xl">
              Sign in and continue your order.
            </h1>
            <p className="max-w-md text-sm leading-6 text-[#7a6252]">
              Use your email and password to access saved orders, delivery
              address, and checkout history.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#3f2a1f]">Email</span>
              <input
                type="email"
                placeholder="name@example.com"
                className="h-[52px] w-full rounded-2xl border border-[#ecd9cb] bg-[#fffaf6] px-4 text-sm text-[#20150f] shadow-sm outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]/70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#3f2a1f]">
                Password
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="h-[52px] w-full rounded-2xl border border-[#ecd9cb] bg-[#fffaf6] px-4 text-sm text-[#20150f] shadow-sm outline-none focus:border-[#f97316] focus:ring-4 focus:ring-[#fed7aa]/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {errorMessage && (
            <p className="mt-4 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b42318]">
              {errorMessage}
            </p>
          )}

          <button
            disabled={!email || !password || loading}
            onClick={handleLogin}
            className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#20150f] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(32,21,15,0.2)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#d9ccc1] disabled:text-[#7d6b5d]"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Signing in
              </>
            ) : (
              "Log in"
            )}
          </button>

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-[#7a6252]">
            <p>Don&apos;t have an account?</p>
            <button
              type="button"
              className="font-semibold text-[#ef4444]"
              onClick={() => router.push("/signup")}
            >
              Create one
            </button>
          </div>
        </section>

        <AuthShowcase
          eyebrow="Fast delivery"
          title="Bring the best dishes to your door."
          description="From sign in to checkout, the full ordering flow is designed to stay quick, warm, and easy to navigate."
        />
      </div>
    </main>
  );
}
