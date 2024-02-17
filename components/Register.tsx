"use client";

import { registerUser } from "@/app/actions";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleRegister(formData: FormData) {
    const errorMessage = await registerUser(formData);
    if (!errorMessage) return;
    setErrorMessage(errorMessage);
  }

  return (
    <section className="flex flex-col items-center">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleRegister} className="flex flex-col items-center">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="w-64 px-4 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              className="w-64 px-4 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              required
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              className="w-64 px-4 py-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button>Sign up</Button>
          <Link href="/">
            <Button variant="secondary">Log in</Button>
          </Link>
        </CardFooter>
      </Card>
      <h1 className="text-red-500 mt-1">{errorMessage}</h1>
    </section>
  );
}
