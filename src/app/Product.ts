export interface Product {    
    $key?:string;
    name?:string;
    country?:string;
    price?:number;
    quantity?:number;
    photo?:HTMLImageElement;
    zoomedPhoto?:HTMLImageElement;
}