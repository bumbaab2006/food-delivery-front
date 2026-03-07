import Logo from "../_icons/logo";

const links = ["Home", "Contact us", "Delivery zone"];
const extras = ["Top dishes", "Featured restaurants", "Fast checkout"];

export default function Footer() {
  return (
    <footer className="mt-20 w-full bg-[#18120d] text-white">
      <div className="bg-[#ef4444] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl [font-family:var(--font-fraunces)]">
            Fresh, fast, delivered.
          </h2>
          <p className="text-sm text-white/82">
            Built for warm visuals and a direct ordering flow.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Logo />
            <div>
              <p className="text-lg font-semibold">NomNom</p>
              <p className="text-xs uppercase tracking-[0.32em] text-white/50">
                Swift delivery
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/68">
            A food delivery experience focused on clear actions, responsive
            layout, and a warmer visual system.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/42">
            NomNom
          </p>
          <div className="space-y-3">
            {links.map((item) => (
              <p key={item} className="text-sm text-white/78">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/42">
            Highlights
          </p>
          <div className="space-y-3">
            {extras.map((item) => (
              <p key={item} className="text-sm text-white/78">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
