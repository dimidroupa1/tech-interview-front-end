import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Context } from "@/lib/providers/context";

type Props = {};

const Header = (props: Props) => {
  const { search, setSearch } = useContext(Context)
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState<boolean>(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const handleSearch = (e: any) => {
    e.preventDefault();
    window.history.pushState({}, "", `?search=${search.toLowerCase()}`);
  };

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-3 border-b-2 border-gray-100 sticky top-0 bg-white z-10">
      <Link href="/" className="font-semibold text-2xl cursor-pointer">
        TechIn
      </Link>

      <form
        className="w-full hidden md:flex items-center max-w-[500px] relative"
        onSubmit={handleSearch}
      >
        <Input
          placeholder="Search"
          className="w-full"
          value={search}
          onChange={(e) => setSearch && setSearch(e.target.value)}
        />
        <Button
          variant="ghost"
          className="absolute right-1 z-[2]"
          type="submit"
        >
          <SearchIcon className="text-gray-400 w-5 h-5" />
        </Button>
      </form>

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
