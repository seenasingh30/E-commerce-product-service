import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategorySchema } from './category.model';

@Injectable()
export class CategoryRepository {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    async getCategories(limit: number, skip: number, search?: string) {

        if (search) {
            // or description
            return await this.categoryModel.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] }).limit(limit).skip(skip).exec();
        }
        return await this.categoryModel.find().limit(limit).skip(skip).exec();
    }

    async getCategory(categoryId: string) {
        return await this.categoryModel.findById({ _id: categoryId }).exec();
    }

    async createCategory(category: Category) {
        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }

    async updateCategory(categoryId: string, category: Category) {
        return await this.categoryModel.findByIdAndUpdate({
            _id: categoryId
        },
            category,
            {
                new: true
            }).exec();
    }

    async deleteCategory(categoryId: string) {
        return await this.categoryModel.findByIdAndDelete({
            _id: categoryId
        }).exec();
    }

}