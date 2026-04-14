import type { ApiResponse } from "../../generated/src/runtime.ts";

import { parsePaginationHeaders } from "./headers.ts";
import type { PaginatedResult } from "./types.ts";

export async function toPaginatedResult<T>(
  response: ApiResponse<T[]>
): Promise<PaginatedResult<T>> {
  return {
    data: await response.value(),
    pagination: parsePaginationHeaders(response.raw.headers)
  };
}
