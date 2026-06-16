import {
  FaChartBar,
  FaCheckCircle,
  FaEllipsisV,
  FaRedoAlt,
  FaCog,
  FaUserCircle,
  FaPlus,
} from "react-icons/fa";
import DashboardService from "./services/DashboardService";
import { useCookies } from "react-cookie";
import CookieConstant from "../../utilities/CookieConstant";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { type DashboardResponseType } from "./models/DashboardResponse";
import RevisionItemService from "./services/RevisionItemService";
import type { RevisionItemType } from "./models/RevisionItem";
import DotGridBackground from "../common/DotGridBackground";

const dashboardService = new DashboardService();

const revisionItemService = new RevisionItemService();

const statIcons = {
  "total-problems": FaChartBar,
  "total-revisions": FaRedoAlt,
  "success-rate": FaChartBar,
};

const DashboardPage = () => {
  const [cookies] = useCookies([CookieConstant.jwtToken]);

  const [dashboard, setDashboard] = useState<DashboardResponseType>();
  const [items, setItems] = useState<RevisionItemType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.jwtToken) {
      navigate("/auth");
      return;
    }
  }, [navigate, cookies.jwtToken]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboard(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchRevisionItems = async () => {
      try {
        const data = await revisionItemService.getRevisionItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching revision items:", error);
      }
    };

    fetchDashboardData();
    fetchRevisionItems();
  }, []);

  return (
    <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface">

      <DotGridBackground />

      <nav className="border-b border-outline-variant/45 bg-surface-container-lowest/70">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5">
          <div className="flex h-full items-center gap-8">
            <span className="text-body-md font-semibold text-primary">
              Revisor
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 rounded-md px-7 py-3
              text-label-sm font-medium 
              text-on-surface-variant border border-outline-variant
              transition hover:bg-surface-container-high hover:text-on-surface"
            >
              <FaPlus /> Create New Item
            </button>

            <button
              className="grid size-8 place-items-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
              aria-label="Open settings"
              type="button"
            >
              <FaCog aria-hidden="true" className="size-4" />
            </button>
            <button
              className="grid size-8 place-items-center rounded-full border border-outline-variant bg-surface-container text-primary transition hover:border-primary"
              aria-label="Open profile"
              type="button"
            >
              <FaUserCircle aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-[1200px] px-5 py-8">
        <div className="rounded-lg border border-outline-variant/70 bg-surface-container-low p-7 shadow-[0_24px_80px_rgba(49,57,77,0.28)] sm:flex sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-label-sm font-medium uppercase text-primary">
              {dashboard?.revisionInfo?.topText}
            </p>
            <h1 className="mt-3 text-headline-md font-semibold text-on-surface">
              {dashboard?.revisionInfo?.title}
            </h1>
            <p className="mt-2 text-label-sm font-normal text-on-surface-variant">
              {dashboard?.revisionInfo?.subtitle}
            </p>
          </div>
          <button
            className="mt-6 rounded-md bg-primary-container px-8 py-3 text-label-sm font-medium text-on-surface shadow-[0_18px_44px_rgba(77,142,255,0.28)] transition hover:bg-primary hover:text-on-primary sm:mt-0"
            type="button"
          >
            {dashboard?.revisionInfo?.ctaText}
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {dashboard?.revisionStats.map((stat) => {
            const Icon =
              statIcons[stat.id as keyof typeof statIcons] ?? FaChartBar;
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
                  {item.subtitle}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-label-sm font-medium uppercase text-on-surface-variant">
                  Streak
                </p>
                <p className="mt-1 text-label-sm font-normal text-on-surface">
                  {item.streak} Revisions
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
      </section>
    </main>
  );
};

export default DashboardPage;
