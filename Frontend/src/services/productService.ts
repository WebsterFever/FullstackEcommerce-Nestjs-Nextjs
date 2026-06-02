import { IProduct } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProducts(): Promise<IProduct[]> {
  try {
    const response = await fetch(`${API_URL}/products`, {
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

export async function getProductByID(
  id: string,
): Promise<IProduct> {
  const response = await fetch(
    `${API_URL}/products/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      "El producto no fue encontrado",
    );
  }

  return response.json();
}