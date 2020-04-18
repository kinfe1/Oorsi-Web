import { ProductImageURL } from "./product-image-url";

export interface Product {

    productId?: number;
    retailerId?: number;
    sku?: string;
    name?: string;
    regularPrice?: number;
    salePrice?: number;
    onSale?: boolean;
    manufacturer?: string;
    image?: string;
    largeFrontImage?: string;
    mediumImage?: string;
    thumbnailImage?: string;
    largeImage?: string;
    relatedProducts?: Product[],
    frequentlyPurchasedWith?: Product[],
    productImageURLs: ProductImageURL[];
    shortDescription: string;
    longDescription: string;

}