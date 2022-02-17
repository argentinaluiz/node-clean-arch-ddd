export default interface ListCategoriesInput {
  page?: number;
  per_page?: number;
  filter?: any;
  order?: { sort: string; dir: string };
}
