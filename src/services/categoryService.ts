import { prisma } from "../database/prisma";
import { CategoryCreate } from "../interfaces";
import { CategoryReturn } from "../interfaces/category.interface";
import { categoryReturnSchema } from "../schemas/category.schema";

export class CategoryService {
  public create = async (payload: CategoryCreate): Promise<CategoryReturn> => {
    const newCategory = await prisma.category.create({ data: payload });
    return categoryReturnSchema.parse(newCategory);
  };

  public delete = async (id: string): Promise<void> => {
    await prisma.category.delete({
      where: { id: Number(id) },
    });
  };
}
