import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import BookingSummary from "../components/cart/BookingSummary";
import CartItem from "../components/cart/CartItem";
import Button from "../components/ui/Button";
import SectionTitle from "../components/ui/SectionTitle";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Your Cart"
        title="Review selected MedTests before you schedule"
        description="Every chosen test is listed here with price and preparation guidance so nothing is missed during booking."
      />

      {!items.length ? (
        <div className="mt-10 rounded-[34px] border border-dashed border-line bg-white p-10 text-center shadow-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist text-navy">
            <ShoppingBag size={22} />
          </div>
          <p className="mt-5 font-display text-3xl text-ink">
            Your MedTest cart is empty
          </p>
          <p className="mt-3 text-slate">
            Browse the test catalog and add diagnostics to begin the booking
            flow.
          </p>
          <Link to="/tests" className="mt-6 inline-block bg-navy">
            <Button className="bg-navy">
              Explore MedTests
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 xl:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
            <Button variant="secondary" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            <BookingSummary items={items} />
            <Link to="/checkout">
              <Button className="w-full">Proceed to Booking</Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
