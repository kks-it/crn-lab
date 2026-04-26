import { LocateFixed } from "lucide-react";
import Button from "../ui/Button";

export default function CurrentLocationPlaceholder({ value, onChange }) {
  function handlePlaceholderLocation() {
    if (!navigator.geolocation) {
      onChange("GPS placeholder: Browser geolocation is unavailable on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onChange(
          `GPS placeholder: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
        );
      },
      () => {
        onChange("GPS placeholder: Live location permission was denied.");
      }
    );
  }

  return (
    <div className="rounded-[28px] border border-line bg-mist p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-ink">Select Current Location</p>
          <p className="mt-2 text-sm leading-6 text-slate">
            This is a placeholder for GPS integration. It can capture browser coordinates now and
            later be upgraded to a full location picker.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={handlePlaceholderLocation}>
          <LocateFixed size={16} />
          Use Current Location
        </Button>
      </div>

      {value ? (
        <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate">{value}</p>
      ) : null}
    </div>
  );
}
