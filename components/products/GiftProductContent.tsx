"use client";

import { useState } from "react";
import { Product } from "@/app/services/product.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUserListQuery } from "@/app/hooks/queries/user/useUserQuery";
import { useCreateCreditTransferMutation } from "@/app/hooks/queries/gift/useGiftQuery";
import { Loader } from "@/components/common/loader";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Props = {
  product: Product;
};

export function GiftProductContent({ product }: Props) {
  const router = useRouter();
  const [recipientId, setRecipientId] = useState<string>("");

  const { data: users, isLoading, isError } = useUserListQuery();

  const {
    mutate,
    isPending,
    isError: isMutationError,
    error: mutationError,
    isSuccess,
  } = useCreateCreditTransferMutation();


  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    router.push("/login");
    return null;
  }

  /* ------------------ Handlers ------------------ */
  const handleSendGift = () => {
    if (!recipientId) return;

    mutate({
      recipientId,
      productId: String(product.id),
    });
  };

  return (
    <div className="space-y-4">

      <div className="rounded-md border p-4 bg-muted">
        <p className="font-medium">{product.title}</p>
        <p className="text-sm text-muted-foreground">
          Description: {product.description}
        </p>
        <p className="font-bold text-primary">${product.price}</p>
      </div>


      <Select value={recipientId} onValueChange={setRecipientId}>
        <SelectTrigger>
          <SelectValue placeholder="Select user" />
        </SelectTrigger>

        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name ?? user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>


      {isMutationError && (
        <p className="text-sm text-red-500">
          {mutationError instanceof AxiosError
            ? mutationError.response?.data?.message ??
              "Failed to send gift"
            : "Failed to send gift"}
        </p>
      )}


      {isSuccess && (
        <p className="text-sm text-green-600">
          Gift sent successfully 🎁
        </p>
      )}


      <Button
        className="w-full"
        onClick={handleSendGift}
        disabled={isPending || !recipientId}
      >
        {isPending ? "Sending..." : "Send Gift"}
      </Button>
    </div>
  );
}
