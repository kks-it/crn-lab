import { ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import Button from "../ui/Button";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, cartTotal } = useCart();

  return (
    <>
      {isCartOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
          onClick={closeCart}
          aria-label="Close cart"
        />
      ) : null}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-line bg-pearl shadow-card transition duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-navy p-3 text-white">
                <ShoppingBag size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-accent">Your Cart</p>
                <h3 className="font-display text-2xl text-ink">Selected MedTests</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-full border border-line p-2 text-slate hover:text-ink"
              aria-label="Close cart drawer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {items.length ? (
              items.map((item) => <CartItem key={item.id} item={item} onRemove={removeItem} />)
            ) : (
              <div className="rounded-[28px] border border-dashed border-line bg-white p-8 text-center">
                <p className="font-display text-2xl text-ink">No MedTests yet</p>
                <p className="mt-3 text-slate">Browse the catalog and add the diagnostics you need.</p>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-white px-6 py-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-semibold text-ink">Estimated Total</span>
              <span className="text-2xl font-semibold text-navy">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="grid gap-3">
              <Link to="/cart" onClick={closeCart}>
                <Button variant="secondary" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" onClick={closeCart}>
                <Button className="w-full" disabled={!items.length}>
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
