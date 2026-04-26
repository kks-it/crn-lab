import { ArrowRight, HousePlus, Microscope, ShieldCheck, TimerReset } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMedTests } from "../api/medTestApi";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";
import TestList from "../components/tests/TestList";

const highlights = [
  {
    title: "Professional Pathology Standards",
    description: "A polished diagnostic experience with clear instructions and dependable care.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Collection Options",
    description: "Book a lab visit or choose home sample collection based on your schedule.",
    icon: HousePlus,
  },
  {
    title: "Fast, Structured Booking",
    description: "Choose from clean two-hour slots between 9 AM and 9 PM.",
    icon: TimerReset,
  },
];

export default function HomePage() {
  const [featuredTests, setFeaturedTests] = useState([]);
  const [loadingFeaturedTests, setLoadingFeaturedTests] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadFeaturedTests() {
      try {
        const data = await fetchMedTests();
        if (!ignore) {
          setFeaturedTests(data.slice(0, 3));
        }
      } catch (error) {
        if (!ignore) {
          setFeaturedTests([]);
        }
      } finally {
        if (!ignore) {
          setLoadingFeaturedTests(false);
        }
      }
    }

    loadFeaturedTests();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <section className="bg-hero-grid">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-28">
          <div className="animate-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Classic Professional Care
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight text-white sm:text-6xl">
              Pathology booking designed with clinical clarity and calm
              confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Browse MedTests, review important preparation instructions, and
              schedule a lab visit or home sample collection from one polished
              patient portal.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/tests">
                <Button className="bg-white\/10 text-ink hover:bg-mist">
                  Explore MedTests
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/checkout">
                <Button
                  variant="secondary"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Book a Collection
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[36px] border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur animate-sweep">
            <div className="rounded-[28px] bg-white/90 p-6 text-ink">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-navy p-3 text-white">
                  <Microscope size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-accent">
                    Patient Experience
                  </p>
                  <h2 className="font-display text-2xl">
                    Built for trust and convenience
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-line bg-pearl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl bg-accentSoft p-3 text-accent">
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{item.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Featured Diagnostics"
          title="Most requested MedTests for routine and preventive care"
          description="Each test includes price, category, and preparation instructions so patients can book with confidence."
        />
        <div className="mt-10">
          {loadingFeaturedTests ? (
            <div className="rounded-[30px] border border-line bg-white p-10 text-center shadow-card">
              <p className="font-display text-2xl text-ink">
                Loading featured MedTests...
              </p>
            </div>
          ) : (
            <TestList medTests={featuredTests} />
          )}
        </div>
      </section>
    </div>
  );
}
