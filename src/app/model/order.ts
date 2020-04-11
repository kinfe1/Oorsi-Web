import { Address } from "./address";
import { OrderProduct } from "./orderProduct";
import { Product } from "./product";
import { User } from "./user";
export interface Order {
  id: number;
  orderProducts: OrderProduct[];
  forUser: User;
  address: Address;
  shippingAddress: Address;
  date: Date;
  totalPrice: number;
}
