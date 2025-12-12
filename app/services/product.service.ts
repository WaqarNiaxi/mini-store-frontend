export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products; // extract array
}
