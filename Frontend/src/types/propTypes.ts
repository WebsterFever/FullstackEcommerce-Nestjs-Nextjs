export interface ICardProps{
    name: string;
    image:string;
    price: number;
    description:string;
    stock: number;
}

export interface ILoginProps{
    email: string;
    password: string;
}



export interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}