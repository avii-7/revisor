import { useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import Header from "../common/Header.tsx";
import DotGridBackground from "../common/DotGridBackground.tsx";
import { revisionPresetner } from "../../shared/container.ts";
import type { ProblemLibraryModel } from "../../shared/presenters/RevisionPresenter.ts";
import ProblemLibraryFilterBar from "./components/ProblemLibraryFilterBar.tsx";
import ProblemCard from "./components/ProblemCard.tsx";
import ProblemLibraryPagination from "./components/ProblemLibraryPagination.tsx";
import ProblemLibraryEmptyState from "./components/ProblemLibraryEmptyState.tsx";

const defaultFilters = {
  categories: [] as string[],
  levels: [] as string[],
};

export default function ProblemLibraryPage() {

  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState(defaultFilters);
  const [pageData, setPageData] = useState<ProblemLibraryModel>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [page, setPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let active = true;

    const loadPage = async () => {
      setIsPageLoading(true);

      try {
        const data = await revisionPresetner.loadProblemLibrary({
          page,
          category: selectedCategory || undefined,
          level: selectedLevel || undefined,
        });

        if (!active) {
          return;
        }

        setPageData(data);
        setFilters({
          categories: data.categories,
          levels: data.levels,
        });
        setError(null);
      } catch (loadError) {
        console.error("Failed to load problem library page:", loadError);
        if (active) {
          setError("Failed to load problems. Please refresh and try again.");
        }
      } finally {
        if (active) {
          setIsPageLoading(false);
        }
      }
    };

    loadPage();

    return () => {
      active = false;
    };
  }, [page, reloadToken, selectedCategory, selectedLevel]);

  const handleCategoryChange = (value: string) => {
    startTransition(() => {
      setSelectedCategory(value);
      setPage(1);
    });
  };

  const handleLevelChange = (value: string) => {
    startTransition(() => {
      setSelectedLevel(value);
      setPage(1);
    });
  };

  const handlePageChange = (nextPage: number) => {
    if (!pageData || nextPage === page || nextPage < 1 || nextPage > pageData.totalPages) {
      return;
    }

    startTransition(() => {
      setPage(nextPage);
    });
  };

  const handleRetry = () => {
    setReloadToken((current) => current + 1);
  };

  const handleCreateProblem = () => {
    navigate("/create");
  };

  const isBusy = isPending || isPageLoading;
  const totalItems = pageData?.totalItems ?? 0;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-app-gradient font-primary text-on-surface">
      <DotGridBackground />
      <Header showCreateButton />

      <section className="relative z-10 mx-auto max-w-[1200px] px-5 py-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-display-lg-mobile font-bold text-on-surface md:text-display-lg">
              Problem Library
            </h1>
            <p className="mt-2 text-body-lg text-on-surface-variant">
              Manage your collection of {totalItems} technical challenges
            </p>
          </div>

          <ProblemLibraryFilterBar
            categories={filters.categories}
            levels={filters.levels}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onCategoryChange={handleCategoryChange}
            onLevelChange={handleLevelChange}
            disabled={isBusy}
          />
        </header>

        {error ? (
          <section className="mt-10 rounded-[28px] border border-error/30 bg-error-container/15 px-6 py-8 text-on-surface shadow-[0_20px_60px_rgba(6,14,32,0.24)]">
            <h2 className="text-headline-md font-semibold text-on-surface">
              Something went wrong
            </h2>
            <p className="mt-3 max-w-2xl text-body-lg text-on-surface-variant">
              {error}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-6 inline-flex items-center rounded-xl bg-primary-container px-5 py-3 text-body-md font-semibold text-on-primary-container transition hover:brightness-110"
            >
              Retry
            </button>
          </section>
        ) : isPageLoading && !pageData ? (
          <section className="mt-10 space-y-5">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-[28px] border border-outline-variant/35 bg-surface-container-low/80"
              />
            ))}
          </section>
        ) : pageData && pageData.items.length === 0 ? (
          <div className="mt-10">
            <ProblemLibraryEmptyState onCreateProblem={handleCreateProblem} />
          </div>
        ) : (
          <>
            <section className={`mt-10 space-y-5 transition ${isBusy ? "opacity-75" : "opacity-100"}`}>
              {pageData?.items.map((problem) => (
                <ProblemCard key={problem.id} item={problem} />
              ))}
            </section>

            {pageData && (
              <ProblemLibraryPagination
                page={pageData.page}
                totalPages={pageData.totalPages}
                disabled={isBusy}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}
