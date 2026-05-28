import { IRegisterProps, ILoginProps } from "@/types/propTypes";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw new Error(parsedResponse.message || "Registration failed");
    }

    alert("Usuário registrado com sucesso");

    return parsedResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
     alert(error.message || "Something went wrong");
    }
    throw new Error("Unknown error occurred");
  }
}

// export async function login(userData: ILoginProps) {
//   try {
//     const response = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     const parsedResponse = await response.json();

//     if (!response.ok) {
//       throw new Error(parsedResponse.message || "Login failed");
//     }

//     alert("Sesión iniciada con éxito");

//     return parsedResponse;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       alert(error.message);
//       throw error; // ✅ rethrow original error (important)
//     }

//     throw new Error("Unknown error occurred");
//   }
// }


export async function login(userData: ILoginProps) {
  try {
    const response = await axios.post(
      `${API_URL}/users/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Sesión iniciada con éxito");

    return response.data;
  } catch (error: unknown) {
    // ✅ Safe type check
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Login failed";

      alert(message);
      throw new Error(message);
    }

    if (error instanceof Error) {
      alert(error.message);
      throw error;
    }

    throw new Error("Unknown error occurred");
  }
}