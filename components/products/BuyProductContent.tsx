import { Product } from "@/app/services/product.service";
import { Button } from "@/components/ui/button";

export function BuyProductContent({ product }: { product: Product }) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4 bg-muted">
        <p className="font-medium">{product.title}</p>
        <p className="text-sm text-muted-foreground">
          Description: {product.description}
        </p>
        <p className="mt-2 font-bold text-primary">
          Price: ${product.price}
        </p>
      </div>

      <Button className="w-full">
        Confirm Purchase
      </Button>
    </div>
  );
}
