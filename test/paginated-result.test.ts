import { describe, expect, it } from "vitest";

import type { ApiResponse } from "../generated/src/runtime.ts";
import { toPaginatedResult } from "../src/pagination/wrap.ts";

describe("toPaginatedResult", () => {
  it("maps array responses and pagination headers into the SDK result shape", async () => {
    const response: ApiResponse<string[]> = {
      raw: new Response(JSON.stringify(["a", "b"]), {
        headers: {
          "Content-Type": "application/json",
          "X-Total-Count": "7",
          "X-Page": "2",
          "X-Limit": "2",
          "X-Prev-Page": "1",
          "X-Next-Page": "3"
        },
        status: 200
      }),
      async value() {
        return ["a", "b"];
      }
    };

    await expect(toPaginatedResult(response)).resolves.toEqual({
      data: ["a", "b"],
      pagination: {
        totalCount: 7,
        page: 2,
        limit: 2,
        prevPage: 1,
        nextPage: 3
      }
    });
  });
});
