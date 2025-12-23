"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/app/services/product.service";
import { Button } from "@/components/ui/button";
import { ProductActionModal } from "./ProductActionModal";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type ActionType = "buy" | "gift";

export default function ProductCard(product: Product) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<ActionType>("buy");
  const { data: session } = useSession();
  const router = useRouter();

  const openModal = (type: ActionType) => {
    setAction(type);
    setOpen(true);
  };

  return (
    <>
      <div className="group rounded-lg bg-card p-4 shadow-sm hover:shadow-md transition border border-border">
        <div className="overflow-hidden rounded-md">
          <Image
            src={product.thumbnail}
            width={500}
            height={500}
            alt={product.title}
            className="aspect-square w-full object-cover group-hover:scale-105 transition"
          />
        </div>

        <div className="mt-3">
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <p className="text-xs text-muted-foreground">{product.description}</p>

          <p className="mt-2 text-sm font-bold text-primary">
            ${product.price}
          </p>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <Button className="w-1/2" onClick={() => {
              if (!!session?.user) {
                  openModal("buy")
                } else {
                  router.replace("/login");
                }
            }}>
              Buy
            </Button>

            <Button
              variant="secondary"
              className="w-1/2"
              onClick={() => {
                if (!!session?.user) {
                  openModal("gift");
                } else {
                  router.replace("/login");
                }
              }}
            >
              Send Gift
            </Button>
          </div>
        </div>
      </div>

      
      <ProductActionModal
        open={open}
        onOpenChange={setOpen}
        action={action}
        product={product}
      />
    </>
  );
}
