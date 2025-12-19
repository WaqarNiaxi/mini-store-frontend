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

type UserOption = {
  id: string;
  name: string;
  email: string;
};

const MOCK_USERS: UserOption[] = [
  { id: "1", name: "Ali", email: "ali@gmail.com" },
  { id: "2", name: "Ahmed", email: "ahmed@gmail.com" },
  { id: "3", name: "Ali", email: "ali@gmail.com" },
  { id: "4", name: "Ahmed", email: "ahmed@gmail.com" },
  { id: "5", name: "Ali", email: "ali@gmail.com" },
  { id: "6", name: "Ahmed", email: "ahmed@gmail.com" },
];

export function SendCreditCard() {
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SendCreditFormValues>({
    resolver: zodResolver(sendCreditSchema),
    defaultValues: {
      userId: "",
      amount: "",
    },
  });

  const onSubmit = (data: SendCreditFormValues) => {
    // 🔥 Replace with React Query mutation
    console.log("Send credit", data);
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Send Credit</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* User Select */}
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
                {MOCK_USERS.map((user) => (
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

          {/* Amount */}
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

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            Send Credit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
