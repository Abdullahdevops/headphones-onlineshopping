export interface Cart {
  $key: string;
  productKey?: string;
  productName?: string;
  productPrice?: number;
  productQuantity?: number;
  productPhoto?: HTMLImageElement;
  total?: number;
  userEmail?: string;
}
