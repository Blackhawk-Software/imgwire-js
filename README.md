# imgwire-js

`@imgwire/js` is the browser-first JavaScript/TypeScript SDK for the imgwire API.

Imgwire helps you upload, serve, and transform images in your app without building and maintaining the image infrastructure yourself. Use `@imgwire/js` to send files from the browser, generate optimized CDN URLs, and ship image-heavy product flows without wiring together object storage, signing, delivery, and transformation logic by hand.

## Installation

```bash
npm install @imgwire/js
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

## Image Transformation URLs

Returned image objects expose a `url(...)` helper that builds transformed CDN urls:

```ts
const image = await client.images.upload(file);

image.url({ preset: "thumbnail" });
image.url({ width: 150, height: 150, rotate: 90 });
image.url({ preset: "thumbnail", format: "webp", quality: 80 });
```

Presets are applied as a suffix after the file extension and before query params:

- `thumbnail` -> `@thumbnail`
- `small` -> `@small`
- `medium` -> `@medium`
- `large` -> `@large`

Example:

```ts
image.url({ preset: "thumbnail", rotate: 90 });
// https://cdn.imgwire.dev/example.jpg@thumbnail?rotate=90
```

The SDK validates and normalizes transformation values to match the CDN worker. Query params are emitted using canonical rule names and sorted deterministically.

Supported transformations:

- `background` aliases: `bg`
- `blur` aliases: `bl`
- `crop` aliases: `c`
- `dpr`
- `enlarge` aliases: `el`
- `extend` aliases: `ex`
- `extend_aspect_ratio` aliases: `exar`, `extend_ar`
- `flip` aliases: `fl`
- `format` aliases: `f`, `ext`, `extension`
- `gravity` aliases: `g`
- `height` aliases: `h`
- `keep_copyright` aliases: `kcr`
- `min-height` aliases: `mh`
- `min-width` aliases: `mw`
- `padding` aliases: `pd`
- `pixelate` aliases: `pix`
- `quality` aliases: `q`
- `resizing_type`
- `rotate` aliases: `rot`
- `sharpen` aliases: `sh`
- `strip_color_profile` aliases: `scp`
- `strip_metadata` aliases: `sm`
- `width` aliases: `w`
- `zoom` aliases: `z`

Accepted worker values:

- `gravity`: `no`, `so`, `ea`, `we`, `noea`, `nowe`, `soea`, `sowe`, `ce`, plus `:sm` or pixel offsets like `ce:10:20`
- `resizing_type`: `fit`, `fill`, `fill-down`, `force`, `auto`
- `format`: `jpg`, `png`, `avif`, `gif`, `webp`
- `rotate`: `0`, `90`, `180`, `270`, `360`
- booleans: `true`, `false`, `t`, `f`, `1`, `0`

Examples:

```ts
image.url({ background: "#ffffff", width: 300, height: 200 });
image.url({ crop: "300:200:ce:0:0", format: "webp" });
image.url({ strip_metadata: true, strip_color_profile: true, quality: 82 });
image.url({ enlarge: false, resizing_type: "fit", width: 960, height: 960 });
image.url({ extend: "true:ce:0:0", background: "255:255:255" });
```

## Development

```bash
npm install
npm run generate
npm run ci
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
npm run generate
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
