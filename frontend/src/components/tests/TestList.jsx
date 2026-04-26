import TestCard from "./TestCard";

export default function TestList({ medTests }) {
  if (!medTests.length) {
    return (
      <div className="rounded-[30px] border border-dashed border-line bg-white p-10 text-center shadow-card">
        <p className="font-display text-2xl text-ink">No MedTests match this search.</p>
        <p className="mt-3 text-slate">Try another keyword or clear the selected category filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {medTests.map((medTest, index) => (
        <div key={medTest.id} style={{ animationDelay: `${index * 90}ms` }} className="animate-rise">
          <TestCard medTest={medTest} />
        </div>
      ))}
    </div>
  );
}
