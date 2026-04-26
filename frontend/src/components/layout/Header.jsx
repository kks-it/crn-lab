import { Menu, ShoppingBag, UserCircle2, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";
import Logo from "./Logo";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/tests", label: "MedTests" },
  { to: "/cart", label: "Cart" },
  { to: "/checkout", label: "Checkout" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  function linkClassName({ isActive }) {
    return `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive ? "bg-mist text-navy" : "text-slate hover:bg-white hover:text-ink"
    }`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-pearl/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="shrink-0">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full border border-line bg-white p-3 text-ink transition hover:border-navy hover:text-navy"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">
                <UserCircle2 size={18} />
                <span>{user?.fullName}</span>
              </div>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <Button variant="secondary">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button>Sign Up</Button>
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-full border border-line bg-white p-3 text-ink lg:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-line bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClassName}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                openCart();
                setIsMobileMenuOpen(false);
              }}
              className="rounded-full border border-line px-4 py-3 text-left text-sm font-semibold text-ink"
            >
              Cart ({cartCount})
            </button>
            {isAuthenticated ? (
              <Button variant="secondary" onClick={handleLogout} className="w-full">
                Logout
              </Button>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
