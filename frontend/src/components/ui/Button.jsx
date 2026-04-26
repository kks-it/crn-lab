const styles = {
  primary:
    "bg-navy text-white hover:bg-ink shadow-soft",
  secondary:
    "bg-white text-ink border border-line hover:border-navy hover:text-navy",
  ghost:
    "bg-transparent text-ink hover:bg-white/60",
  accent:
    "bg-accent text-white hover:opacity-90 shadow-soft",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
