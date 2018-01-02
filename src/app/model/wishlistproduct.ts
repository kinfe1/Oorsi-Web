import { Product } from './product';
import { User } from './user';
export interface WishListProduct {
    id: number;
    product: Product;
    user: User;
}