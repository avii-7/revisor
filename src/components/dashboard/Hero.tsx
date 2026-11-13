import { FaRocket, FaBrain } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function Hero() {
  
  const navigate = useNavigate();

  return (
    <section className="bg-surface-container/40 backdrop-blur-xl border border-outline/20 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden text-on-surface shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <FaRocket className="text-sm text-primary-container" />
          Welcome to Revisor
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Master anything with precision.</h2>
        <p className="text-white/80 text-lg mb-8 leading-relaxed">
          This is where your next revision session will appear. Start by adding a problem you want to master using spaced repetition.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/create")}
            className="px-6 py-3 bg-white text-surface-container font-bold rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-xl transition-all cursor-pointer">
            How it works
          </button>
        </div>
      </div>
      <div className="absolute right-12 bottom-0 hidden lg:block text-white/10">
        <FaBrain className="size-[180px] animate-float" />
      </div>
    </section>
  );
}
