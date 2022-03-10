import Category from "../../../domain/entities/category";

export class CategoryOutputDto {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
 
  static fromEntity(entity: Category): CategoryOutputDto {
    return entity.toJSON();
  }
}
