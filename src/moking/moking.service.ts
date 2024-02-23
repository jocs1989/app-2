import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ImagesInterface } from 'src/products/interface/images.interface';
import { ProductInterface } from 'src/products/interface/products.interface';
import { uuid } from 'uuidv4';

import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class MokingService {
  private static intance: MokingService;
  private products: ProductInterface[];
  private images: ImagesInterface[];
  newImages: ImagesInterface = {
    id: uuid(),
    name: '',
    url: '',
  };

  private newProduct: ProductInterface = {
    id: uuid(),
    name: '',
    description: '',
    price: 0,
    images: [],
    review: '',
  };

  constructor() {
    if (!MokingService.intance) {
      MokingService.intance = this;
      this.products = [];
    }
    return MokingService.intance;
  }
  onApplicationBootstrap() {
    this.generateProducts();
  }

  private generateProducts(): void {
    for (let i = 0; i < 10; i++) {
      this.newImages.name = faker.commerce.productName();
      this.newImages.url = faker.image.url();
      const product: ProductInterface = {
        id: uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()),
        images: [this.newImages],
        review: faker.lorem.sentence(),
      };
      this.products.push(product);
    }
  }
  create(createProductDto: CreateProductDto) {
    const { images, ...otro } = createProductDto;
    const newImages = images;

    const modifiedProduct = {
      ...this.newProduct,
      ...otro,
      images: [newImages],
    };
    //this.products.push(modifiedProduct);
    return ' createProductDto';
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
