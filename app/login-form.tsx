"use client";

import { useState } from "react";
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
        setIsSuccess(true);
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

  const handleSignOut = () => {
    setIsSuccess(false);
    setGeneralError(null);
    reset();
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Welcome!</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You have successfully signed in.
          </p>
          <Button
            variant="outline"
            className="mt-4 h-10 px-4"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    );
  }

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
