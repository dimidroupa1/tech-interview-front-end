"use client"

import Profile from "@/components/Profile";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="max-w-7xl mx-auto py-5 px-3">
      <Profile user={user}/>
    </div>
  );
};

export default page;
