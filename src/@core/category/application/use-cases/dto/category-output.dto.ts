import Category from "../../../domain/entities/category";

export type CategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
}

export class CategoryOutputMapper{
  static fromEntity(entity: Category): CategoryOutput {
    return entity.toJSON();
  }
}
