import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {};

const Loading = (props: Props) => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="w-16 h-16 animate-spin" />
    </div>
  );
};

export default Loading;
