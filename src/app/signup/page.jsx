"use client";

import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import AuthShowcase from "@/components/auth/AuthShowcase";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-4 py-6 sm:px-6 lg:px-10">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,520px)_1fr]">
        <section className="rounded-[36px] border border-[#f0ddd0] bg-white/90 p-6 shadow-[0_24px_80px_rgba(133,89,58,0.12)] backdrop-blur sm:p-8 lg:p-10">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#ef4444]">
                Create account
              </p>
              <h1 className="mt-3 text-4xl leading-tight text-[#20150f] [font-family:var(--font-fraunces)] sm:text-5xl">
                Start your next food run.
              </h1>
            </div>

            <div className="rounded-full border border-[#ecd9cb] bg-[#fff8f3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7a6252]">
              Step {step} of 2
            </div>
          </div>

          <div className="mb-8 flex gap-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`h-2 flex-1 rounded-full ${
                  item <= step ? "bg-[#ef4444]" : "bg-[#f6e3d5]"
                }`}
              />
            ))}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <Step1
                email={email}
                setEmail={setEmail}
                goNext={() => setStep(2)}
              />
            )}

            {step === 2 && <Step2 email={email} goBack={() => setStep(1)} />}
          </div>
        </section>

        <AuthShowcase
          eyebrow="New here"
          title="Create an account and order without friction."
          description="Set up your account once, then move through delivery, cart, and repeat orders from one clean flow."
        />
      </div>
    </main>
  );
}
