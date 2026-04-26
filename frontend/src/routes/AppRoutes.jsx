import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import CartDrawer from "../components/cart/CartDrawer";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import TestsPage from "../pages/TestsPage";

function AppShell() {
  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Header />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function RequireAuth() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-full border border-line bg-white px-6 py-4 shadow-soft">
          <LoaderCircle size={18} className="animate-spin text-navy" />
          <span className="text-sm font-semibold text-ink">Preparing your secure session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
