import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { Category } from "src/category/category.model";

export class SubCategory {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: Category.name })
    category: string;

}
