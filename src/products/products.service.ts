import { uuid } from 'uuidv4';

import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interface/products.interface';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
  private static intance: ProductsService;
  private products: Product[];
  private newProduct: Product = {
    id: uuid(),
    name: '',
    description: '',
    price: 0,
  };

  constructor() {
    if (!ProductsService.intance) {
      ProductsService.intance = this;
      this.products = [];
    }
    return ProductsService.intance;
  }
  onApplicationBootstrap() {
    this.generateProducts();
  }

  private generateProducts(): void {
    for (let i = 0; i < 10; i++) {
      const product: Product = {
        id: uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
      };
      this.products.push(product);
    }
  }
  create(createProductDto: CreateProductDto) {
    const modifiedProduct = { ...this.newProduct, ...createProductDto };
    this.products.push(modifiedProduct);
    return modifiedProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product =
      this.products.filter((item) => item.id === id).length === 0
        ? null
        : this.products.filter((item) => item.id == id)[0];
    if (!product) {
      throw new NotFoundException('Product not Exist');
    }
    return product;
  }

  update(id: string, updateProductDto: any) {
    this.products = this.products.map((item) => {
      if (item.id === id) {
        return { ...item, ...updateProductDto };
      } else {
        return item;
      }
    });
    const product = this.products.filter((item) => item.id === id);
    const result = product.length === 0 ? null : product[0];
    if (!result) {
      throw new NotFoundException('Product not Exist');
    }
    return result;
  }

  remove(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not Exist');
    }
    const productClear = this.products.filter((item) => item.id === id)[0];
    this.products.splice(index, 1);
    return productClear;
  }
}
