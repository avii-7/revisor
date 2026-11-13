import { useCallback, useRef, useState } from "react";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: unknown };

type ActionState<T> =
  | { status: "idle" }
  | { status: "pending" }
  | ActionResult<T>;

export function useAsyncAction<Args extends unknown[], Result>(
  action: (...args: Args) => Promise<Result>,
) {
  const [state, setState] = useState<ActionState<Result>>({ status: "idle" });
  const pending = useRef(false);

  const execute = useCallback(async (
    ...args: Args
  ): Promise<ActionResult<Result> | { status: "busy" }> => {
    // A ref blocks duplicate calls before React renders the pending state.
    if (pending.current) return { status: "busy" };

    pending.current = true;
    setState({ status: "pending" });

    try {
      const data = await action(...args);
      const result = { status: "success", data } as const;
      setState(result);
      return result;
    } catch (error) {
      const result = { status: "error", error } as const;
      setState(result);
      return result;
    } finally {
      pending.current = false;
    }
  }, [action]);

  const reset = useCallback(() => {
    // Reset must not hide a request that is still running.
    if (!pending.current) setState({ status: "idle" });
  }, []);

  return { state, execute, reset, isPending: state.status === "pending" };
}
