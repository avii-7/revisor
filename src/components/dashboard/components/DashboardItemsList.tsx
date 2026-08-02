import { Link } from "react-router";
import type { RevisionItemModel } from "../../../shared/presenters/RevisionPresenter.ts";
import ProblemCard from "../../problemLibrary/components/ProblemCard.tsx";

interface DashboardItemsListProps {
  items: RevisionItemModel[];
  onDeleteSuccess?: () => void;
}

export default function DashboardItemsList({ items, onDeleteSuccess }: DashboardItemsListProps) {
  return (
    <>
      <div className="mt-9 flex items-center justify-between">
        <h2 className="text-label-sm font-medium text-on-surface-variant">
          Recent Mastery
        </h2>
        <Link
          className="text-label-sm font-medium text-primary transition hover:text-on-surface"
          to="/problems"
        >
          View all &rarr;
        </Link>
      </div>

      <section className="mt-4 space-y-5">
        {items.map((item) => (
          <ProblemCard key={item.id} item={item} onDeleteSuccess={onDeleteSuccess} />
        ))}
      </section>
    </>
  );
}
