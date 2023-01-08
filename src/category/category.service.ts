import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';


@Injectable()
export class CategoryService {

    constructor(private readonly categorySchema: CategoryRepository) { }

    getCategories(limit: number, skip: number, search: string) {
        return this.categorySchema.getCategories(limit, skip, search);
    }

    getCategory(categoryId: string) {
        return this.categorySchema.getCategory(categoryId);
    }

    createCategory(category: Category) {
        return this.categorySchema.createCategory(category);
    }

    updateCategory(categoryId: string, category: Category) {
        return this.categorySchema.updateCategory(categoryId, category);
    }

    deleteCategory(categoryId: string) {
        return this.categorySchema.deleteCategory(categoryId);
    }
}
