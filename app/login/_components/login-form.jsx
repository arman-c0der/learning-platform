
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ceredntialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await ceredntialLogin(formData);

      if (response?.error) {
        toast.error("Login failed", {
          description: response.error,
        });
        return;
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm border-purple-500/20 bg-zinc-950 text-white shadow-2xl shadow-purple-950/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Login
        </CardTitle>

        <CardDescription className="text-zinc-400">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-zinc-200">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-zinc-200">
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="border-zinc-800 bg-zinc-900 pr-10 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-purple-400"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-900/30"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-zinc-400">
          Don&apos;t have an account?

          <p className="mt-1">
            Register as{" "}
            <Link
              href="/register/instructor"
              className="font-medium text-purple-400 underline-offset-4 transition-colors hover:text-purple-300 hover:underline"
            >
              Instructor
            </Link>

            {" "}or{" "}

            <Link
              href="/register/student"
              className="font-medium text-purple-400 underline-offset-4 transition-colors hover:text-purple-300 hover:underline"
            >
              Student
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

