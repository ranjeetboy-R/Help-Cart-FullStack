"use client"

import { Suspense } from "react";
import SignupForm from "../components/SignupForm";
import Loading from "@/app/Loading";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-300 to-fuchsia-300 p-3">
      <Suspense fallback={<Loading color="white" />}>
      <SignupForm />
      </Suspense>
    </div>
  );
}