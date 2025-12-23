"use client";


import ProductCard from "@/components/products/ProductCard";
import { useProductsQuery } from "@/app/hooks/queries/product/useProductsQuery";
import { Loader } from "@/components/common/loader";

export default function ProductsPage() {
  const { data, isLoading, isError } = useProductsQuery();

  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <p className="text-red-500 text-center py-10">Failed to load products.</p>;
  }

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Product List</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          
        </div>
      </div>
    </section>
  );
}






