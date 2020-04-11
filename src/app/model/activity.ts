import { User } from "./user";
import { Product } from './product';
import { OrderProduct } from './orderProduct';
import { Address } from './address';

export class Activity {
  id: number;
  user: User;
  forUser: User;
  created: Date;
  updated: Date;
  liked: boolean;
  activityType: string;


  numberOfLikes: number;
  numberOfComments: number;


  // COMMENT
  comment?: string;

  // CUSTOMER_ORDER
  orderProducts?: OrderProduct[];
  fromUser?: User;
  shipTo?: number;


  // charge?: Charge; // TODO: what is this
  shippingAddress?: Address;
  date?: Date;
  fulfilled?: boolean;

  // FOLLOW
  follower?: User;
  followed?: User;
  confirmed?: boolean;


  // WLP
  product?: Product;
  u?: User;
}
