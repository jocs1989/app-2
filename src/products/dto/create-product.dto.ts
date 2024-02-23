import { ImagesDto } from './images-products.dto';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly images: ImagesDto[];
  readonly review: string;
}
