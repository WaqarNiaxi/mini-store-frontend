import { useOrderCreateMutation } from "@/app/hooks/queries/order/useOrderQuery";
import { Product } from "@/app/services/product.service";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";

export function BuyProductContent({ product }: { product: Product }) {
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useOrderCreateMutation();

  const handleBuy = () => {
    mutate({
      productId: String(product.id),
      quantity: 1,
    });
  };

  return (
    <div className="space-y-4">
      {/* Product Info */}
      <div className="rounded-md border p-4 bg-muted">
        <p className="font-medium">{product.title}</p>
        <p className="text-sm text-muted-foreground">
          Description: {product.description}
        </p>
        <p className="mt-2 font-bold text-primary">
          Price: ${product.price}
        </p>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-500">
          {error instanceof AxiosError
            ? error.response?.data?.message ?? "Order failed"
            : "Order failed"}
        </p>
      )}

      {/* Success */}
      {isSuccess && (
        <p className="text-sm text-green-600">
          Order placed successfully 🎉
        </p>
      )}

      {/* Action Button */}
      <Button
        className="w-full"
        onClick={handleBuy}
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Confirm Purchase"}
      </Button>
    </div>
  );
}
