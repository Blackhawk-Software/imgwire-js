import { describe, expect, it, vi } from "vitest";

import { ImgwireClient } from "../src/client/imgwire-client.ts";

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
        environmentId: "env_123",
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
        "Content-Type": "application/json",
        "X-Environment-Id": "env_123"
      })
    });
  });
});
