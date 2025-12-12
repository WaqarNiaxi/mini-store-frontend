"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts,Product } from "@/app/services/product.service";


export function useProductsQuery() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
