import { TypeSelectedEnum } from "../enums/type-selected.enum";

export interface Product {
  id: number;
  title: string;
  price: any;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface ProductDialogDataInterface {
  product: Product;
  type: TypeSelectedEnum;
  categories: Array<ProductSelectValues>;
}

export interface ProductSelectValues {
  value: string;
  viewValue: string;
}
