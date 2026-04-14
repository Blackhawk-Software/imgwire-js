export function withTimeout(
  fetchApi: typeof fetch,
  timeoutMs?: number
): typeof fetch {
  if (!timeoutMs || timeoutMs <= 0) {
    return fetchApi;
  }

  return async (input, init) => {
    const controller = new AbortController();
    const upstreamSignal = init?.signal;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const cleanup = bindUpstreamAbort(upstreamSignal, controller);

    try {
      return await fetchApi(input, {
        ...init,
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
      cleanup();
    }
  };
}

function bindUpstreamAbort(
  signal: AbortSignal | null | undefined,
  controller: AbortController
): () => void {
  if (!signal) {
    return () => {};
  }

  if (signal.aborted) {
    controller.abort(signal.reason);
    return () => {};
  }

  const abort = () => controller.abort(signal.reason);
  signal.addEventListener("abort", abort);
  return () => signal.removeEventListener("abort", abort);
}
