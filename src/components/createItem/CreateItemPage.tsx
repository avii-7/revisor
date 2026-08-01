import { useState, useRef, useEffect } from "react";
import {
  FaArrowLeft,
  FaLink,
  FaLightbulb,
  FaCode,
  FaSave,
  FaBold,
  FaItalic,
  FaListUl,
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router";
import DotGridBackground from "../common/DotGridBackground.tsx";
import Header from "../common/Header.tsx";
import { Tab } from "./Tab";
import { revisionPresetner } from "../../shared/container.ts";
import type { NewRevisionItemRequest } from "../../shared/presenters/RevisionPresenter.ts";

const CreateItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(Tab.intuition);
  const [intuition, setIntuition] = useState("");
  const [code, setCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchItemDetails = async () => {
      setIsLoading(true);
      try {
        const item = await revisionPresetner.loadItem(id);
        setTitle(item.title);
        setUrl(item.platformUrl || "");
        setIntuition(item.keyIntuition || "");
        setCode(item.solutionCode || "");
      } catch (err) {
        console.error("Failed to load problem details:", err);
        setError("Failed to load problem details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  const intuitionRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (syntax: string) => {
    const textarea = intuitionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);

    let newText = "";
    let cursorOffset = 0;

    if (syntax === "\n- ") {
      newText = `${before}\n- ${after}`;
      cursorOffset = 3;
    }
    else {
      const selected = text.substring(start, end);
      newText = `${before}${syntax}${selected}${syntax}${after}`;
      cursorOffset = syntax.length + selected.length;
    }

    setIntuition(newText);

    // Refocus and position the cursor appropriately
    setTimeout(() => {
      textarea.focus();
      const newPos = start + cursorOffset;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Problem title is required.");
      return;
    }

    // if (!intuition.trim()) {
    //   setError("Key intuition is required.");
    //   return;
    // }

    setIsSaving(true);
    setError(null);

    try {
      if (id) {
        await revisionPresetner.update(id, {
          title: title.trim(),
          platformUrl: url.trim() || null,
          keyIntuition: intuition.trim(),
          solutionCode: code.trim(),
        });
      } else {
        const newItem: NewRevisionItemRequest = {
          title: title.trim(),
          content: null,
          platformUrl: url.trim(),
          keyIntuition: intuition.trim(),
          solutionCode: code.trim(),
        };
        await revisionPresetner.create(newItem);
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to save problem:", err);
      setError("Failed to save the problem. Please check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-app-gradient font-primary text-on-surface relative overflow-x-hidden">
      {/* Subtle Dot Grid Overlay for Premium Aesthetic */}
      <DotGridBackground />

      <Header />

      <div className="relative z-10 mx-auto max-w-[900px] px-5 py-8">
        {/* Navigation & Header */}
        <header className="flex items-center justify-between border-b border-outline-variant/30 pb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-4 group cursor-pointer text-left focus:outline-none"
          >
            <div className="grid size-10 place-items-center rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface-variant transition group-hover:text-on-surface group-hover:border-primary/50 group-hover:bg-surface-container-high">
              <FaArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <div>
              <h1 className="text-headline-md font-semibold text-on-surface">
                {id ? "Edit Problem" : "Add Problem"}
              </h1>
              <p className="text-label-sm font-normal text-on-surface-variant mt-0.5">
                {id ? "Update details of your DSA recall library entry" : "Create a new entry in your DSA recall library"}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2.5 rounded-lg text-label-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 transition focus:outline-none"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2.5 text-label-sm font-semibold text-on-primary-container shadow-[0_12px_30px_rgba(77,142,255,0.22)] transition hover:bg-primary hover:text-on-primary hover:shadow-[0_12px_36px_rgba(77,142,255,0.35)] active:scale-[0.98] disabled:opacity-50 focus:outline-none cursor-pointer"
            >
              <FaSave className="size-4" /> {id ? "Save Changes" : "Save Problem"}
            </button>
          </div>
        </header>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-error-container/20 border border-error/30 text-error text-body-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-8 flex flex-col gap-6">
          {/* Card 1: Title and URL */}
          <div className="bg-surface-container-low/65 backdrop-blur-md border border-outline-variant/35 rounded-xl p-6 shadow-md flex flex-col gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-label-sm font-semibold tracking-[0.05em] text-primary-fixed-dim uppercase mb-2"
              >
                Problem Title
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="e.g., Two Sum, Merge K Sorted Lists..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white text-surface-container-lowest placeholder:text-outline/70 border border-outline-variant/40 rounded-lg px-4 py-3.5 text-base font-normal shadow-inner transition focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="url"
                className="text-label-sm font-semibold tracking-[0.05em] text-primary-fixed-dim uppercase mb-2"
              >
                Platform URL (Optional)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-outline/80 pointer-events-none">
                  <FaLink className="size-4" />
                </div>
                <input
                  id="url"
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white text-surface-container-lowest placeholder:text-outline/70 border border-outline-variant/40 rounded-lg pl-11 pr-4 py-3.5 text-base font-normal shadow-inner transition focus:outline-none focus:ring-2 focus:ring-primary/45 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Tabs and Main Intuition/Code editors */}
          <div className="bg-surface-container-low/65 backdrop-blur-md border border-outline-variant/35 rounded-xl shadow-md overflow-hidden flex flex-col min-h-[400px]">
            {/* Tabs Header */}
            <div className="flex border-b border-outline-variant/35">
              <button
                type="button"
                onClick={() => setActiveTab(Tab.intuition)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.08em] transition-all border-b-2 cursor-pointer focus:outline-none ${activeTab === Tab.intuition
                  ? "border-primary-container text-primary bg-surface-container-high/20"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/10"
                  }`}
              >
                <FaLightbulb className="size-4" /> Key Intuition
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(Tab.code)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.08em] transition-all border-b-2 cursor-pointer focus:outline-none ${activeTab === "code"
                  ? "border-primary-container text-primary bg-surface-container-high/20"
                  : "border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/10"
                  }`}
              >
                <FaCode className="size-4" /> Solution Code
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col relative">
              {activeTab === Tab.intuition ? (
                <div className="flex-1 flex flex-col p-6 min-h-[300px]">
                  <textarea
                    ref={intuitionRef}
                    required
                    placeholder="Write the 1-2 sentence core insight that cracks this problem..."
                    value={intuition}
                    onChange={(e) => setIntuition(e.target.value)}
                    className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant/40 border-0 p-0 w-full resize-none focus:outline-none focus:ring-0 text-base leading-relaxed"
                  />
                  {/* Floating Formatting Toolbar */}
                  <div className="absolute bottom-5 right-5 flex items-center gap-1 bg-surface-container/90 backdrop-blur border border-outline-variant/30 rounded-lg p-1.5 shadow-md">
                    <button
                      type="button"
                      onClick={() => insertMarkdown("**")}
                      title="Bold"
                      className="grid size-8 place-items-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition cursor-pointer focus:outline-none"
                    >
                      <FaBold className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("*")}
                      title="Italic"
                      className="grid size-8 place-items-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition cursor-pointer focus:outline-none"
                    >
                      <FaItalic className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertMarkdown("\n- ")}
                      title="Bullet List"
                      className="grid size-8 place-items-center rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition cursor-pointer focus:outline-none"
                    >
                      <FaListUl className="size-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col p-6 min-h-[300px]">
                  <textarea
                    placeholder="Write or paste the solution code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 bg-transparent text-tertiary font-mono placeholder:text-on-surface-variant/30 border-0 p-0 w-full resize-none focus:outline-none focus:ring-0 text-sm leading-relaxed"
                    spellCheck="false"
                  />
                </div>
              )}
            </div>
          </div>
        </form>
        )}
      </div>
    </main>
  );
};

export default CreateItemPage;
