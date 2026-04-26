export default function SlotPicker({ slots, selectedSlot, onChange, loading }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Preferred Time Slot</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {slots.map((slot) => (
          <button
            type="button"
            key={slot}
            onClick={() => onChange(slot)}
            disabled={loading}
            className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
              selectedSlot === slot
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-ink hover:border-navy/30"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
