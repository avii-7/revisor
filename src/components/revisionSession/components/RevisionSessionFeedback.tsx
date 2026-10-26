import { FaArrowLeft, FaSpinner, FaUndo } from "react-icons/fa";
import DotGridBackground from "../../common/DotGridBackground.tsx";

interface RevisionSessionFeedbackProps {
  loading: boolean;
  onExit: () => void;
}

export default function RevisionSessionFeedback({ loading, onExit }: RevisionSessionFeedbackProps) {
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

  else {
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
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 text-label-sm font-semibold text-on-primary-container shadow-[0_12px_30px_rgba(77,142,255,0.22)] hover:bg-primary hover:text-on-primary transition duration-150 active:scale-[0.98] cursor-pointer"
          >
            <FaArrowLeft className="size-3.5" /> Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

}
