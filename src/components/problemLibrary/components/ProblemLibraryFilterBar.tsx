import { FaChevronDown, FaFilter } from "react-icons/fa";

interface ProblemLibraryFilterBarProps {
  categories: string[];
  levels: string[];
  selectedCategory: string;
  selectedLevel: string;
  onCategoryChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  disabled?: boolean;
}

function SelectField({
  value,
  options,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative min-w-[200px]">
      <select
        className="w-full appearance-none rounded-xl border border-outline-variant/35 bg-surface-container-low px-4 py-3 pr-10 text-body-md text-on-surface shadow-[0_16px_40px_rgba(6,14,32,0.18)] outline-none transition focus:border-primary/60 disabled:cursor-not-allowed disabled:opacity-60"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-on-surface-variant" />
    </div>
  );
}

export default function ProblemLibraryFilterBar({
  categories,
  levels,
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange,
  disabled = false,
}: ProblemLibraryFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectField
        value={selectedCategory}
        options={categories}
        onChange={onCategoryChange}
        placeholder="All Categories"
        disabled={disabled}
      />
      <SelectField
        value={selectedLevel}
        options={levels}
        onChange={onLevelChange}
        placeholder="All Levels"
        disabled={disabled}
      />
      <button
        type="button"
        aria-label="Additional filters"
        className="grid size-11 place-items-center rounded-xl border border-outline-variant/25 bg-surface-container-low text-on-surface-variant transition hover:border-primary/40 hover:text-on-surface"
      >
        <FaFilter className="size-4" />
      </button>
    </div>
  );
}
