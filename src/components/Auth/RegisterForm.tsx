/**
 * Register Form Component
 *
 * Client component for registration form
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/app/actions/auth";
import toast from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  city: z.string().optional(),
  phone: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const result = await registerAction(data);
      if (result.success) {
        toast.success("Registration successful!");
        router.push("/");
        router.refresh();
      } else {
        toast.error(result.error || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register("name")}
        error={errors.name?.message}
        fullWidth
        required
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        fullWidth
        required
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        fullWidth
        required
      />

      <Input
        label="City (Optional)"
        {...register("city")}
        error={errors.city?.message}
        fullWidth
      />

      <Input
        label="Phone (Optional)"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
        fullWidth
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
      >
        Register
      </Button>

      <div className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-brand-accent hover:underline"
        >
          Login
        </a>
      </div>
    </form>
  );
}

