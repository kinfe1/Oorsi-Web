import { CartProduct } from './cartProduct';
export class User {

    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    cartProducts: CartProduct[] = [];

    numberOfFollowed: number;
    numberOfFollowers: number;

    followed: boolean = false;

    profilePictureName: string;


    constructor(obj) {
        if (undefined != obj) {
            for (var prop in obj) this[prop] = obj[prop];
        }
    }



    addCartProduct(cartProduct: CartProduct) {
        this.cartProducts.push(cartProduct);
    }

    totalPrice(): number {
        let sum: number = 0;
        for (let cartProduct of this.cartProducts) {
            sum += (cartProduct.product.salePrice * cartProduct.quantity);
        }
        return sum;
    }

}