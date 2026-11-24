import type { Product } from "../types/product";

const API_URL = "http://localhost:3000/products"

export const getProducts = async () => {
  const response = await fetch(API_URL);
  const data: Product[] = await response.json()
  return data
}

export const addProduct = async (product: Omit<Product, "id">) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })

  return await response.json()
}

export const deleteProduct = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
};

export const updateProduct = async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};
