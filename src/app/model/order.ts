import { OrderProduct } from './orderProduct';
import { Address } from 'cluster';
import { Product } from './product';
import { User } from './user';
export interface Order {
    orderProducts: OrderProduct[];
    forUser: User;
    address: Address;
    date: Date;
    totalPrice: number;
}