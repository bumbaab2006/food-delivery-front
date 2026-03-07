"use client";

const highlights = [
  "Track your order in real time",
  "Curated local restaurants",
  "Fast checkout with saved delivery info",
];

export default function AuthShowcase({
  eyebrow = "NomNom experience",
  title = "Fresh meals, quick delivery, polished ordering.",
  description = "Browse curated dishes, place orders in seconds, and keep your delivery flow in one place.",
}) {
  return (
    <div className="relative hidden min-h-[720px] overflow-hidden rounded-[36px] border border-white/55 bg-[#22160f] shadow-[0_32px_120px_rgba(34,22,15,0.28)] lg:flex">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/LoginPageImage.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,22,15,0.18),rgba(34,22,15,0.9))]" />
      <div className="absolute -left-16 top-16 h-52 w-52 rounded-full bg-[#fb923c]/30 blur-3xl" />
      <div className="absolute -right-14 bottom-10 h-56 w-56 rounded-full bg-[#ef4444]/30 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-between p-10 text-white xl:p-12">
        <div className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85 backdrop-blur">
          {eyebrow}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="max-w-[12ch] text-5xl leading-none [font-family:var(--font-fraunces)] xl:text-6xl">
              {title}
            </p>
            <p className="max-w-xl text-base leading-7 text-white/76">
              {description}
            </p>
          </div>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/16 text-sm font-semibold">
                  0{highlights.indexOf(item) + 1}
                </span>
                <p className="text-sm font-medium text-white/88">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
