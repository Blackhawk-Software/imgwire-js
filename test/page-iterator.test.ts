import { describe, expect, it, vi } from "vitest";

import { iteratePaginatedResults } from "../src/pagination/page-iterator.ts";

describe("iteratePaginatedResults", () => {
  it("follows nextPage until pagination ends", async () => {
    const loadPage = vi.fn(async ({ page = 1, limit = 2 }) => ({
      data: [`item-${page}`],
      pagination: {
        page,
        limit,
        nextPage: page < 3 ? page + 1 : null
      }
    }));

    const results: string[] = [];
    for await (const page of iteratePaginatedResults(
      { page: 1, limit: 2 },
      loadPage
    )) {
      results.push(...page.data);
    }

    expect(results).toEqual(["item-1", "item-2", "item-3"]);
    expect(loadPage).toHaveBeenNthCalledWith(1, { page: 1, limit: 2 });
    expect(loadPage).toHaveBeenNthCalledWith(2, { page: 2, limit: 2 });
    expect(loadPage).toHaveBeenNthCalledWith(3, { page: 3, limit: 2 });
  });
});
