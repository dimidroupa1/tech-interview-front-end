import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="h-fit w-full md:flex-[0.2] md:py-4 md:px-3 md:h-full ">
      <div className="flex md:flex-col gap-4 md:items-start py-2 md:py-0 items-center fixed justify-center md:justify-start bg-white w-full md:w-fit">
        <Button variant={"ghost"} asChild>
          <Link href="/admin">Articles</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href="/admin/create-article">Create article</Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
