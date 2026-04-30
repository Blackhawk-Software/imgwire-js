![imgwire.dev Logo](https://cdn.imgwire.dev/6b024480-a5ac-426d-b539-2e4fccc4c6ac/26f80c13-48bd-4bb9-866e-5e9392b11a6a/4ba5fe50-433b-40db-a847-938d2081c21a?w=280&quality=80)

# `imgwire-js`

[![npm version](https://img.shields.io/npm/v/%40imgwire%2Fjs)](https://www.npmjs.com/package/@imgwire/js)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Blackhawk-Software/imgwire-js/actions/workflows/ci.yml/badge.svg)](https://github.com/Blackhawk-Software/imgwire-js/actions/workflows/ci.yml)
[![Release](https://github.com/Blackhawk-Software/imgwire-js/actions/workflows/release.yml/badge.svg)](https://github.com/Blackhawk-Software/imgwire-js/actions/workflows/release.yml)

`@imgwire/js` is the browser-first JavaScript/TypeScript SDK for the imgwire API.

Imgwire helps you upload, serve, and transform images in your app without building and maintaining the image infrastructure yourself. Use `@imgwire/js` to send files from the browser, generate optimized CDN URLs, and ship image-heavy product flows without wiring together object storage, signing, delivery, and transformation logic by hand.

> [!TIP]
> Obtain an API key by signing up at [imgwire.dev](https://imgwire.dev). Read the full API & SDK documentation [here](https://docs.imgwire.dev/guides/frontend-quickstart).

## Installation

```bash
yarn add @imgwire/js
```

## Quick Start

```ts
import { ImgwireClient } from "@imgwire/js";

const client = new ImgwireClient({
  apiKey: "ck_..."
});

const file = new File(["hello"], "hero.png", {
  type: "image/png"
});

const image = await client.images.upload(file, {
  onProgress(progress) {
    console.log(progress.percent);
  }
});

const thumbnailUrl = image.url({ preset: "thumbnail" });
const transformedUrl = image.url({ width: 150, height: 150, rotate: 90 });
```

## Uploading Images

Use `client.images.upload(...)` to create the upload intent and then upload the file to the returned presigned URL:

```ts
const image = await client.images.upload(file, {
  onProgress(progress) {
    console.log(progress.loaded, progress.total, progress.percent);
  }
});
```

The returned value is the created image record, extended with URL helpers for CDN transformations.

For non-browser environments that do not expose `File`, use `uploadRaw(...)` or `uploadRawWithProgress(...)` with binary data you have already loaded:

```ts
const bytes = new Uint8Array([1, 2, 3, 4]);

const image = await client.images.uploadRawWithProgress({
  contentLength: bytes.byteLength,
  data: bytes,
  fileName: "hero.png",
  mimeType: "image/png",
  onProgress(progress) {
    console.log(progress.percent);
  }
});
```

If your client token requires signed uploads, provide an upload token directly or register a helper that fetches one from your backend.

Global provider:

```ts
const client = new ImgwireClient({
  apiKey: "ck_...",
  getUploadToken: async () => {
    const response = await fetch("/api/imgwire/upload-token", {
      method: "POST"
    });

    const { uploadToken } = await response.json();
    return uploadToken;
  }
});
```

Per-call provider:

```ts
await client.images.upload(file, {
  getUploadToken: async () => {
    const response = await fetch("/api/imgwire/upload-token", {
      method: "POST"
    });

    const { uploadToken } = await response.json();
    return uploadToken;
  }
});
```

Precedence order for upload tokens:

1. `uploadToken` passed directly to `images.upload(...)`
2. `getUploadToken` passed directly to `images.upload(...)`
3. `getUploadToken` configured on `ImgwireClient`

## Fetching Images By ID

Use `client.images.fetch(id)` when you already have an imgwire image id and want to retrieve the image record with the same URL helper surface used by uploads:

```ts
const image = await client.images.fetch("img_123");

const imageUrl = image.url({ rotate: 90 });
const thumbnailUrl = image.url({ preset: "thumbnail" });
```

## Image Transformation URLs

Returned image objects expose a `url(...)` helper that builds transformed CDN urls:

```ts
const image = await client.images.upload(file);

image.url({ preset: "thumbnail" });
image.url({ width: 150, height: 150, rotate: 90 });
image.url({ preset: "thumbnail", format: "webp", quality: 80 });
```

Presets are applied as a suffix on the CDN path before query params:

- `thumbnail` -> `@thumbnail`
- `small` -> `@small`
- `medium` -> `@medium`
- `large` -> `@large`

Example:

```ts
image.url({ preset: "thumbnail", rotate: 90 });
// https://cdn.imgwire.dev/example@thumbnail?rotate=90
```

The SDK validates and normalizes transformation values to match the CDN worker. Query params are emitted using canonical rule names and sorted deterministically. Invalid transform values are skipped instead of being emitted into the generated URL.

Supported transformations:

- `adjust` aliases: `a`
- `background` aliases: `bg`
- `background_alpha` aliases: `bga`
- `blur` aliases: `bl`
- `brightness` aliases: `br`
- `chroma_subsampling`
- `color_profile` aliases: `cp`, `icc`
- `colorize` aliases: `col`
- `contrast` aliases: `co`
- `crop` aliases: `c`
- `dpi`
- `dpr`
- `duotone` aliases: `dt`
- `enlarge` aliases: `el`
- `extend` aliases: `ex`
- `extend_aspect_ratio` aliases: `exar`, `extend_ar`
- `flip` aliases: `fl`
- `format` aliases: `f`, `ext`, `extension`
- `gradient` aliases: `gr`
- `gravity` aliases: `g`
- `height` aliases: `h`
- `hue` aliases: `hu`
- `keep_copyright` aliases: `kcr`
- `lightness` aliases: `l`
- `min-height` aliases: `mh`
- `min-width` aliases: `mw`
- `monochrome` aliases: `mc`
- `negate` aliases: `neg`
- `normalize` aliases: `norm`, `normalise`
- `padding` aliases: `pd`
- `pixelate` aliases: `pix`
- `progressive`
- `quality` aliases: `q`
- `resizing_algorithm` aliases: `ra`
- `resizing_type`
- `rotate` aliases: `rot`
- `saturation` aliases: `sa`
- `sharpen` aliases: `sh`
- `strip_color_profile` aliases: `scp`
- `strip_metadata` aliases: `sm`
- `watermark` aliases: `wm`
- `watermark_position` aliases: `wmp`, `watermark_offset`
- `watermark_rotate` aliases: `wmr`, `wm_rot`
- `watermark_shadow` aliases: `wmsh`
- `watermark_size` aliases: `wms`
- `watermark_text` aliases: `wmt`
- `watermark_url` aliases: `wmu`
- `width` aliases: `w`
- `zoom` aliases: `z`

Accepted worker values:

- colors: `rgb`, `rrggbb`, `rrggbbaa`, `#rgb`, `#rrggbb`, `#rrggbbaa`, or `r:g:b[:alpha]`
- `gravity`: `ce`, `center`, compass names, `attention`, `entropy`, and shorthand values like `noea`; `ce:sm` maps to `attention`
- `resizing_type`: `cover`, `contain`, `fill`, `inside`, `outside`; legacy `fit`, `fill-down`, and `auto` map to `inside`, while `force` maps to `fill`
- `format`: `auto`, `jpg`, `jpeg`, `png`, `webp`, `avif`, `gif`, `tiff`; `jpg` maps to `jpeg`
- `quality`: integer `1..100` or `auto`
- `progressive`: boolean or `auto`
- `chroma_subsampling`: `4:4:4`, `4:2:2`, or `auto`
- booleans: `true`, `false`, `t`, `f`, `1`, `0`

Multi-field transforms can be passed as their URL string syntax or as objects:

```ts
image.url({
  gradient: {
    colors: ["#0b1f5e", "#ff2a2a"],
    angle: 90,
    opacity: 0.25,
    blend: "overlay"
  }
});
```

`watermark_url` accepts either the already base64-encoded HTTPS URL value or a real HTTPS URL, which the SDK encodes for you.

Examples:

```ts
image.url({ w: 800, h: 600, resizing_type: "cover" });
image.url({ width: 1200, format: "jpg", q: 85 });
image.url({ crop: "400:300:noea", format: "webp" });
image.url({ strip_metadata: true, strip_color_profile: true, quality: "auto" });
image.url({ progressive: "auto", chroma_subsampling: "4:2:2" });
image.url({ enlarge: false, resizing_type: "fit", width: 960, height: 960 });
image.url({
  watermark_url: "https://example.com/logo.png",
  watermark_position: { gravity: "se", x: -24, y: -24, opacity: 0.85 },
  format: "webp"
});
```

## Development

```bash
yarn install
yarn generate
yarn ci
```

## Generation

This repository is generated from the imgwire API contract and then extended with handwritten browser-first SDK code.

The pipeline is:

1. acquire the raw OpenAPI document
2. shape it with `@imgwire/codegen-core`
3. generate a disposable base client with OpenAPI Generator
4. layer in handwritten SDK code

Set `OPENAPI_SOURCE` to override the spec source. By default:

- local/dev uses `http://localhost:8000/openapi.json`
- release-oriented generation can use `https://api.imgwire.dev/openapi.json` by setting `OPENAPI_RELEASE=true`

```bash
yarn generate
```

This writes:

- `openapi/raw.openapi.json`
- `openapi/sdk.openapi.json`
- `generated/`
- `CODEGEN_VERSION`

Generated code lives in `generated/` and should not be edited by hand. Durable SDK code lives in `src/`.

## Publishing

Release workflow scaffolding is present, but publishing details are still early-access and subject to change.

## License

MIT. See [LICENSE](./LICENSE).
