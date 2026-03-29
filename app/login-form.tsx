"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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

interface LoginFormValues {
  username: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const clearGeneralError = () => {
    if (generalError) {
      setGeneralError(null);
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setGeneralError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username.trim(),
          password: data.password.trim(),
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        return;
      } else if (response.status === 401) {
        setGeneralError(
          "Invalid username or password. Please try again."
        );
      } else {
        setGeneralError("Something went wrong. Please try again later.");
      }
    } catch {
      setGeneralError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = () => {
    // Focus the first invalid field
    if (errors.username) {
      setFocus("username");
    } else if (errors.password) {
      setFocus("password");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Sign in
        </CardTitle>
        <CardDescription>
          Enter your credentials to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          className="space-y-4"
        >
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              aria-invalid={!!errors.username}
              className="h-10"
              {...register("username", {
                required: "Username is required",
                validate: (value) =>
                  value.trim().length > 0 || "Username is required",
                onChange: clearGeneralError,
              })}
            />
            {errors.username && (
              <p className="text-xs text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              className="h-10"
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.trim().length > 0 || "Password is required",
                onChange: clearGeneralError,
              })}
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* General Error Banner */}
          {generalError && (
            <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2">
              <p className="text-sm text-destructive">{generalError}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-10 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="opacity-70">Signing in...</span>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
