import { describe, expect, it } from "vitest";

import {
  extendImage,
  type ImageUrlOptions
} from "../src/images/url-builder.ts";

function makeImage() {
  return extendImage({
    can_upload: true,
    cdn_url: "https://cdn.imgwire.dev/example",
    created_at: "2026-04-14T00:00:00Z",
    custom_metadata: {},
    deleted_at: null,
    environment_id: null,
    exif_data: {},
    extension: "jpg",
    hash_sha256: null,
    height: 100,
    id: "img_1",
    idempotency_key: null,
    is_directly_deliverable: true,
    mime_type: "image/jpeg",
    original_filename: "example.jpg",
    processed_metadata_at: null,
    purpose: null,
    size_bytes: 100,
    status: "READY",
    updated_at: "2026-04-14T00:00:00Z",
    upload_token_id: null,
    width: 100
  });
}

function expectUrl(
  options: ImageUrlOptions,
  expectedParams: Record<string, string>,
  expectedPath = "/example"
) {
  const url = new URL(makeImage().url(options));

  expect(url.origin).toBe("https://cdn.imgwire.dev");
  expect(url.pathname).toBe(expectedPath);
  expect(Object.fromEntries(url.searchParams.entries())).toEqual(
    expectedParams
  );
}

describe("extendImage", () => {
  it("builds transformed urls with presets and canonical params", () => {
    expect(
      makeImage().url({
        preset: "thumbnail",
        bg: "#ffffff",
        h: 150,
        rot: 90,
        w: 150
      })
    ).toBe(
      "https://cdn.imgwire.dev/example@thumbnail?background=ffffff&height=150&rotate=90&width=150"
    );
  });

  it("normalizes worker-compatible boolean behavior", () => {
    expectUrl(
      {
        enlarge: false,
        strip_metadata: true
      },
      {
        strip_metadata: "true"
      }
    );
  });

  it("supports auto as an output format", () => {
    expectUrl(
      {
        format: "auto"
      },
      {
        format: "auto"
      }
    );
  });

  it("rejects duplicate aliases for the same canonical rule", () => {
    expect(() =>
      makeImage().url({
        width: 100,
        w: 200
      })
    ).toThrow("Duplicate transformation rule: width");
  });

  it("ignores invalid transformation values instead of emitting them", () => {
    expectUrl(
      {
        background: "not-a-color",
        blur: 0.2,
        height: 8193,
        pixelate: 1,
        quality: 101,
        watermark_url: "http://example.com/logo.png",
        width: 320
      },
      {
        width: "320"
      }
    );

    expectUrl(
      {
        pixelate: 257
      },
      {}
    );
  });

  it("covers every example from the URL transformations guide", () => {
    expectUrl(
      {
        w: 800,
        h: 600,
        resizing_type: "cover"
      },
      {
        height: "600",
        resizing_type: "cover",
        width: "800"
      }
    );

    expectUrl(
      {
        width: 1200,
        format: "jpg",
        q: 85
      },
      {
        format: "jpeg",
        quality: "85",
        width: "1200"
      }
    );

    expectUrl(
      {
        crop: "400:300:noea"
      },
      {
        crop: "400:300:northeast"
      }
    );

    expectUrl(
      {
        watermark_url: "https://example.com/logo.png",
        watermark_position: "southeast:-24:-24:0.85",
        format: "webp"
      },
      {
        format: "webp",
        watermark_position: "southeast:-24:-24:0.85",
        watermark_url: "aHR0cHM6Ly9leGFtcGxlLmNvbS9sb2dvLnBuZw=="
      }
    );

    expectUrl(
      {
        watermark: "logo_image_id",
        watermark_position: "se:-24:-24",
        format: "webp"
      },
      {
        format: "webp",
        watermark: "logo_image_id",
        watermark_position: "southeast:-24:-24"
      }
    );

    expectUrl(
      {
        duotone: {
          shadowColor: "#0b1f5e",
          highlightColor: "#ff2a2a"
        }
      },
      {
        duotone: "0b1f5e:ff2a2a"
      }
    );
  });

  it("supports all transform rules from the guide", () => {
    expectUrl(
      {
        adjust: "1.1:0.9:0.2",
        background: "#ffffff",
        background_alpha: 0.5,
        blur: true,
        brightness: 1.25,
        color_profile: "srgb",
        colorize: "#abc",
        contrast: "1.2:0.5",
        crop: "400:300:noea",
        dpi: 300,
        dpr: 2,
        duotone: "#000:#fff",
        enlarge: true,
        extend: "10:20:30:40:#ffffff",
        extend_aspect_ratio: "16:9",
        flip: "true:false",
        format: "jpg",
        gradient: "#000,#fff:90:0.25:overlay",
        gravity: "ce:sm",
        height: 600,
        hue: 25,
        keep_copyright: true,
        lightness: 1.1,
        "min-height": 100,
        "min-width": 120,
        monochrome: "#333",
        negate: "alpha:true",
        normalize: "1:99",
        padding: "1:2:3:4",
        pixelate: 8,
        quality: 85,
        resizing_algorithm: "lanczos3",
        resizing_type: "fit",
        rotate: "45:#fff",
        saturation: 1.5,
        sharpen: true,
        strip_color_profile: false,
        strip_metadata: true,
        watermark: "logo_image_id:se:-24:-24",
        watermark_position: "se:-24:-24:0.85:overlay",
        watermark_rotate: "15:#000",
        watermark_shadow: "#000:4:2:3",
        watermark_size: "200:100:0.5",
        watermark_text: "Logo",
        watermark_url: "https://example.com/logo.png",
        width: 800,
        zoom: "2:ne"
      },
      {
        adjust: "1.1:0.9:0.2",
        background: "ffffff",
        background_alpha: "0.5",
        blur: "true",
        brightness: "1.25",
        color_profile: "srgb",
        colorize: "abc",
        contrast: "1.2:0.5",
        crop: "400:300:northeast",
        dpi: "300",
        dpr: "2",
        duotone: "000:fff",
        enlarge: "true",
        extend: "10:20:30:40:ffffff",
        extend_aspect_ratio: "16:9",
        flip: "horizontal",
        format: "jpeg",
        gradient: "000,fff:90:0.25:overlay",
        gravity: "attention",
        height: "600",
        hue: "25",
        keep_copyright: "true",
        lightness: "1.1",
        "min-height": "100",
        "min-width": "120",
        monochrome: "333",
        negate: "alpha:true",
        normalize: "1:99",
        padding: "1:2:3:4",
        pixelate: "8",
        quality: "85",
        resizing_algorithm: "lanczos3",
        resizing_type: "inside",
        rotate: "45:fff",
        saturation: "1.5",
        sharpen: "true",
        strip_color_profile: "false",
        strip_metadata: "true",
        watermark: "logo_image_id:southeast:-24:-24",
        watermark_position: "southeast:-24:-24:0.85:overlay",
        watermark_rotate: "15:000",
        watermark_shadow: "000:4:2:3",
        watermark_size: "200:100:0.5",
        watermark_text: "Logo",
        watermark_url: "aHR0cHM6Ly9leGFtcGxlLmNvbS9sb2dvLnBuZw==",
        width: "800",
        zoom: "2:northeast"
      }
    );
  });

  it("serializes dictionary values for multi-field transforms", () => {
    const cases: Array<{
      options: ImageUrlOptions;
      expectedParams: Record<string, string>;
    }> = [
      {
        options: {
          adjust: { brightness: 1.1, saturation: 0.9, color: 0.2 }
        },
        expectedParams: { adjust: "1.1:0.9:0.2" }
      },
      {
        options: { contrast: { multiplier: 1.2, pivot: 0.4 } },
        expectedParams: { contrast: "1.2:0.4" }
      },
      {
        options: {
          crop: { x: 10, y: 20, width: 300, height: 200, gravity: "sw" }
        },
        expectedParams: { crop: "10:20:300:200:southwest" }
      },
      {
        options: {
          duotone: { shadowColor: "#0b1f5e", highlightColor: "#ff2a2a" }
        },
        expectedParams: { duotone: "0b1f5e:ff2a2a" }
      },
      {
        options: {
          extend: {
            top: 1,
            right: 2,
            bottom: 3,
            left: 4,
            background: "#fff"
          }
        },
        expectedParams: { extend: "1:2:3:4:fff" }
      },
      {
        options: { extend_aspect_ratio: { width: 16, height: 9 } },
        expectedParams: { extend_aspect_ratio: "16:9" }
      },
      {
        options: { flip: { horizontal: true, vertical: true } },
        expectedParams: { flip: "both" }
      },
      {
        options: {
          gradient: {
            colors: ["#111", "#222", "#333"],
            angle: 45,
            opacity: 0.3,
            blend: "multiply"
          }
        },
        expectedParams: { gradient: "111,222,333:45:0.3:multiply" }
      },
      {
        options: { negate: { alpha: true } },
        expectedParams: { negate: "alpha:true" }
      },
      {
        options: { normalize: { lower: 5, upper: 95 } },
        expectedParams: { normalize: "5:95" }
      },
      {
        options: { padding: { top: 1, right: 2, bottom: 3, left: 4 } },
        expectedParams: { padding: "1:2:3:4" }
      },
      {
        options: { rotate: { angle: 45, background: "#fff" } },
        expectedParams: { rotate: "45:fff" }
      },
      {
        options: { sharpen: { sigma: 1, m1: 2 } },
        expectedParams: { sharpen: '{"m1":2,"sigma":1}' }
      },
      {
        options: {
          watermark: { imageId: "logo", gravity: "se", x: -1, y: -2 }
        },
        expectedParams: { watermark: "logo:southeast:-1:-2" }
      },
      {
        options: {
          watermark_position: {
            gravity: "southeast",
            x: -24,
            y: -24,
            opacity: 0.85,
            blend: "overlay"
          }
        },
        expectedParams: {
          watermark_position: "southeast:-24:-24:0.85:overlay"
        }
      },
      {
        options: { watermark_rotate: { angle: 15, background: "#000" } },
        expectedParams: { watermark_rotate: "15:000" }
      },
      {
        options: { watermark_shadow: { color: "#000", blur: 4, x: 1, y: 2 } },
        expectedParams: { watermark_shadow: "000:4:1:2" }
      },
      {
        options: { watermark_size: { width: 100, height: 50, scale: 0.5 } },
        expectedParams: { watermark_size: "100:50:0.5" }
      },
      {
        options: { watermark_text: { text: "Hello", color: "ffffff" } },
        expectedParams: {
          watermark_text: '{"color":"ffffff","text":"Hello"}'
        }
      },
      {
        options: { zoom: { factor: 2, gravity: "ne" } },
        expectedParams: { zoom: "2:northeast" }
      }
    ];

    for (const testCase of cases) {
      expectUrl(testCase.options, testCase.expectedParams);
    }
  });
});
