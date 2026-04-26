import { useDeferredValue, useEffect, useState } from "react";
import { fetchMedTestCategories, fetchMedTests } from "../api/medTestApi";
import SectionTitle from "../components/ui/SectionTitle";
import TestFilters from "../components/tests/TestFilters";
import TestList from "../components/tests/TestList";

export default function TestsPage() {
  const [medTests, setMedTests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    let ignore = false;

    async function loadCatalog() {
      setLoading(true);
      try {
        const [testsData, categoryData] = await Promise.all([
          fetchMedTests(),
          fetchMedTestCategories(),
        ]);

        if (!ignore) {
          setMedTests(testsData);
          setCategories(categoryData);
          setErrorMessage("");
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage("Unable to load the MedTest catalog right now.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTests = medTests.filter((medTest) => {
    const query = deferredSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      medTest.name.toLowerCase().includes(query) ||
      medTest.category.toLowerCase().includes(query);
    const matchesCategory = category === "ALL" || medTest.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="MedTest Catalog"
        title="Browse diagnostics in a clean, clinic-ready interface"
        description="Review pathology options by category, compare preparation guidance, and build your booking cart in minutes."
      />

      <div className="mt-10">
        <TestFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="rounded-[30px] border border-line bg-white p-10 text-center shadow-card">
            <p className="font-display text-2xl text-ink">Loading MedTests...</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-[30px] border border-red-200 bg-red-50 p-10 text-center text-red-700">
            {errorMessage}
          </div>
        ) : (
          <TestList medTests={filteredTests} />
        )}
      </div>
    </section>
  );
}
