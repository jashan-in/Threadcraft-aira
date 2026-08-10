import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Choose",
    description: "your product",
  },
  {
    number: "2",
    title: "Personalize",
    description: "text, colours & style",
  },
  {
    number: "3",
    title: "Upload",
    description: "your idea or reference",
  },
  {
    number: "4",
    title: "We stitch",
    description: "your design with love",
  },
];

export default function CustomEmbroidery() {
  return (
    <section className="bg-white pb-20">
      <div className="container-main">
        <div className="rounded-2xl bg-[#fce9e7] px-8 py-12 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#c86f76]">
                CUSTOM EMBROIDERY
              </p>

              <h2 className="mt-3 font-serif text-4xl leading-tight text-[#2f2928]">
                You imagine,
                <span className="block italic text-[#d98186]">
                  we create.
                </span>
              </h2>

              <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-600">
                Choose your product, personalize it your way, and we&apos;ll
                stitch it carefully for you.
              </p>

              <Link
                href="/customize"
                className="mt-7 inline-block rounded bg-[#d98186] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#bd656b]"
              >
                CREATE YOUR DESIGN
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#d98186] shadow-sm">
                    {step.number}
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#2f2928]">
                    {step.number}. {step.title}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-[#efc7c4] bg-white/60 p-4 text-center text-sm text-neutral-600">
            Not sure what you want? DM us on Instagram or WhatsApp. We&apos;re
            happy to help 💕
          </div>
        </div>
      </div>
    </section>
  );
}