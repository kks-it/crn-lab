import { CircleAlert, FlaskConical, Wallet } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

function uniqueInstructions(items) {
  return [...new Set(items.map((item) => item.specialInstructions).filter(Boolean))];
}

export default function BookingSummary({ items, className = "" }) {
  const instructions = uniqueInstructions(items);
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <section className={`rounded-[32px] border border-line bg-white p-6 shadow-card ${className}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-navy p-3 text-white">
          <FlaskConical size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Booking Summary</p>
          <h3 className="font-display text-2xl text-ink">Selected MedTests</h3>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="font-semibold text-ink">{item.name}</p>
              <p className="text-sm text-slate">{item.category}</p>
            </div>
            <p className="font-semibold text-navy">{formatCurrency(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-[24px] bg-mist p-4">
        <div className="flex items-center gap-3">
          <Wallet size={18} className="text-accent" />
          <span className="font-semibold text-ink">Estimated Total</span>
        </div>
        <p className="text-2xl font-semibold text-navy">{formatCurrency(total)}</p>
      </div>

      <div className="mt-6 rounded-[24px] border border-accent/20 bg-accentSoft/70 p-5">
        <div className="flex items-start gap-3">
          <CircleAlert className="mt-1 text-accent" size={18} />
          <div>
            <p className="font-semibold text-ink">Important Special Instructions</p>
            <div className="mt-3 space-y-3">
              {instructions.map((instruction) => (
                <p key={instruction} className="text-sm leading-6 text-slate">
                  {instruction}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
