"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginFormValues } from "@/validation/login-schema";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);
      // TODO: store token + redirect once auth store is wired
    } catch {
      setError("root", { message: "Invalid email or password." });
    }
  }

  return (
    /* Two-column desktop layout; single column on mobile/tablet */
    <div className="min-h-screen flex">
      {/* Left panel — Bonus illustration (desktop only) */}
      <div className="hidden lg:flex flex-col justify-between bg-grey-900 rounded-r-2xl p-400 w-[560px] shrink-0">
        <span className="text-white text-preset-2 font-bold">finance</span>
        <div className="flex flex-col gap-300">
          <div className="w-full aspect-square max-w-[360px] mx-auto rounded-2xl bg-grey-500/30 flex items-center justify-center">
            <span className="text-grey-300 text-preset-4">Illustration</span>
          </div>
          <div>
            <h2 className="text-preset-1 text-white mb-150">
              Keep track of your money and save for your future
            </h2>
            <p className="text-preset-4 text-grey-300">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
        <div />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-beige-100 p-200">
        {/* Mobile header */}
        <div className="lg:hidden w-full bg-grey-900 rounded-b-2xl py-300 flex items-center justify-center mb-300 -mt-200 -mx-200 px-200">
          <span className="text-white text-preset-2 font-bold">finance</span>
        </div>

        <div className="bg-white rounded-2xl p-400 w-full max-w-[560px]">
          <h1 className="text-preset-1 text-grey-900 mb-400">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-200">
            <Input
              variant="basic"
              label="Email"
              placeholder="name@example.com"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />

            {errors.root && (
              <p className="text-preset-5 text-red">{errors.root.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in…" : "Login"}
            </Button>
          </form>

          <p className="text-preset-4 text-grey-500 text-center mt-300">
            Need to create an account?{" "}
            <Link
              href="/register"
              className="text-grey-900 font-bold underline-offset-2 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
