import { Beaker, CircleAlert, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import Button from "../ui/Button";

export default function TestCard({ medTest }) {
  const { addItem, items } = useCart();
  const alreadyAdded = items.some((item) => item.id === medTest.id);

  return (
    <article className="group flex h-full flex-col rounded-[30px] border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-navy/30">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-mist p-3 text-navy">
          <Beaker size={22} />
        </div>
        <span className="rounded-full bg-accentSoft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {medTest.category}
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl text-ink">{medTest.name}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate">Test ID #{medTest.id}</p>
      <p className="mt-6 text-3xl font-semibold text-navy">{formatCurrency(medTest.price)}</p>

      <div className="mt-6 rounded-[24px] border border-accent/15 bg-accentSoft/60 p-4">
        <div className="flex items-start gap-3">
          <CircleAlert size={18} className="mt-0.5 text-accent" />
          <div>
            <p className="text-sm font-semibold text-ink">Special Instructions</p>
            <p className="mt-1 text-sm leading-6 text-slate">{medTest.specialInstructions}</p>
          </div>
        </div>
      </div>

      <Button
        className="mt-6 w-full"
        onClick={() => addItem(medTest)}
        variant={alreadyAdded ? "secondary" : "primary"}
        disabled={alreadyAdded}
      >
        <Plus size={16} />
        {alreadyAdded ? "Added to Cart" : "Add to Cart"}
      </Button>
    </article>
  );
}
