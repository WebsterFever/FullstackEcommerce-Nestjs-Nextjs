const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrders(token: string, products: number[]) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        products,
      }),
    });

    const parsedResponse = await response.json();

    if (parsedResponse.message) {
      throw new Error(parsedResponse.message);
    }

    alert("Compra realizada con exito");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function getOrders(token: string) {
  try {
    const response = await fetch(`${API_URL}/users/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    const parsedResponse = await response.json();

    if (parsedResponse.message) {
      throw new Error(parsedResponse.message);
    }

    return parsedResponse;
   } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred");
  }
}