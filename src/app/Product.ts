export interface Product {    
    $key?:string;
    name?:string;
    country?:string;
    price?:number;
    quantity?:number;
    desiredQuantity?:number;
    photo?:HTMLImageElement;
}