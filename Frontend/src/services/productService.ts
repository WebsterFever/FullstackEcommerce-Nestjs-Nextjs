import { IProduct } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const response = await fetch(` ${API_URL}/products`, {
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products: IProduct[] = await response.json();
    return products;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function getProductByID(id: string): Promise<IProduct> {
  try {
    const products = await getAllProducts();

    const productFiltered = products.find(
      (product) => product.id.toString() === id
    );

    if (!productFiltered) {
      throw new Error("El producto no fue encontrado");
    }

    return productFiltered;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
}