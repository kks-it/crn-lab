import { Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-[24px] border border-line bg-white p-4">
      <div>
        <p className="font-semibold text-ink">{item.name}</p>
        <p className="mt-1 text-sm text-slate">{item.category}</p>
        <p className="mt-3 text-sm leading-6 text-slate">{item.specialInstructions}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3">
        <p className="font-semibold text-navy">{formatCurrency(item.price)}</p>
        <button
          type="button"
          className="rounded-full border border-line p-2 text-slate transition hover:border-red-300 hover:text-red-600"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
