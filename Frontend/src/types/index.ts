export interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  category: ICategory;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface IRegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  phone?: string;
  country?: string;
  city?: string;
  birthdate?: string;
}

export interface IOrder {
  id: string;
  date: Date;
  userId?: string;
  products: IProduct[];
}