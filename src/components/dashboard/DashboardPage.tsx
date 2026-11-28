import { FaChartBar, FaRedoAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import DotGridBackground from "../common/DotGridBackground.tsx";
import Header from "../common/Header.tsx";
import RevisionHero from "./RevisionHero.tsx";
import type { DashboardModel } from "./services/DashboardPresenter.ts";
import { dashboardPresenter, revisionPresetner } from "../../shared/container.ts";
import type { RevisionItemModel } from "../../shared/presenters/RevisionPresenter.ts";
import DashboardEmptyState from "./components/DashboardEmptyState.tsx";
import DashboardItemsList from "./components/DashboardItemsList.tsx";
import DashboardSkeleton, { DashboardItemsSkeleton } from "./components/DashboardSkeleton.tsx";
import LoadErrorState from "../common/LoadErrorState.tsx";
import type { LoadStatus } from "../../shared/utilities/LoadStatus.ts";
import "./DashboardPage.css";

type DashboardLoadStatus = LoadStatus | "refreshing";

const DashboardPage = () => {

  const [dashboard, setDashboard] = useState<DashboardModel>();
  const [items, setItems] = useState<RevisionItemModel[]>();
  const [dashboardStatus, setDashboardStatus] = useState<DashboardLoadStatus>("loading");
  const [itemsStatus, setItemsStatus] = useState<DashboardLoadStatus>("loading");
  const [dashboardReload, setDashboardReload] = useState(0);
  const [itemsReload, setItemsReload] = useState(0);
  const isRefreshing = dashboardStatus === "refreshing" || itemsStatus === "refreshing";

  useEffect(() => {
    let active = true;

    dashboardPresenter.load().then((data) => {
      if (!active) return;
      setDashboard(data);
      setDashboardStatus("success");
    }, (error) => {
      if (!active) return;
      console.error("Error fetching dashboard data:", error);
      setDashboardStatus("error");
    });

    return () => { active = false; };
  }, [dashboardReload]);

  useEffect(() => {
    let active = true;

    revisionPresetner.previewRevisionItems().then((data) => {
      if (!active) return;
      setItems(data);
      setItemsStatus("success");
    }, (error) => {
      if (!active) return;
      console.error("Error fetching revision items:", error);
      setItemsStatus("error");
    });

    return () => { active = false; };
  }, [itemsReload]);

  const retryDashboard = () => {
    setDashboardStatus("refreshing");
    setDashboardReload((current) => current + 1);
  };

  const retryItems = () => {
    setItemsStatus("refreshing");
    setItemsReload((current) => current + 1);
  };

  const refreshAfterDelete = () => {
    retryDashboard();
    retryItems();
  };

  return (
    <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface">

      <DotGridBackground />

      <Header showCreateButton />

      {isRefreshing && (
        <div
          role="progressbar"
          aria-label="Refreshing dashboard"
          className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-primary/20"
        >
          <div className="dashboard-refresh__indicator h-full w-full bg-primary motion-safe:w-1/3" />
        </div>
      )}

      <section className="mx-auto max-w-[1200px] px-5 py-8">
        {dashboardStatus === "loading" ? <DashboardSkeleton /> : !dashboard ? (
          <LoadErrorState
            title="Couldn't load your dashboard"
            message="Check your connection and try again."
            onRetry={retryDashboard}
          />
        ) : dashboard.revisionInfo.state === "empty" ? (
          <DashboardEmptyState revisionInfo={dashboard.revisionInfo} />
        ) : (
          <>
            <RevisionHero revisionInfo={dashboard.revisionInfo} />

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {dashboard.revisionStats.map((stat) => {
                const Icon = stat.id === "due_revision_items" ? FaRedoAlt : FaChartBar;
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
          </>
        )}

        {dashboard?.revisionInfo.state !== "empty" && (
          <div className="mt-9">
            {itemsStatus === "loading" ? <DashboardItemsSkeleton /> : !items ? (
              <LoadErrorState
                title="Couldn't load recent problems"
                message="Check your connection and try again."
                onRetry={retryItems}
              />
            ) : (
              <DashboardItemsList items={items} onDeleteSuccess={refreshAfterDelete} />
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
