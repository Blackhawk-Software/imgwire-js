# imgwire-js

`@imgwire/js` is the browser-first JavaScript/TypeScript SDK for the imgwire API.

The package is built from the imgwire OpenAPI contract through a deterministic pipeline:

1. acquire the raw OpenAPI document
2. shape it with `@imgwire/codegen-core`
3. generate a disposable base client with OpenAPI Generator
4. layer in handwritten browser-friendly SDK code

## Installation

```bash
npm install @imgwire/js
```

## Usage

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
```

## Local Development

```bash
npm install
npm run generate
npm run ci
```

Set `OPENAPI_SOURCE` to override the spec source. By default:

- local/dev uses `http://localhost:8000/openapi.json`
- release-oriented generation can use `https://api.imgwire.dev/openapi.json` by setting `OPENAPI_RELEASE=true`

## Generation

```bash
npm run generate
```

This writes:

- `openapi/raw.openapi.json`
- `openapi/sdk.openapi.json`
- `generated/`
- `CODEGEN_VERSION`

## Publishing

Release workflow scaffolding is present, but publishing details are still early-access and subject to change.
