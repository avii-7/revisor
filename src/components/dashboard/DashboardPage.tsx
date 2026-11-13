import { FaChartBar, FaRedoAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import DotGridBackground from "../common/DotGridBackground.tsx";
import Header from "../common/Header.tsx";
import Hero from "./Hero.tsx";
import RevisionHero from "./RevisionHero.tsx";
import type { DashboardModel } from "./services/DashboardPresenter.ts";
import { dashboardPresenter, revisionPresetner } from "../../shared/container.ts";
import type { RevisionItemModel } from "../../shared/presenters/RevisionPresenter.ts";
import DashboardEmptyState from "./components/DashboardEmptyState.tsx";
import DashboardItemsList from "./components/DashboardItemsList.tsx";
import DashboardSkeleton from "./components/DashboardSkeleton.tsx";
import LoadErrorState from "../common/LoadErrorState.tsx";
import type { LoadStatus } from "../../shared/utilities/LoadStatus.ts";

const statIcons = {
  "total-problems": FaChartBar,
  "total-revisions": FaRedoAlt,
  "success-rate": FaChartBar,
};

const DashboardPage = () => {

  const [dashboard, setDashboard] = useState<DashboardModel>();
  
  const [items, setItems] = useState<RevisionItemModel[]>([]);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("loading");

  const navigate = useNavigate();

  const loadDashboard = useCallback(() => {
    return Promise.allSettled([
      dashboardPresenter.load(),
      revisionPresetner.previewRevisionItems(),
    ]).then(([dashboardResult, itemsResult]) => {

      if (dashboardResult.status === "fulfilled") {
        setDashboard(dashboardResult.value);
      } else {
        console.error("Error fetching dashboard data:", dashboardResult.reason);
      }

      if (itemsResult.status === "fulfilled") {
        setItems(itemsResult.value);
      } else {
        console.error("Error fetching revision items:", itemsResult.reason);
      }

      setLoadStatus(dashboardResult.status === "rejected" || itemsResult.status === "rejected" ? "error" : "success");
    });
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleRetry = () => {
    setLoadStatus("loading");
    loadDashboard();
  };

  const handleCreateProblem = () => {
    navigate("/create");
  };

  return (
    <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface">

      <DotGridBackground />

      <Header showCreateButton />

      <section className="mx-auto max-w-[1200px] px-5 py-8">
        {loadStatus === "loading" ? <DashboardSkeleton /> : loadStatus === "error" ? (
          <LoadErrorState
            title="Couldn't load your dashboard"
            message="Check your connection and try again."
            onRetry={handleRetry}
          />
        ) : (
          <>
            {dashboard?.revisionInfo ? (
              <RevisionHero revisionInfo={dashboard.revisionInfo} />
            ) : (
              <Hero />
            )}

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {dashboard?.revisionStats.map((stat: { id: string; title: string; value: string }) => {
                const Icon = statIcons[stat.id as keyof typeof statIcons] ?? FaChartBar;
                return (
                  <article
                    className="rounded-lg border border-outline-variant/70 bg-surface-container-low p-6"
                    key={stat.id}
                  >
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <Icon aria-hidden="true" className="size-4 text-primary" />
                      <p className="text-label-sm font-medium uppercase">
                        {stat.title}
                      </p>
                    </div>
                    <p className="mt-2 text-headline-md font-normal text-on-surface">
                      {stat.value}
                    </p>
                  </article>
                );
              })}
            </div>

            {items.length === 0 ? (
              <DashboardEmptyState onCreateProblem={handleCreateProblem} />
            ) : (
              <DashboardItemsList items={items} onDeleteSuccess={loadDashboard} />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
