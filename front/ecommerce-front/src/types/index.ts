interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  imgUrl: string;
  category: ICategory;
}