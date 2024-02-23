import { Images } from '../class/Images';

export class ProductInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  images: Images[];
  review: string;
}
