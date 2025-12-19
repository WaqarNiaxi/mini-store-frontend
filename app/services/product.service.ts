import {api} from "./api"

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get(`/product`);
  console.log(res.data)
  if (res.status!=200) {
    throw new Error("Failed to fetch products");
  }

  return res.data; // extract array
}
