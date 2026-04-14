# SDK Spec Notes

`imgwire-js` follows the frontend SDK pipeline:

1. acquire raw OpenAPI
2. shape it with `@imgwire/codegen-core` for `target: "js"`
3. generate a disposable base client with OpenAPI Generator
4. apply deterministic post-processing
5. compose handwritten code from `src/`

Generation inputs and outputs are checked in so regeneration stays visible and reproducible.

## OpenAPI Source

- Local/dev default: `http://localhost:8000/openapi.json`
- Release/default remote source: `https://api.imgwire.dev/openapi.json`
- Override via `OPENAPI_SOURCE`

`scripts/generate.ts` writes both the raw and SDK-shaped specs under `openapi/`.
