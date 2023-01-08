import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), ProductModule, CategoryModule, SubCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }