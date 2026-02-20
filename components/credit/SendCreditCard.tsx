"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sendCreditSchema,
  SendCreditFormValues,
} from "@/app/zod-schemas/sendCreditSchema";

import { useUserListQuery } from "@/app/hooks/queries/user/useUserQuery";
import { useCreateCreditTransferMutation } from "@/app/hooks/queries/creditTransaction/useCreditQuery";
import { Loader } from "../common/loader";
import { AxiosError } from "axios";

export function SendCreditCard() {
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SendCreditFormValues>({
    resolver: zodResolver(sendCreditSchema),
    defaultValues: {
      userId: "",
      amount: "",
    },
  });


  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUserListQuery();

  const {
    mutate,
    isPending,
    isError: isMutationError,
    error: mutationError,
    isSuccess,
  } = useCreateCreditTransferMutation();


  if (isUsersLoading) {
    return <Loader />;
  }

  if (isUsersError) {
    return (
      <p className="text-red-500 text-center py-10">Failed to load users.</p>
    );
  }


  const onSubmit = (data: SendCreditFormValues) => {
    mutate(
      {
        recipientId: data.userId,
        amount: Number(data.amount),
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Send Credit</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="space-y-1">
            <Select
              value={watch("userId")}
              onValueChange={(value) =>
                setValue("userId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.userId && (
              <p className="text-sm text-destructive">
                {errors.userId.message}
              </p>
            )}
          </div>

  
          <div className="space-y-1">
            <Input
              type="number"
              placeholder="Amount"
              value={watch("amount")}
              onChange={(e) =>
                setValue("amount", e.target.value, {
                  shouldValidate: true,
                })
              }
            />

            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>


          {isMutationError && (
            <p className="text-sm text-red-500">
              {(() => {
                const err = mutationError as AxiosError<{ message: string }>;

                if (err.response?.status === 400) {
                  return err.response.data.message;
                }

                return "Failed to send credit";
              })()}
            </p>
          )}

         
          {isSuccess && (
            <p className="text-sm text-green-600">
              Credit sent successfully 🎉
            </p>
          )}

          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Send Credit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
