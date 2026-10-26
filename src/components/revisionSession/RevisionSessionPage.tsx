import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import RevisionService from "../dashboard/services/RevisionItemService.ts";
import type { ReviewRequest, RevisionItemType } from "../dashboard/models/RevisionItem.ts";
import DotGridBackground from "../common/DotGridBackground.tsx";
import Header from "../common/Header.tsx";
import { type Rating } from "../dashboard/tagsMenu/Rating.ts";
import { useAsyncAction } from "../../shared/utilities/useAsyncAction.ts";

import ReviewProblem from "./components/ReviewProblem.tsx";
import RevisionSessionSummary from "./components/RevisionSessionSummary.tsx";
import RevisionSessionFeedback from "./components/RevisionSessionFeedback.tsx";

const revisionItemService = new RevisionService();

const submitReview = (request: ReviewRequest) => revisionItemService.submitReview(request);

export default function RevisionSessionPage() {

  const navigate = useNavigate();

  const [items, setItems] = useState<RevisionItemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [sessionRevisedCount, setSessionRevisedCount] = useState<number>(0);
  const { state: submission, execute, reset, isPending: isSubmitting } = useAsyncAction(submitReview);

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

  const handleAssess = async (rating: Rating) => {
    if (items.length === 0 || isSubmitting) return;

    const currentItem = items[currentIndex];
    const result = await execute({ itemID: currentItem.id, rating });
    if (result.status === "success") {
      setSessionRevisedCount((prev) => prev + 1);
      handleNext();
    } else if (result.status === "error") {
      console.error("Failed to update revision progress on server:", result.error);
    }
  };

  const handleNext = () => {
    reset();
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    reset();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsRevealed(false);
    }
  };

  const handleExitSession = () => {
    navigate("/");
  };

  if (loading || items.length === 0) {
    return <RevisionSessionFeedback loading={loading} onExit={handleExitSession} />;
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
          <RevisionSessionSummary
            duration={formatDuration(seconds)}
            revisedCount={sessionRevisedCount}
            onExit={handleExitSession}
          />
        ) : (
          <ReviewProblem
            currentItem={currentItem}
            currentIndex={currentIndex}
            totalItems={items.length}
            isRevealed={isRevealed}
            isSubmitting={isSubmitting}
            hasSubmissionError={submission.status === "error"}
            onReveal={() => setIsRevealed(true)}
            onAssess={handleAssess}
            onPrevious={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </main>
  );
}
