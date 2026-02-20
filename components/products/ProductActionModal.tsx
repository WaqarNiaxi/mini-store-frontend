"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/app/services/product.service";
import { BuyProductContent } from "./BuyProductContent";
import { GiftProductContent } from "./GiftProductContent";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "buy" | "gift";
  product: Product;
};

export function ProductActionModal({
  open,
  onOpenChange,
  action,
  product,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {action === "buy" ? "Buy Product" : "Send Gift"}
          </DialogTitle>
        </DialogHeader>

        {action === "buy" ? (
          <BuyProductContent product={product} />
        ) : (
          <GiftProductContent product={product} />
        )}
      </DialogContent>
    </Dialog>
  );
}
