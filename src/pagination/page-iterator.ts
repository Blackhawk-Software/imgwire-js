import type {
  PaginatedResult,
  PaginationMetadata,
  PaginationRequest
} from "./types.ts";

export type PageLoader<T, TParams extends PaginationRequest> = (
  params: TParams
) => Promise<PaginatedResult<T>>;

export async function* iteratePaginatedResults<
  T,
  TParams extends PaginationRequest
>(
  initialParams: TParams,
  loadPage: PageLoader<T, TParams>
): AsyncGenerator<PaginatedResult<T>, void, void> {
  let nextParams: TParams | null = initialParams;

  while (nextParams) {
    const page = await loadPage(nextParams);
    yield page;
    nextParams = getNextParams(nextParams, page.pagination);
  }
}

function getNextParams<TParams extends PaginationRequest>(
  currentParams: TParams,
  pagination: PaginationMetadata
): TParams | null {
  if (pagination.nextPage == null) {
    return null;
  }

  return {
    ...currentParams,
    limit: pagination.limit ?? currentParams.limit,
    page: pagination.nextPage
  };
}
