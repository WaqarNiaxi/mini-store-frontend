"use client";

import Image from "next/image";
import { Product } from "@/app/services/product.service"

export default function ProductCard({ title, brand, price, thumbnail }: Product) {
  return (
    <div className="group rounded-lg bg-card p-4 shadow-sm hover:shadow-md transition border border-border">
      <div className="overflow-hidden rounded-md">
        <Image
          src={thumbnail}
          width={500}
          height={500}
          alt={title}
          className="aspect-square w-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="mt-3 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{brand}</p>
        </div>

        <p className="text-sm font-bold text-primary">${price}</p>
      </div>
    </div>
  );
}
