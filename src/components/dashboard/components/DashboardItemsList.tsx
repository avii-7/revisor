import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import type { RevisionItemModel } from "../../../shared/presenters/RevisionPresenter.ts";

interface DashboardItemsListProps {
  items: RevisionItemModel[];
}

export default function DashboardItemsList({ items }: DashboardItemsListProps) {
  return (
    <>
      <div className="mt-9 flex items-center justify-between">
        <h2 className="text-label-sm font-medium text-on-surface-variant">
          Recent Mastery
        </h2>
        <a
          className="text-label-sm font-medium text-primary transition hover:text-on-surface"
          href="/"
        >
          View all &rarr;
        </a>
      </div>

      <section className="mt-4 overflow-hidden rounded-lg border border-outline-variant/70 bg-surface-container-low">
        {items.map((item) => (
          <article
            className="flex items-center gap-5 border-b border-outline-variant/45 px-6 py-5 last:border-b-0"
            key={item.id}
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high text-primary">
              <FaCheckCircle aria-hidden="true" className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-label-sm font-semibold text-on-surface">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-label-sm font-normal text-on-surface-variant">
                {item.content}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-label-sm font-medium uppercase text-on-surface-variant">
                Streak
              </p>
            </div>
            <button
              className="grid size-8 shrink-0 place-items-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
              aria-label={`Open actions for ${item.title}`}
              type="button"
            >
              <FaEllipsisV aria-hidden="true" className="size-3" />
            </button>
          </article>
        ))}
      </section>
    </>
  );
}
