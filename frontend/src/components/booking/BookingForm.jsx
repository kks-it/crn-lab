import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { createBooking, fetchSlots } from "../../api/bookingApi";
import { getDefaultSlots, getTodayDateValue } from "../../utils/slotUtils";
import Button from "../ui/Button";
import Input from "../ui/Input";
import CurrentLocationPlaceholder from "./CurrentLocationPlaceholder";
import SlotPicker from "./SlotPicker";
import VisitTypeSelector from "./VisitTypeSelector";

export default function BookingForm({ medTests, onBookingSuccess }) {
  const [formState, setFormState] = useState({
    bookingType: "LAB_VISIT",
    mobileNumber: "",
    fullAddress: "",
    bookingDate: getTodayDateValue(),
    timeSlot: "",
    additionalMessage: "",
    currentLocation: "",
  });
  const [slots, setSlots] = useState(getDefaultSlots());
  const [slotLoading, setSlotLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadSlots() {
      setSlotLoading(true);
      try {
        const data = await fetchSlots(formState.bookingDate);
        if (!ignore) {
          setSlots(data);
          if (!data.includes(formState.timeSlot)) {
            setFormState((current) => ({ ...current, timeSlot: data[0] ?? "" }));
          }
        }
      } catch (error) {
        if (!ignore) {
          const fallbackSlots = getDefaultSlots();
          setSlots(fallbackSlots);
          if (!fallbackSlots.includes(formState.timeSlot)) {
            setFormState((current) => ({ ...current, timeSlot: fallbackSlots[0] ?? "" }));
          }
        }
      } finally {
        if (!ignore) {
          setSlotLoading(false);
        }
      }
    }

    loadSlots();

    return () => {
      ignore = true;
    };
  }, [formState.bookingDate]);

  function updateField(field, value) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const booking = await createBooking({
        ...formState,
        medTestIds: medTests.map((item) => item.id),
      });
      setSuccessMessage("Your booking has been confirmed successfully.");
      onBookingSuccess(booking);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Unable to create booking right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-line bg-white p-6 shadow-card">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Booking Form</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Schedule Your Collection</h2>
        <p className="mt-3 text-slate">
          Confirm your preferred visit style, provide collection details, and review the special instructions below.
        </p>
      </div>

      <VisitTypeSelector
        value={formState.bookingType}
        onChange={(value) => updateField("bookingType", value)}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Mobile Number"
          placeholder="Enter your contact number"
          value={formState.mobileNumber}
          onChange={(event) => updateField("mobileNumber", event.target.value)}
        />
        <Input
          label="Booking Date"
          type="date"
          min={getTodayDateValue()}
          value={formState.bookingDate}
          onChange={(event) => updateField("bookingDate", event.target.value)}
        />
      </div>

      <Input
        label="Full Address"
        as="textarea"
        rows="4"
        placeholder="House number, street, locality, city, and any landmark details"
        value={formState.fullAddress}
        onChange={(event) => updateField("fullAddress", event.target.value)}
      />

      {formState.bookingType === "HOME_COLLECTION" ? (
        <CurrentLocationPlaceholder
          value={formState.currentLocation}
          onChange={(value) => updateField("currentLocation", value)}
        />
      ) : null}

      <SlotPicker
        slots={slots}
        selectedSlot={formState.timeSlot}
        onChange={(value) => updateField("timeSlot", value)}
        loading={slotLoading}
      />

      <Input
        label="Additional Message"
        as="textarea"
        rows="4"
        placeholder="Share any relevant timing, mobility, or sample collection notes"
        value={formState.additionalMessage}
        onChange={(event) => updateField("additionalMessage", event.target.value)}
      />

      {errorMessage ? (
        <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="flex items-center gap-3 rounded-[24px] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CircleCheckBig size={18} />
          {successMessage}
        </div>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting || !medTests.length}>
        {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
      </Button>
    </form>
  );
}
