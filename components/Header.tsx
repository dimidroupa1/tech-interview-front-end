import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
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
    <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-3 border-b-2 border-gray-100 sticky top-0 bg-white">
      <Link href="/" className="font-semibold text-2xl cursor-pointer">
        TechIn
      </Link>

      <div className="flex items-center gap-5">
        {!user ? (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant={"ghost"} asChild>
              <Link href="/profile">Profile</Link>
            </Button>
            {user.role == "admin" && (
              <Button variant={"ghost"} asChild>
                <Link href="/admin">Admin panel</Link>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
