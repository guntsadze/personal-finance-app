export interface PaginatedResponse<T> {
  page: number;
  take: number;
  totalItems: number;
  data: T[];
}
