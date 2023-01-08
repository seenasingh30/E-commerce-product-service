import { Body, Controller, Get, Param, Post, Res, Query, Patch, Delete } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { query, Response } from 'express';
import { successResponse } from 'src/utils/response';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get(':id?')
    async getCategories(@Res({ passthrough: true }) res: Response, @Query() query, @Param('id') categoryId?: string) {
        try {
            let meta = {
                status: 200,
                message: 'Success'
            }

            if (categoryId) {
                let data = await this.categoryService.getCategory(categoryId);
                return successResponse(res, data, meta)
            }
            else {
                let limit = query.limit ? parseInt(query.limit) : 10;
                let page = query.page ? parseInt(query.page) : 1;
                let skip = (page - 1) * limit;
                let search = query.search ? query.search : '';
                meta['pagination'] = {
                    limit,
                    page,
                    skip
                }
                let data = await this.categoryService.getCategories(limit, skip, search);
                return successResponse(res, data, meta)
            }
        } catch (error) {
            let meta = {
                status: 500,
                message: error.message
            }
            return successResponse(res, {}, meta, 500)
        }
        console.log(query);
    }

    @Post()
    async createCategory(@Body() category: Category, @Res({ passthrough: true }) res: Response) {
        try {
            let meta = {
                status: 200,
                message: 'Success'
            }
            let data = await this.categoryService.createCategory(category);
            return successResponse(res, data, meta);
        }
        catch (error) {
            let meta = {
                status: 500,
                message: error.message
            }
            return successResponse(res, {}, meta, 500)
        }
    }

    @Patch(':id?')
    async updateCategory(@Param('id') categoryId: string, @Body() category: Category, @Res({ passthrough: true }) res: Response) {
        try {
            let meta = {
                status: 200,
                message: 'Success'
            }
            if (!categoryId) {
                meta = {
                    status: 500,
                    message: 'Category Id is required'
                }
                return successResponse(res, {}, meta, 500)
            }
            let data = await this.categoryService.updateCategory(categoryId, category);
            return successResponse(res, data, meta);
        }
        catch (error) {
            let meta = {
                status: 500,
                message: error.message
            }
            return successResponse(res, {}, meta, 500)
        }
    }

    @Delete(':id?')
    async deleteCategory(@Param('id') categoryId: string, @Res({ passthrough: true }) res: Response) {
        try {
            let meta = {
                status: 200,
                message: 'Success'
            }
            if (!categoryId) {
                meta = {
                    status: 500,
                    message: 'Category Id is required'
                }
                return successResponse(res, {}, meta, 500)
            }
            let data = await this.categoryService.deleteCategory(categoryId);
            return successResponse(res, data, meta);
        }
        catch (error) {
            let meta = {
                status: 500,
                message: error.message
            }
            return successResponse(res, {}, meta, 500)
        }
    }

}
