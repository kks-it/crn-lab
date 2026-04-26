import { Home, Microscope } from "lucide-react";

const options = [
  {
    value: "LAB_VISIT",
    title: "Lab Visit",
    description: "Visit the lab and have your samples collected by our in-house team.",
    icon: Microscope,
  },
  {
    value: "HOME_COLLECTION",
    title: "Home Sample Collection",
    description: "Schedule a professional phlebotomist to collect your sample at home.",
    icon: Home,
  },
];

export default function VisitTypeSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Collection Preference</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;
          const active = value === option.value;

          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`rounded-[28px] border p-5 text-left transition ${
                active
                  ? "border-navy bg-mist shadow-soft"
                  : "border-line bg-white hover:border-navy/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl p-3 ${active ? "bg-navy text-white" : "bg-mist text-navy"}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink">{option.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate">{option.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
