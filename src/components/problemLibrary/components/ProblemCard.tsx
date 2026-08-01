import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaCheckCircle,
  FaClock,
  FaEllipsisV,
  FaHistory,
} from "react-icons/fa";
import type { RevisionItemModel } from "../../../shared/presenters/RevisionPresenter.ts";
import {
  getProblemActivitySummary,
  getProblemRevisionSummary,
} from "../../../shared/presenters/RevisionPresenter.ts";
import { revisionPresetner } from "../../../shared/container.ts";

interface ProblemCardProps {
  item: RevisionItemModel;
  variant?: "library" | "compact";
  onDeleteSuccess?: () => void;
}

export default function ProblemCard({
  item,
  variant = "library",
  onDeleteSuccess,
}: ProblemCardProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClose = () => setIsMenuOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [isMenuOpen]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      try {
        await revisionPresetner.delete(item.id);
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } catch (err) {
        console.error("Failed to delete problem:", err);
        alert("Failed to delete problem. Please try again.");
      }
    }
  };

  if (variant === "compact") {
    return (
      <article className="flex items-center gap-5 border-b border-outline-variant/45 px-6 py-5 last:border-b-0">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high text-primary">
          <FaCheckCircle aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-label-sm font-semibold text-on-surface">
            {item.title}
          </h3>
          <p className="mt-1 truncate text-label-sm font-normal text-on-surface-variant">
            {item.content || item.keyIntuition || ""}
          </p>
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-label-sm font-medium uppercase text-on-surface-variant">
            Streak
          </p>
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="grid size-8 shrink-0 place-items-center rounded-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
            aria-label={`Open actions for ${item.title}`}
            type="button"
          >
            <FaEllipsisV aria-hidden="true" className="size-3" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-surface-container-high/95 backdrop-blur-xl border border-outline/25 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="py-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    navigate(`/edit/${item.id}`);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors text-label-sm text-left cursor-pointer font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    handleDelete();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/20 transition-colors text-label-sm text-left cursor-pointer font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-outline-variant/45 bg-surface-container-low/95 px-6 py-6 shadow-[0_20px_60px_rgba(6,14,32,0.32)] transition hover:border-primary/30 sm:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-headline-md font-semibold text-on-surface">
                {item.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-md text-on-surface-variant">
                <span className="flex items-center gap-2">
                  <FaHistory className="size-4" />
                  {getProblemRevisionSummary(item)}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="size-4" />
                  {getProblemActivitySummary(item)}
                </span>
              </div>

              {(item.tags?.length || 0) > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-white px-3 py-1 text-label-sm font-medium text-[#0b1326] border border-outline-variant/20 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative self-end md:self-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            aria-label={`Open actions for ${item.title}`}
            className="grid size-10 shrink-0 place-items-center rounded-xl text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
          >
            <FaEllipsisV className="size-4" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-surface-container-high/95 backdrop-blur-xl border border-outline/25 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="py-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    navigate(`/edit/${item.id}`);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors text-label-sm text-left cursor-pointer font-medium"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    handleDelete();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/20 transition-colors text-label-sm text-left cursor-pointer font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

