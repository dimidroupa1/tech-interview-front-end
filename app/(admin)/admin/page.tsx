import Articles from "@/components/Articles";
import AdminProtected from "@/hooks/adminProtected";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Protected from "@/hooks/useProtected";

const DynamicArticles = dynamic(() => import("@/components/Articles"), {
  ssr: false,
});

const DynamicLoading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <Suspense fallback={<DynamicLoading />}>
      <Protected>
        <AdminProtected>
          <div className="py-4 px-3 flex-[0.8]">
            <DynamicArticles />
          </div>
        </AdminProtected>
      </Protected>
    </Suspense>
  );
};

export default AdminPage;
