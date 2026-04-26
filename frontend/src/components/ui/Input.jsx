export default function Input({
  label,
  as = "input",
  error,
  className = "",
  children,
  ...props
}) {
  const Element = as;
  const sharedClassName =
    "mt-2 w-full rounded-3xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate focus:border-navy focus:ring-4 focus:ring-navy/10";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <Element className={`${sharedClassName} ${className}`} {...props}>
        {children}
      </Element>
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </label>
  );
}
