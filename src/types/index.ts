export interface BasePaginationQuery {
  q?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_dir?: string;
}
