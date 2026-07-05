import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import {
  FaArrowLeft,
  FaFileAlt,
  FaLightbulb,
  FaCode,
  FaLink,
  FaCheckCircle,
  FaSpinner,
  FaUndo,
} from "react-icons/fa";
import { CookieConstant } from "../../shared/utilities/CookieConstant.ts";
import RevisionService from "../dashboard/services/RevisionItemService.ts";
import type { RevisionItemType } from "../dashboard/models/RevisionItem.ts";
import DotGridBackground from "../common/DotGridBackground.tsx";
import Header from "../common/Header.tsx";
import { capitalize } from "../../shared/utilities/CommonUtility.ts";
import { RatingValues, type Rating } from "../dashboard/tagsMenu/Rating.ts";
import { relativeTime } from "../../shared/utilities/dateutils.ts";

const revisionItemService = new RevisionService();

export default function RevisionSessionPage() {
  const [cookies] = useCookies([CookieConstant.jwtToken]);
  const navigate = useNavigate();

  const [items, setItems] = useState<RevisionItemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [sessionRevisedCount, setSessionRevisedCount] = useState<number>(0);

  // Authentication check
  useEffect(() => {
    if (!cookies.jwtToken) {
      navigate("/auth");
    }
  }, [navigate, cookies.jwtToken]);

  // Fetch revision items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await revisionItemService.dueRevisionItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching revision items for session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Timer effect
  useEffect(() => {
    if (loading || isCompleted || items.length === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, isCompleted, items.length]);

  const formatDuration = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return [hrs, mins, secs]
      .map((v) => v.toString().padStart(2, "0"))
      .join(":");
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const getNextRevisionText = (rating: Rating): string => {
    const currentItem = items[currentIndex];

    let nextRevisionDate: string | undefined;

    switch (rating) {
      case "easy":
        nextRevisionDate = currentItem.nextRevision?.easy;
        break;
      case "good":
        nextRevisionDate = currentItem.nextRevision?.good;
        break;
      case "hard":
        nextRevisionDate = currentItem.nextRevision?.hard;
        break;
      case "again":
        nextRevisionDate = currentItem.nextRevision?.again;
        break;
      default:
        break;
    }

    if (!nextRevisionDate) return "";

    return relativeTime(nextRevisionDate);
  };

  const handleAssess = async (rating: Rating) => {
    if (items.length === 0) return;

    const currentItem = items[currentIndex];

    try {
      await revisionItemService.submitReview({ itemID: currentItem.id, rating: rating });
      setSessionRevisedCount((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update revision progress on server:", error);
    }

    handleNext();
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
  };

  const handleExitSession = () => {
    navigate("/");
  };

  // Helper for styling difficulty tag
  const getRatingStyles = (rating: Rating) => {
    switch (rating) {
      case "easy":
        return `
      border-emerald-500/30
      bg-emerald-500/10
      text-emerald-400
      hover:border-emerald-400/50
      hover:bg-emerald-500/20
      hover:text-emerald-300
    `;

      case "good":
        return `
      border-sky-500/30
      bg-sky-500/10
      text-sky-400
      hover:border-sky-400/50
      hover:bg-sky-500/20
      hover:text-sky-300
    `;

      case "hard":
        return `
      border-amber-500/30
      bg-amber-500/10
      text-amber-400
      hover:border-amber-400/50
      hover:bg-amber-500/20
      hover:text-amber-300
    `;

      case "again":
        return `
      border-rose-500/30
      bg-rose-500/10
      text-rose-400
      hover:border-rose-400/50
      hover:bg-rose-500/20
      hover:text-rose-300
    `;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface flex items-center justify-center">
        <DotGridBackground />
        <div className="flex flex-col items-center gap-4 z-10">
          <FaSpinner className="size-10 text-primary animate-spin" />
          <span className="text-body-md text-on-surface-variant font-medium">Loading session...</span>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface flex items-center justify-center px-5">
        <DotGridBackground />
        <div className="max-w-md w-full bg-surface-container-low/65 border border-outline-variant/35 rounded-xl p-8 text-center shadow-2xl backdrop-blur-md z-10">
          <div className="grid size-14 place-items-center rounded-full bg-surface-container border border-outline-variant/30 text-primary mx-auto mb-6">
            <FaUndo className="size-6" />
          </div>
          <h2 className="text-headline-md font-semibold text-on-surface mb-2">No Items Found</h2>
          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
            You don't have any items scheduled for revision. Please add problems first from the dashboard.
          </p>
          <button
            onClick={handleExitSession}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 text-label-sm font-semibold text-on-primary-container shadow-[0_12px_30px_rgba(77,142,255,0.22)] hover:bg-primary hover:text-on-primary transition duration-150 active:scale-[0.98] cursor-pointer"
          >
            <FaArrowLeft className="size-3.5" /> Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <main className="min-h-screen bg-app-gradient relative font-primary text-on-surface flex flex-col overflow-x-hidden">
      <DotGridBackground />

      {/* Top Navbar */}
      <Header onLogoClick={handleExitSession}>
        {/* Session Timer Pill */}
        <div className="flex items-center gap-2.5 rounded-full px-4 py-2 bg-surface-container/60 border border-outline-variant/30 text-label-sm font-semibold tracking-wide shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
          <span className="text-on-surface-variant uppercase font-medium">Revision Session</span>
          <span className="text-primary font-mono text-body-md ml-1">{formatDuration(seconds)}</span>
        </div>
      </Header>

      {/* Main content Area */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-5 py-8">
        {isCompleted ? (
          /* Completion Screen */
          <section className="max-w-md w-full bg-surface-container-low/65 border border-outline-variant/35 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md flex flex-col items-center">
            <FaCheckCircle className="size-16 text-emerald-400 animate-bounce mb-6" />
            <h1 className="text-headline-md font-bold text-on-surface mb-2">Revision Complete!</h1>
            <p className="text-body-md text-on-surface-variant mb-6">
              Fantastic work. You completed your scheduled revisions for this session.
            </p>

            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container/40 border border-outline-variant/25 rounded-xl p-4 text-center">
                <span className="block text-label-sm font-semibold tracking-wider text-primary uppercase mb-1">
                  Time Spent
                </span>
                <span className="text-headline-md font-semibold text-on-surface font-mono">
                  {formatDuration(seconds)}
                </span>
              </div>
              <div className="bg-surface-container/40 border border-outline-variant/25 rounded-xl p-4 text-center">
                <span className="block text-label-sm font-semibold tracking-wider text-primary uppercase mb-1">
                  Revised
                </span>
                <span className="text-headline-md font-semibold text-on-surface font-mono">
                  {sessionRevisedCount} Items
                </span>
              </div>
            </div>

            <button
              onClick={handleExitSession}
              className="w-full rounded-lg bg-primary-container px-6 py-3 text-label-sm font-semibold text-on-primary-container shadow-[0_12px_30px_rgba(77,142,255,0.22)] hover:bg-primary hover:text-on-primary transition duration-150 active:scale-[0.98] cursor-pointer"
            >
              Back to Dashboard
            </button>
          </section>
        ) : (
          /* Active Question Session */
          <section className="w-full max-w-[800px] flex flex-col items-center">
            {/* Header Badges */}
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] bg-surface-container border border-outline-variant/20 text-on-surface-variant px-2.5 py-0.5 rounded-md">
              Problem {currentIndex + 1} of {items.length}
            </span>

            {/* Title */}
            <h1 className="mt-5 text-headline-md md:text-3xl font-semibold text-on-surface text-center tracking-tight max-w-[650px] leading-snug">
              {currentItem.title}
            </h1>

            {/* Question Details Card */}
            <article className="mt-8 w-full bg-surface-container-low/40 border border-outline-variant/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6">

              {/* Problem Description Sub-Card */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container border border-outline-variant/30 text-primary shadow-[0_0_12px_rgba(77,142,255,0.12)]">
                    <FaFileAlt className="size-4" />
                  </div>
                  <span className="text-label-sm font-semibold tracking-[0.08em] text-primary uppercase">
                    Problem Description
                  </span>
                </div>

                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {currentItem.content || "No description provided."}
                </p>

                {currentItem.platformUrl && (
                  <a
                    href={currentItem.platformUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 self-start text-label-sm font-medium text-primary hover:text-on-surface transition-colors focus:outline-none"
                  >
                    <FaLink className="size-3" /> View original problem link
                  </a>
                )}
              </div>

              {/* Reveal Section */}
              {!isRevealed ? (
                /* Reveal Trigger Button */
                <button
                  onClick={handleReveal}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-label-sm font-semibold text-on-surface py-4 shadow-md transition-colors hover:bg-surface-container-highest active:scale-[0.99] cursor-pointer"
                >
                  <FaLightbulb className="size-4 text-primary" /> Reveal Key Intuition & Solution
                </button>
              ) : (
                /* Revealed Content Area with smooth entrance */
                <div className="flex flex-col gap-6 border-t border-outline-variant/25 pt-6 animate-[fadeIn_0.3s_ease-out]">

                  {/* Key Intuition Card */}
                  {currentItem.keyIntuition ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2.5 text-primary">
                        <FaLightbulb className="size-4" />
                        <span className="text-label-sm font-semibold tracking-[0.08em] uppercase">
                          Key Intuition
                        </span>
                      </div>
                      <p className="text-body-md text-on-surface leading-relaxed p-4 bg-surface-container/30 border border-outline-variant/20 rounded-xl">
                        {currentItem.keyIntuition}
                      </p>
                    </div>
                  ) : null}

                  {/* Solution Code Card */}
                  {currentItem.solutionCode ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2.5 text-primary">
                        <FaCode className="size-4" />
                        <span className="text-label-sm font-semibold tracking-[0.08em] uppercase">
                          Solution Code
                        </span>
                      </div>
                      <pre className="p-4 bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl overflow-x-auto text-sm text-tertiary font-mono text-left leading-relaxed max-h-[300px]">
                        <code>{currentItem.solutionCode}</code>
                      </pre>
                    </div>
                  ) : null}

                  {/* Self-Assessment controls */}
                  <div className="flex flex-col gap-3 mt-4">
                    <span className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                      How well did you recall this?
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {RatingValues.map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleAssess(rating)}
                          className={`flex flex-col items-center justify-center py-2.5 px-4 border rounded-xl transition duration-150 active:scale-[0.98] cursor-pointer ${getRatingStyles(rating)}`}
                        >
                          <span className="font-semibold text-label-sm">{capitalize(rating)}</span>
                          <span className="text-[10px] font-medium mt-0.5"> {getNextRevisionText(rating)} </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Bottom Slider controls */}
            <div className="mt-8 w-full flex items-center justify-between max-w-[800px]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2  px-5 py-2.5 rounded-lg text-label-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <FaArrowLeft className="size-3" /> Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-surface-container border border-outline-variant/30 px-6 py-2.5 text-label-sm font-semibold text-on-surface transition hover:bg-surface-container-high hover:border-primary/50 active:scale-[0.98] cursor-pointer"
              >
                {currentIndex === items.length - 1 ? "Finish" : "Skip"}
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
