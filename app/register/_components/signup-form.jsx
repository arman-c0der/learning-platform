
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
import { useRouter } from "next/navigation";

export function SignupForm({ role }) {
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const password = formData.get("password");

      const userRole =
        role === "student" || role === "instructor"
          ? role
          : "student";

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userRole,
        }),
      });

      console.log(response.url);
      console.log(response.status);
      console.log(await response.text());

      if (response.ok) {
        console.log("User has been created");
        router.push("/login");
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-sm border-purple-500/20 bg-zinc-950 text-white shadow-2xl shadow-purple-950/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          Sign Up
        </CardTitle>

        <CardDescription className="text-zinc-400">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="first-name"
                  className="text-zinc-200"
                >
                  First name
                </Label>

                <Input
                  id="first-name"
                  name="first-name"
                  placeholder="Max"
                  required
                  className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="last-name"
                  className="text-zinc-200"
                >
                  Last name
                </Label>

                <Input
                  id="last-name"
                  name="last-name"
                  placeholder="Robinson"
                  required
                  className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-zinc-200"
              >
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
              <Label
                htmlFor="password"
                className="text-zinc-200"
              >
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                required
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
              />
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-zinc-200"
              >
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/30"
              />
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-900/30"
            >
              Create an account
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-5 text-center text-sm text-zinc-400">
          Already have an account?{" "}

          <Link
            href="/login"
            className="font-medium text-purple-400 underline-offset-4 transition-colors hover:text-purple-300 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

