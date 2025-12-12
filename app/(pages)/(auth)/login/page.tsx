// src/pages/auth/index.tsx
"use client";

import { useState } from "react";
import { LoginForm } from "@/components/forms/LoginForm";
import { SignUpForm } from "@/components/forms/SignUpForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            className={`flex-1 py-2 ${isLogin ? "border-b-2 border-primary font-semibold" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${!isLogin ? "border-b-2 border-primary font-semibold" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
