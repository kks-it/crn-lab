import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionTitle from "../components/ui/SectionTitle";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/checkout" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(formState);
      navigate(location.state?.from?.pathname || "/checkout", { replace: true });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Patient Login"
        title="Return to your CRN Lab account"
        description="Sign in to access secure booking, home collection scheduling, and booking history."
        align="center"
      />

      <form onSubmit={handleSubmit} className="mt-10 rounded-[34px] border border-line bg-white p-8 shadow-card">
        <div className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="patient@example.com"
            value={formState.email}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formState.password}
            onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
          />
        </div>

        {errorMessage ? (
          <div className="mt-5 rounded-[22px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Login"}
        </Button>

        <p className="mt-6 text-center text-sm text-slate">
          Need an account?{" "}
          <Link to="/signup" className="font-semibold text-navy">
            Create one here
          </Link>
        </p>
      </form>
    </section>
  );
}
