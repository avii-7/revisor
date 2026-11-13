import { FaFolderOpen, FaPlus, FaPlusCircle } from "react-icons/fa";

interface DashboardEmptyStateProps {
  onCreateProblem: () => void;
}

export default function DashboardEmptyState({ onCreateProblem }: DashboardEmptyStateProps) {
  return (
    <>
      <section className="mt-12 bg-surface-container-low border border-outline/20 rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary/5 rounded-full absolute -top-4 -left-4 animate-pulse"></div>
          <div className="w-32 h-32 bg-tertiary/5 rounded-full absolute -bottom-8 -right-8 animate-pulse delay-[700ms]"></div>
          <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-outline-variant/10 flex items-center justify-center">
            <FaFolderOpen className="text-7xl text-primary/30" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-on-surface mb-2">No problems found</h3>
        <p className="text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
          Your revision library is currently empty. Add your first coding challenge, concept, or flashcard to start your mastery journey.
        </p>
        <button
          onClick={onCreateProblem}
          className="group flex items-center gap-3 px-8 py-4 bg-primary-container text-on-primary-container rounded-2xl font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <FaPlusCircle className="text-xl group-hover:rotate-90 transition-transform duration-300" />
          <span className="">Add Your First Problem</span>
        </button>
        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl opacity-40">
          <div className="h-2 bg-outline rounded-full"></div>
          <div className="h-2 bg-outline rounded-full w-2/3"></div>
          <div className="h-2 bg-outline rounded-full"></div>
          <div className="h-2 bg-outline rounded-full w-3/4"></div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={onCreateProblem}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40 group cursor-pointer"
      >
        <FaPlus className="text-3xl group-hover:rotate-180 transition-transform duration-500" />
      </button>
    </>
  );
}
