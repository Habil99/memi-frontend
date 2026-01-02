/**
 * Register Page (SSR)
 *
 * Server-rendered registration page
 */

import { Metadata } from "next";
import RegisterForm from "@/components/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | memi.az",
  description: "Create a new account on memi.az",
  robots: {
    index: false, // Don't index registration page
    follow: false,
  },
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">
          Create Account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}

