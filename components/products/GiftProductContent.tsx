"use client";

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
import { Loader } from "@/components/common/loader";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
};

export function GiftProductContent({ product }: Props) {
  const router = useRouter();
  const { data: users, isLoading, isError } = useUserListQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    router.push("/login");
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Product Info */}
      <div className="rounded-md border p-4 bg-muted">
        <p className="font-medium">{product.title}</p>
        <p className="text-sm text-muted-foreground">
          Description: {product.description}
        </p>
        <p className="font-bold text-primary">${product.price}</p>
      </div>

      {/* User Select */}
      <Select>
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

      {/* Action */}
      <Button className="w-full">
        Send Gift
      </Button>
    </div>
  );
}
