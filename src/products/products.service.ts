import { Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { ImagesDto } from './dto/images-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImagesProducts } from './entities/images.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ImagesProducts)
    private imagesRepository: Repository<ImagesProducts>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { images, ...otro } = createProductDto;
      const newsImages = images.map((item) => {
        const newItem = new ImagesProducts();
        newItem.name = item.name;
        newItem.url = item.url;
        return newItem;
      });

      const newProduct = this.productRepository.create({
        ...otro,
        images: newsImages,
      });

      return await this.productRepository.save(newProduct);
    } catch (err) {
      const pgUniqueCiolationErrorCode = '23505';
      if (err.code === pgUniqueCiolationErrorCode) {
        throw new ConflictException('This product Exist');
      }
    }
  }

  findAll() {
    return this.productRepository.find({
      relations: { images: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        review: true,
        images: {
          url: true,
        },
      },
    });
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const oldProduct = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });
    return oldProduct;
  }

  remove(id: string) {
    return '';
  }
}
