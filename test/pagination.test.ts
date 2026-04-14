import { describe, expect, it } from "vitest";

import { parsePaginationHeaders } from "../src/pagination/headers.ts";

describe("parsePaginationHeaders", () => {
  it("parses known pagination response headers", () => {
    const headers = new Headers({
      "X-Total-Count": "120",
      "X-Page": "2",
      "X-Limit": "25",
      "X-Prev-Page": "1",
      "X-Next-Page": "3"
    });

    expect(parsePaginationHeaders(headers)).toEqual({
      totalCount: 120,
      page: 2,
      limit: 25,
      prevPage: 1,
      nextPage: 3
    });
  });
});
