"use client";

import React, { useState } from "react";
import { Context } from "./context";

type Props = {
  children: React.ReactNode;
};

const LocalProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>("");

  const payload = {
    search,
    setSearch,
  };
  return <Context.Provider value={payload}>{children}</Context.Provider>;
};

export default LocalProvider;
