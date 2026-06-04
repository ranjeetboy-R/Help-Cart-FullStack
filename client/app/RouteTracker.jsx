"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = sessionStorage.getItem("currentPath");

    if (currentPath && currentPath !== pathname) {
      sessionStorage.setItem("previousPath", currentPath);
    }

    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  return null;
}