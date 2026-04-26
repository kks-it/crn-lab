import Input from "../ui/Input";

export default function TestFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="grid gap-4 rounded-[30px] border border-line bg-white p-6 shadow-card md:grid-cols-[1.2fr,0.8fr]">
      <Input
        label="Search MedTests"
        placeholder="Search by test name or category"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <Input
        label="Category"
        as="select"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="ALL">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Input>
    </div>
  );
}
