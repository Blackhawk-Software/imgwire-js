import { describe, expect, it, vi } from "vitest";

import { ImgwireClient } from "../src/client/imgwire-client.ts";

function createMockFile(parts: BlobPart[], name: string, type: string): File {
  const blob = new Blob(parts, { type });

  return Object.assign(blob, {
    name,
    lastModified: 0
  }) as File;
}

describe("ImgwireClient", () => {
  it("initializes grouped resources", () => {
    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: vi.fn<typeof fetch>()
    });

    expect(client.images).toBeDefined();
  });

  it("sends auth and resource requests through the generated client", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          fields: {},
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 1,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const client = new ImgwireClient({
      apiKey: "ck_test",
      baseUrl: "https://api.example.test",
      fetch: fetchMock
    });

    await client.images.create(
      {
        file_name: "hero.png"
      },
      {
        uploadToken: "upload_123"
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(
      "https://api.example.test/api/v1/images/standard_upload?upload_token=upload_123"
    );
    expect(init).toMatchObject({
      method: "POST",
      headers: expect.objectContaining({
        Authorization: "Bearer ck_test",
        "Content-Type": "application/json"
      })
    });
  });

  it("uploads a File to the presigned url and reports progress", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const progressEvents: number[] = [];
    const xhrRequests: Array<{
      method: string;
      url: string;
      headers: Record<string, string>;
      body: ArrayBuffer | Blob | Uint8Array | undefined;
    }> = [];
    const xhrFactory = () =>
      new MockXmlHttpRequest(xhrRequests) as unknown as XMLHttpRequest;

    const client = new ImgwireClient({
      apiKey: "ck_test",
      baseUrl: "https://api.example.test",
      fetch: fetchMock,
      xhrFactory
    });

    const file = createMockFile(["data"], "hero.png", "image/png");

    const image = await client.images.upload(file, {
      onProgress(progress) {
        progressEvents.push(progress.loaded);
      }
    });

    expect(image.id).toBe("img_123");
    expect(
      image.url({
        preset: "thumbnail",
        rotate: 90
      })
    ).toBe("https://cdn.imgwire.dev/example.png@thumbnail?rotate=90");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(progressEvents).toEqual([2, 4]);
    expect(xhrRequests).toEqual([
      {
        method: "PUT",
        url: "https://uploads.imgwire.dev/example",
        headers: {
          "Content-Type": "image/png"
        },
        body: file
      }
    ]);
    const requestInit = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(requestInit.body).toContain('"file_name":"hero.png"');
  });

  it("uses the global getUploadToken provider for upload()", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const getUploadToken = vi.fn(async () => "server_generated_token");
    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: fetchMock,
      getUploadToken,
      xhrFactory: () => new MockXmlHttpRequest([]) as unknown as XMLHttpRequest
    });

    await client.images.upload(
      createMockFile(["data"], "hero.png", "image/png")
    );

    expect(getUploadToken).toHaveBeenCalledTimes(1);
    const [url] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(
      "https://api.imgwire.dev/api/v1/images/standard_upload?upload_token=server_generated_token"
    );
  });

  it("prefers the per-call getUploadToken provider over the global provider", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const globalProvider = vi.fn(async () => "global_token");
    const localProvider = vi.fn(async () => "local_token");
    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: fetchMock,
      getUploadToken: globalProvider,
      xhrFactory: () => new MockXmlHttpRequest([]) as unknown as XMLHttpRequest
    });

    await client.images.upload(
      createMockFile(["data"], "hero.png", "image/png"),
      {
        getUploadToken: localProvider
      }
    );

    expect(localProvider).toHaveBeenCalledTimes(1);
    expect(globalProvider).not.toHaveBeenCalled();
    const [url] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(
      "https://api.imgwire.dev/api/v1/images/standard_upload?upload_token=local_token"
    );
  });

  it("prefers an explicit uploadToken over any upload token provider", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const globalProvider = vi.fn(async () => "global_token");
    const localProvider = vi.fn(async () => "local_token");
    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: fetchMock,
      getUploadToken: globalProvider,
      xhrFactory: () => new MockXmlHttpRequest([]) as unknown as XMLHttpRequest
    });

    await client.images.upload(
      createMockFile(["data"], "hero.png", "image/png"),
      {
        getUploadToken: localProvider,
        uploadToken: "explicit_token"
      }
    );

    expect(localProvider).not.toHaveBeenCalled();
    expect(globalProvider).not.toHaveBeenCalled();
    const [url] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe(
      "https://api.imgwire.dev/api/v1/images/standard_upload?upload_token=explicit_token"
    );
  });

  it("extends created images with url generation", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.jpg",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "jpg",
            hash_sha256: null,
            height: 100,
            id: "img_456",
            idempotency_key: null,
            mime_type: "image/jpeg",
            original_filename: "example.jpg",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 10,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 100
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: fetchMock
    });

    const response = await client.images.create({
      file_name: "example.jpg"
    });

    expect(
      response.image.url({
        preset: "thumbnail",
        width: 150,
        height: 150,
        rotate: 90
      })
    ).toBe(
      "https://cdn.imgwire.dev/example.jpg@thumbnail?height=150&rotate=90&width=150"
    );
  });

  it("fetches images by id and returns an extended image object", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          cdn_url: "https://cdn.imgwire.dev/uploaded.png",
          created_at: "2026-04-14T00:00:00Z",
          custom_metadata: {},
          deleted_at: null,
          environment_id: null,
          exif_data: {},
          extension: "png",
          hash_sha256: null,
          height: 400,
          id: "img_fetch_123",
          idempotency_key: null,
          mime_type: "image/png",
          original_filename: "uploaded.png",
          processed_metadata_at: null,
          purpose: null,
          size_bytes: 100,
          status: "READY",
          updated_at: "2026-04-14T00:00:00Z",
          upload_token_id: null,
          width: 600
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const client = new ImgwireClient({
      apiKey: "ck_test",
      baseUrl: "https://api.example.test",
      fetch: fetchMock
    });

    const image = await client.images.fetch("img_fetch_123");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe("https://api.example.test/api/v1/images/img_fetch_123");
    expect(init).toMatchObject({
      method: "GET",
      headers: expect.objectContaining({
        Authorization: "Bearer ck_test"
      })
    });
    expect(
      image.url({
        rotate: 90
      })
    ).toBe("https://cdn.imgwire.dev/uploaded.png?rotate=90");
  });

  it("uploads raw binary data without depending on File", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_raw_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const rawBytes = new Uint8Array([1, 2, 3, 4]);
    const xhrRequests: Array<{
      method: string;
      url: string;
      headers: Record<string, string>;
      body: ArrayBuffer | Blob | Uint8Array | undefined;
    }> = [];

    const client = new ImgwireClient({
      apiKey: "ck_test",
      baseUrl: "https://api.example.test",
      fetch: fetchMock,
      xhrFactory: () =>
        new MockXmlHttpRequest(xhrRequests) as unknown as XMLHttpRequest
    });

    const image = await client.images.uploadRaw({
      contentLength: rawBytes.byteLength,
      data: rawBytes,
      fileName: "hero.png",
      mimeType: "image/png"
    });

    expect(image.id).toBe("img_raw_123");
    expect(xhrRequests).toEqual([
      {
        method: "PUT",
        url: "https://uploads.imgwire.dev/example",
        headers: {
          "Content-Type": "image/png"
        },
        body: rawBytes
      }
    ]);
    const requestInit = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(requestInit.body).toContain('"content_length":4');
    expect(requestInit.body).toContain('"file_name":"hero.png"');
  });

  it("uploads raw binary data with progress callbacks", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          image: {
            cdn_url: "https://cdn.imgwire.dev/example.png",
            created_at: "2026-04-14T00:00:00Z",
            custom_metadata: {},
            deleted_at: null,
            environment_id: null,
            exif_data: {},
            extension: "png",
            hash_sha256: null,
            height: 1,
            id: "img_raw_progress_123",
            idempotency_key: null,
            mime_type: "image/png",
            original_filename: "hero.png",
            processed_metadata_at: null,
            purpose: null,
            size_bytes: 4,
            status: "READY",
            updated_at: "2026-04-14T00:00:00Z",
            upload_token_id: null,
            width: 1
          },
          upload_url: "https://uploads.imgwire.dev/example"
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          status: 200
        }
      )
    );

    const progressEvents: number[] = [];
    const client = new ImgwireClient({
      apiKey: "ck_test",
      fetch: fetchMock,
      xhrFactory: () => new MockXmlHttpRequest([]) as unknown as XMLHttpRequest
    });

    await client.images.uploadRawWithProgress({
      contentLength: 4,
      data: new Uint8Array([1, 2, 3, 4]),
      fileName: "hero.png",
      mimeType: "image/png",
      onProgress(progress) {
        progressEvents.push(progress.loaded);
      }
    });

    expect(progressEvents).toEqual([2, 4]);
  });
});

class MockXmlHttpRequest {
  status = 200;
  statusText = "OK";
  responseType = "text";
  timeout = 0;
  upload: {
    onprogress:
      | null
      | ((event: {
          loaded: number;
          total: number;
          lengthComputable: boolean;
        }) => void);
  } = {
    onprogress: null
  };
  onabort: null | (() => void) = null;
  onerror: null | (() => void) = null;
  onload: null | (() => void) = null;
  ontimeout: null | (() => void) = null;

  private readonly requests: Array<{
    method: string;
    url: string;
    headers: Record<string, string>;
    body: ArrayBuffer | Blob | Uint8Array | undefined;
  }>;
  private readonly headers: Record<string, string> = {};
  private method = "";
  private url = "";

  constructor(
    requests: Array<{
      method: string;
      url: string;
      headers: Record<string, string>;
      body: ArrayBuffer | Blob | Uint8Array | undefined;
    }>
  ) {
    this.requests = requests;
  }

  abort() {
    this.onabort?.();
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  send(body: ArrayBuffer | Blob | Uint8Array) {
    this.upload.onprogress?.({
      lengthComputable: true,
      loaded: 2,
      total: 4
    });
    this.upload.onprogress?.({
      lengthComputable: true,
      loaded: 4,
      total: 4
    });
    this.requests.push({
      method: this.method,
      url: this.url,
      headers: { ...this.headers },
      body
    });
    this.onload?.();
  }

  setRequestHeader(name: string, value: string) {
    this.headers[name] = value;
  }
}
