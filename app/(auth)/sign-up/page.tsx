"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useRegisterMutation,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";

type Props = {};

const SignUpPage = (props: Props) => {
  const [register, { isError, data, error, isSuccess }] = useRegisterMutation();
  const [socialAuth, { isSuccess: isSuccessSocial, error: errorSocial }] =
    useSocialAuthMutation();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { data: dataSocial } = useSession();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfull!";
      toast.success(message);
      redirect("/verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (dataSocial) {
      socialAuth({
        email: dataSocial?.user?.email,
        name: dataSocial?.user?.name,
        avatar: dataSocial?.user?.image,
      });

      toast.success("Registration successfull!");
      redirect("/");
    }
  }, []);

  const handleClick = async () => {
    if (!name && !email && !password) return;

    const data = {
      name,
      email,
      password,
    };

    await register(data);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col justify-between items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold">Welcome</h1>
        </div>

        <div className="space-y-4 w-full">
          <div className="w-full space-y-1">
            <label className="text-sm">Name</label>
            <Input
              placeholder="Name"
              type="text"
              className={`${cn("w-full")}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full space-y-1">
            <label className="text-sm">Email</label>
            <Input
              placeholder="Email"
              type="email"
              className={`${cn("w-full")}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full space-y-1">
            <label className="text-sm">Password</label>
            <Input
              placeholder="Password"
              type="password"
              className={`${cn("w-full")}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Button className={`${cn("w-full")}`} onClick={handleClick}>
            Sign up
          </Button>
          <Button
            className={`${cn("w-full")} flex items-center gap-2`}
            variant={"outline"}
            onClick={() => signIn("google")}
          >
            <FcGoogle size={30} />
            Sign up with Google
          </Button>
          <h5 className="group text-center text-[14px]">
            Have any account?{" "}
            <Link
              className="text-[#2190ff] pl-1 cursor-pointer group-hover:underline"
              href="/login"
            >
              Login
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
