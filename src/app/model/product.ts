export interface Product {

    productId?: number;
    retailer?: string;
    sku?: number;
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
    frequentlyPurchasedWith?: Product[]


}