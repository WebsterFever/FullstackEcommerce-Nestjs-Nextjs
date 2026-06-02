export interface ICardProps {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  description: string;
  stock: number;
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
  country: string;
  city: string;
  birthdate: string;
}