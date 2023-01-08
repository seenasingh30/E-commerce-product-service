import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

    getProducts() {
        return { message: 'Hello World' };
    }

}
