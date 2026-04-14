import type { PaginationMetadata } from "./types.ts";

const HEADER_NAMES = {
  totalCount: "x-total-count",
  page: "x-page",
  limit: "x-limit",
  prevPage: "x-prev-page",
  nextPage: "x-next-page"
} as const;

export function parsePaginationHeaders(
  headers: Headers | Record<string, string | null | undefined>
): PaginationMetadata {
  return {
    totalCount: readHeaderNumber(headers, HEADER_NAMES.totalCount),
    page: readHeaderNumber(headers, HEADER_NAMES.page),
    limit: readHeaderNumber(headers, HEADER_NAMES.limit),
    prevPage: readNullableHeaderNumber(headers, HEADER_NAMES.prevPage),
    nextPage: readNullableHeaderNumber(headers, HEADER_NAMES.nextPage)
  };
}

function readHeaderNumber(
  headers: Headers | Record<string, string | null | undefined>,
  name: string
): number | undefined {
  const value = readHeader(headers, name);
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readNullableHeaderNumber(
  headers: Headers | Record<string, string | null | undefined>,
  name: string
): number | null | undefined {
  const value = readHeader(headers, name);
  if (value == null) {
    return undefined;
  }

  if (value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function readHeader(
  headers: Headers | Record<string, string | null | undefined>,
  name: string
): string | null | undefined {
  if (headers instanceof Headers) {
    return headers.get(name);
  }

  const direct = headers[name];
  if (direct !== undefined) {
    return direct;
  }

  return headers[name.toLowerCase()];
}
