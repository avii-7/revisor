import { FaFolderOpen } from "react-icons/fa";
import type { RevisionInfoModel } from "../services/DashboardPresenter.ts";

interface DashboardEmptyStateProps {
  revisionInfo: RevisionInfoModel;
}

export default function DashboardEmptyState({ revisionInfo }: DashboardEmptyStateProps) {
  const { title, subtitle } = revisionInfo;

  return (
    <section className="mt-12 bg-surface-container-low border border-outline/20 rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
      <div aria-hidden="true" className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
        <div className="relative bg-surface-container-lowest p-8 rounded-3xl shadow-xl border border-outline-variant/10 flex items-center justify-center">
          <FaFolderOpen className="size-16 text-primary/30" />
        </div>
      </div>
      <h2 className="mb-2 text-headline-md font-bold text-on-surface">{title}</h2>
      {subtitle !== null && (
        <p className="mx-auto max-w-md text-body-md text-on-surface-variant">{subtitle}</p>
      )}
    </section>
  );
}
