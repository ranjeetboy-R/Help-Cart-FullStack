"use client"

import LoginForm from "../components/LoginForm";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-300 to-fuchsia-300 p-3">
      <LoginForm />
    </div>
  );
}