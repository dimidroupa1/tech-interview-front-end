"use client";

import Protected from "@/hooks/useProtected";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const DynamicProfile = dynamic(() => import("@/components/Profile"), {
  ssr: false,
});

const DynamicLoading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

type Props = {};

const page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Suspense fallback={<DynamicLoading />}>
      <Protected>
        <div className="max-w-7xl mx-auto py-5 px-3">
          <DynamicProfile user={user} />
        </div>
      </Protected>
    </Suspense>
  );
};

export default page;
