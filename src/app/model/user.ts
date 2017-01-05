import { CartProduct } from './cartProduct';
export class User {

    userID: string;
    firstName: string;
    lastName: string;
    cartProducts: CartProduct[] = [];

    constructor(obj) {
        if (undefined != obj) {
            for (var prop in obj) this[prop] = obj[prop];
        }
    }



    addCartProduct(cartProduct: CartProduct) {
        this.cartProducts.push(cartProduct);
    }

}