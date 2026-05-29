"use client"

import { Suspense } from "react";
import SignupForm from "../components/SignupForm";
import Loading from "@/app/Loading";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <Suspense fallback={<Loading color="white" />}>
      <SignupForm />
      </Suspense>
    </div>
  );
}