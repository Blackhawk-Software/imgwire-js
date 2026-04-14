# SDK Spec Notes

`imgwire-js` follows the frontend SDK pipeline:

1. acquire raw OpenAPI
2. shape it with `@imgwire/codegen-core` for `target: "js"`
3. generate a disposable base client with OpenAPI Generator
4. apply deterministic post-processing
5. compose handwritten code from `src/`

Generation inputs and outputs are checked in so regeneration stays visible and reproducible.

## Pagination Foundation

The current checked-in backend snapshot only exposes a JS-safe upload operation after
`@imgwire/codegen-core` filtering, so `imgwire-js` does not yet have a real generated
paginated list method to wrap.

The handwritten pagination layer in `src/pagination/` is already prepared for the next
spec expansion:

- `toPaginatedResult(...)` converts generated `ApiResponse<T[]>` values plus response
  headers into `{ data, pagination }`
- `iteratePaginatedResults(...)` drives `listPages()` style async iteration from a
  page loader

When list operations begin appearing in the JS-shaped spec, resource wrappers should
compose these helpers instead of modifying generated files.

## OpenAPI Source

- Local/dev default: `http://localhost:8000/openapi.json`
- Release/default remote source: `https://api.imgwire.dev/openapi.json`
- Override via `OPENAPI_SOURCE`

`scripts/generate.ts` writes both the raw and SDK-shaped specs under `openapi/`.
