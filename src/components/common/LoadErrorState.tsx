interface LoadErrorStateProps {
  title: string;
  message: string;
  onRetry: () => void;
}

export default function LoadErrorState({ title, message, onRetry }: LoadErrorStateProps) {
  return (
    <section className="w-full rounded-xl border border-outline-variant/35 bg-surface-container-low p-8 text-center">
      <div role="alert">
        <h2 className="text-headline-md font-semibold text-on-surface">{title}</h2>
        <p className="mt-3 text-body-md text-on-surface-variant">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-lg bg-primary-container px-6 py-3 text-label-sm font-semibold text-on-primary-container transition hover:bg-primary hover:text-on-primary cursor-pointer"
      >
        Retry
      </button>
    </section>
  );
}
