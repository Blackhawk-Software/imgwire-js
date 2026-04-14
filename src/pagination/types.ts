export type PaginationMetadata = {
  totalCount?: number;
  page?: number;
  limit?: number;
  prevPage?: number | null;
  nextPage?: number | null;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: PaginationMetadata;
};

export type PaginationRequest = {
  page?: number;
  limit?: number;
};
