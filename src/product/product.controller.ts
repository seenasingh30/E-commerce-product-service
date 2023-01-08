import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    getProducts(){
        return this.productService.getProducts();
    }

}
