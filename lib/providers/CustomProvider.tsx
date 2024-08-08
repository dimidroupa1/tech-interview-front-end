"use client";

import Loading from "@/components/Loading";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

export const CustomProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};
