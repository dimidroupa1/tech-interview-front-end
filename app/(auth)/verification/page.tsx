"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const VerificationPage = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully!");
      redirect("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const verificationHandler = async () => {
    await activation({
      activation_token: token,
      activation_code: value,
    });
  };

  return (
    <div className="h-screen w-full flex flex-col gap-5 items-center justify-center">
      <h1 className="text-4xl font-semibold">Verify your account</h1>
      <InputOTP
        maxLength={4}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} className={`${cn("w-20 h-20 text-xl")}`} />
          <InputOTPSlot index={1} className={`${cn("w-20 h-20 text-xl")}`} />
          <InputOTPSlot index={2} className={`${cn("w-20 h-20 text-xl")}`} />
          <InputOTPSlot index={3} className={`${cn("w-20 h-20 text-xl")}`} />
        </InputOTPGroup>
      </InputOTP>

      <Button onClick={verificationHandler}>Verify OTP</Button>
    </div>
  );
};

export default VerificationPage;
