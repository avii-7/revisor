import { FaRocket, FaBrain, FaCheckCircle, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router";
import type { RevisionInfoModel } from "./services/DashboardPresenter.ts";

interface RevisionHeroProps {
  revisionInfo: RevisionInfoModel;
}

export default function RevisionHero({ revisionInfo }: RevisionHeroProps) {
  const navigate = useNavigate();
  const { title, subtitle, ctaText, state } = revisionInfo;

  const isCompleted = state === "completed";
  const badgeText = (isCompleted ? "All Caught Up" : "UP NEXT");
  const showCta = !isCompleted || !!ctaText;

  return (
    <section className="bg-surface-container/40 backdrop-blur-xl border border-outline/20 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden text-on-surface shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="relative z-10 max-w-xl pr-0 md:pr-56">

        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${isCompleted
            ? "bg-emerald-500/20 text-emerald-300 backdrop-blur-md"
            : "bg-white/20 text-white backdrop-blur-md"
          }`}>
          {isCompleted ? (
            <FaCheckCircle className="text-sm text-emerald-400" />
          ) : (
            <FaRocket className="text-sm text-primary-container" />
          )}
          {badgeText}
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            {subtitle}
          </p>
        ) : isCompleted ? (
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            You've reviewed all items due for today. Keep up the great work!
          </p>
        ) : null}
      </div>
      {showCta && (
        <div className="relative z-10 mt-8 flex md:absolute md:right-12 md:top-12 md:mt-0">
          <button
            onClick={() => navigate("/revision")}
            className="px-6 py-3 bg-white text-surface-container font-bold rounded-xl shadow-lg active:scale-95 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
          >
            <FaPlay className="text-xs text-primary-container" />
            {ctaText || "Start Revision"}
          </button>
        </div>
      )}
      {!showCta && (
        <div className="pointer-events-none absolute right-8 -bottom-6 hidden lg:block text-white/10 z-0">
          {isCompleted ? (
            <FaCheckCircle className="size-[180px] animate-float text-emerald-500/5" />
          ) : (
            <FaBrain className="size-[180px] animate-float" />
          )}
        </div>
      )}
    </section>
  );
}
