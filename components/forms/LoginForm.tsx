// src/components/forms/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/zod-schemas/authSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/store/userStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/services/authService";
import { Loader } from "../common/loader";

 export const LoginForm = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // React Query mutation
  const {mutate,isPending} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user, data.token);
      console.log(data)
      router.push("/");
    },
  });

  const onSubmit = (formData: {
    email: string;
    password: string;
}) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("email")} placeholder="Email" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <div className="flex justify-between items-center text-sm">
        <a href="/auth/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </a>
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? <Loader/> : "Login"}
      </Button>
    </form>
  );
};

