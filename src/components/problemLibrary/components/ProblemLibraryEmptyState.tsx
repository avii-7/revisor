import { FaPlus, FaSearch } from "react-icons/fa";

interface ProblemLibraryEmptyStateProps {
  onCreateProblem: () => void;
}

export default function ProblemLibraryEmptyState({
  onCreateProblem,
}: ProblemLibraryEmptyStateProps) {
  return (
    <section className="rounded-[28px] border border-outline-variant/40 bg-surface-container-low/90 px-8 py-14 text-center shadow-[0_20px_60px_rgba(6,14,32,0.24)]">
      <div className="mx-auto grid size-18 place-items-center rounded-full bg-surface-container-high text-primary">
        <FaSearch className="size-6" />
      </div>
      <h2 className="mt-6 text-headline-md font-semibold text-on-surface">
        No problems found
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-body-lg text-on-surface-variant">
        Try a different category or level, or add a new problem to your library.
      </p>
      <button
        type="button"
        onClick={onCreateProblem}
        className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-primary-container px-6 py-3 text-body-md font-semibold text-on-primary-container shadow-[0_18px_40px_rgba(77,142,255,0.26)] transition hover:brightness-110 active:scale-[0.98]"
      >
        <FaPlus className="size-4" />
        Add Problem
      </button>
    </section>
  );
}
