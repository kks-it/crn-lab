import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import BookingForm from "../components/booking/BookingForm";
import BookingSummary from "../components/cart/BookingSummary";
import SectionTitle from "../components/ui/SectionTitle";
import { useCart } from "../context/CartContext";
import { bookingTypeLabel } from "../utils/slotUtils";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [bookingResult, setBookingResult] = useState(null);

  function handleBookingSuccess(booking) {
    setBookingResult(booking);
    clearCart();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Checkout"
        title="Confirm your collection details and book with confidence"
        description="The summary keeps special instructions visible throughout checkout so patients can prepare correctly before sample collection."
      />

      {!items.length && !bookingResult ? (
        <div className="mt-10 rounded-[34px] border border-dashed border-line bg-white p-10 text-center shadow-card">
          <p className="font-display text-3xl text-ink">Your checkout is waiting for MedTests</p>
          <p className="mt-3 text-slate">Add at least one test to continue with booking.</p>
        </div>
      ) : null}

      {bookingResult ? (
        <div className="mt-10 rounded-[34px] border border-green-200 bg-white p-8 shadow-card">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-green-100 p-3 text-green-700">
              <CircleCheckBig size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">Booking Confirmed</p>
              <h3 className="mt-2 font-display text-3xl text-ink">Your appointment has been scheduled</h3>
              <p className="mt-3 text-slate">
                {bookingTypeLabel(bookingResult.bookingType)} on {bookingResult.bookingDate} during{" "}
                {bookingResult.timeSlot}.
              </p>
              <p className="mt-2 text-slate">{bookingResult.fullAddress}</p>
            </div>
          </div>
          <div className="mt-8">
            <BookingSummary items={bookingResult.medTests} />
          </div>
        </div>
      ) : null}

      {items.length ? (
        <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
          <BookingForm medTests={items} onBookingSuccess={handleBookingSuccess} />
          <BookingSummary items={items} />
        </div>
      ) : null}
    </section>
  );
}
