"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { registerSchema, type RegisterFormValues } from "@/validation/register-schema";
import { register as registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await registerUser({ name: values.name, email: values.email, password: values.password });
      // TODO: store token + redirect
    } catch {
      setError("root", { message: "Registration failed. Please try again." });
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
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

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-beige-100 p-200">
        <div className="lg:hidden w-full bg-grey-900 rounded-b-2xl py-300 flex items-center justify-center mb-300 -mt-200 -mx-200 px-200">
          <span className="text-white text-preset-2 font-bold">finance</span>
        </div>

        <div className="bg-white rounded-2xl p-400 w-full max-w-[560px]">
          <h1 className="text-preset-1 text-grey-900 mb-400">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-200">
            <Input
              variant="basic"
              label="Name"
              placeholder="Your full name"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              variant="basic"
              label="Email"
              placeholder="name@example.com"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInput
              label="Create Password"
              placeholder="At least 8 characters"
              helperText="at least 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* <PasswordInput
              label="Confirm Password"
              placeholder="Repeat your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            /> */}

            {errors.root && (
              <p className="text-preset-5 text-red">{errors.root.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="text-preset-4 text-grey-500 text-center mt-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-grey-900 font-bold underline-offset-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
