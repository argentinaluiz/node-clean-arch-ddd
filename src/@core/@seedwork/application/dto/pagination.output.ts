export default interface PaginationOutput<T> {
  items?: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total?: number;
}
