"use client";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  if (!user) {
    return <div className="absolute top-[50%] left-[50%]">Loadding</div>;
  }
  return <>{children}</>;
}
