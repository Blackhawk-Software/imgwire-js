import type { XmlHttpRequestFactory } from "../client/types.ts";

export type UploadProgress = {
  loaded: number;
  total: number | null;
  percent: number | null;
  lengthComputable: boolean;
};

export type UploadWithProgressOptions = {
  contentType?: string;
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
  timeoutMs?: number;
  xhrFactory?: XmlHttpRequestFactory;
};

export async function uploadWithProgress(
  url: string,
  file: Blob,
  options: UploadWithProgressOptions = {}
): Promise<void> {
  const xhr = createXmlHttpRequest(options.xhrFactory);

  await new Promise<void>((resolve, reject) => {
    const cleanupAbort = bindAbortSignal(options.signal, xhr, reject);

    xhr.open("PUT", url);
    xhr.responseType = "text";

    if (options.timeoutMs != null && options.timeoutMs > 0) {
      xhr.timeout = options.timeoutMs;
    }

    if (options.contentType) {
      xhr.setRequestHeader("Content-Type", options.contentType);
    }

    xhr.upload.onprogress = (event) => {
      options.onProgress?.({
        loaded: event.loaded,
        total: event.lengthComputable ? event.total : null,
        percent: event.lengthComputable
          ? Math.round((event.loaded / event.total) * 100)
          : null,
        lengthComputable: event.lengthComputable
      });
    };

    xhr.onload = () => {
      cleanupAbort();
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(
        new Error(`Upload failed with status ${xhr.status} ${xhr.statusText}`)
      );
    };

    xhr.onerror = () => {
      cleanupAbort();
      reject(new Error("Upload failed due to a network error."));
    };

    xhr.ontimeout = () => {
      cleanupAbort();
      reject(new Error("Upload timed out."));
    };

    xhr.onabort = () => {
      cleanupAbort();
      reject(new Error("Upload was aborted."));
    };

    xhr.send(file);
  });
}

function createXmlHttpRequest(
  xhrFactory?: XmlHttpRequestFactory
): XMLHttpRequest {
  if (xhrFactory) {
    return xhrFactory();
  }

  if (typeof XMLHttpRequest !== "undefined") {
    return new XMLHttpRequest();
  }

  throw new Error(
    "ImgwireClient requires XMLHttpRequest support for upload progress. Pass options.xhrFactory in unsupported environments."
  );
}

function bindAbortSignal(
  signal: AbortSignal | undefined,
  xhr: XMLHttpRequest,
  reject: (reason?: unknown) => void
): () => void {
  if (!signal) {
    return () => {};
  }

  if (signal.aborted) {
    xhr.abort();
    reject(signal.reason ?? new Error("Upload was aborted."));
    return () => {};
  }

  const abort = () => xhr.abort();
  signal.addEventListener("abort", abort);
  return () => signal.removeEventListener("abort", abort);
}
