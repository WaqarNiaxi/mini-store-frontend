"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/zod-schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    const res = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      toast.error(res?.error?.message);
      console.error(res);
      return;
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("email")} placeholder="Email" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        type="password"
        {...register("password")}
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </form>
  );
};
