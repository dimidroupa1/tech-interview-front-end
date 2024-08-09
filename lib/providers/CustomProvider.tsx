"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import dynamic from "next/dynamic";

const DynamicLoading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

export const CustomProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <DynamicLoading /> : <>{children}</>}</>;
};
