import appConfig from "../../config/appConfig";

export default function Logo({ withText = true }) {
  const src = appConfig.logo.mode === "url" && appConfig.logo.url ? appConfig.logo.url : appConfig.logo.asset;

  return (
    <div className="flex items-center gap-3">
      <img src={src} alt={appConfig.logo.alt} className="h-11 w-15 object-cover shadow-soft" />
      {withText ? (
        <div>
          <p className="font-display text-xl text-ink">{appConfig.brandName}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-slate">Pathology & Diagnostics</p>
        </div>
      ) : null}
    </div>
  );
}
