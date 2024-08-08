import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

type Props = {};

const Header = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState<boolean>(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-3">
      <Link href="/" className="font-semibold text-2xl cursor-pointer">
        TechIn
      </Link>

      <div className="flex items-center gap-5">
        {!user && (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
