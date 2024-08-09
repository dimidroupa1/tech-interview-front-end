"use client"

import { redirect } from "next/navigation";
import UserAuth from "./userAuth";

type Props = {
  children: React.ReactNode;
};

export default function Protected({ children }: Props) {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect("/");
}
