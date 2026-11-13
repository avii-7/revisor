import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProblemLibraryPaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export default function ProblemLibraryPagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: ProblemLibraryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPaginationPages(page, totalPages);

  return (
    <nav className="mt-10 flex flex-col gap-5 text-body-lg text-on-surface sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
        className="inline-flex items-center gap-3 self-start rounded-xl px-2 py-2 transition hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronLeft className="size-4" />
        Previous
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-body-md text-on-surface-variant"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              disabled={disabled}
              className={`grid size-12 place-items-center rounded-2xl text-body-md font-semibold transition ${
                item === page
                  ? "bg-primary-container text-on-primary-container shadow-[0_18px_40px_rgba(77,142,255,0.28)]"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
        className="inline-flex items-center gap-3 self-end rounded-xl px-2 py-2 transition hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <FaChevronRight className="size-4" />
      </button>
    </nav>
  );
}

function buildPaginationPages(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}
