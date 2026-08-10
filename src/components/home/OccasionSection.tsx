const occasions = [
  ["🎂", "Birthday"],
  ["💍", "Anniversary"],
  ["💎", "Wedding"],
  ["🌷", "Mother's Day"],
  ["👶", "Baby Gift"],
  ["💞", "Couples"],
  ["🫶", "Friendship"],
  ["💼", "Corporate Gifts"],
];

export default function OccasionSection() {
  return (
    <section className="bg-white pb-20">
      <div className="container-main">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#d98186]">
            FIND THE PERFECT GIFT
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#2f2928]">
            Shop by Occasion
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
          {occasions.map(([icon, name]) => (
            <button
              key={name}
              type="button"
              className="group text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#f0deda] bg-white text-3xl shadow-sm transition group-hover:-translate-y-1 group-hover:bg-[#fcebea] group-hover:shadow-md">
                {icon}
              </div>

              <p className="mt-3 text-xs font-medium text-[#3b3231]">
                {name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}