/**
 * Login Page (SSR)
 *
 * Server-rendered login page
 */

import { Metadata } from "next";
import LoginForm from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | memi.az",
  description: "Login to your memi.az account",
  robots: {
    index: false, // Don't index login page
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}

