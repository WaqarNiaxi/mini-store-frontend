// src/components/forms/SignUpForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/app/zod-schemas/authSchema";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const res = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (res?.error) {
      toast.error(res.error.message);
      return;
    }

    toast.success("Account created successfully");
    router.push("/"); // or /login if email verification required
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("name")} placeholder="Full Name" />
      {errors.name && (
        <p className="text-red-500">{errors.name.message}</p>
      )}

      <Input {...register("email")} placeholder="Email" />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}

      <Input
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button type="submit" className="w-full mt-2">
        Sign Up
      </Button>
    </form>
  );
};
