import { FlaskConical, PhoneCall, Mail, MapPin } from "lucide-react";
import appConfig from "../../config/appConfig";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr,1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-navy p-3 text-white">
              <FlaskConical size={20} />
            </div>
            <div>
              <p className="font-display text-2xl text-ink">{appConfig.brandName}</p>
              <p className="text-sm text-slate">{appConfig.brandTagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate">
            A professional pathology experience built for modern patients, with reliable diagnostics,
            clear instructions, and convenient booking for lab visits or home sample collection.
          </p>
        </div>

        <div className="grid gap-4 rounded-[28px] border border-line bg-mist p-6 shadow-soft">
          <div className="flex items-start gap-3">
            <PhoneCall size={18} className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-ink">Support Line</p>
              <p className="text-slate">{appConfig.support.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-ink">Email Care</p>
              <p className="text-slate">{appConfig.support.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-ink">Lab Address</p>
              <p className="text-slate">{appConfig.support.address}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
