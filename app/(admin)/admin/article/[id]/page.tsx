"use client";

import Article from "@/components/Article";
import Loading from "@/components/Loading";
import { useGetArticleByIdQuery } from "@/redux/features/articles/articleApi";
import React from "react";
import dynamic from "next/dynamic";

const DynamicArticle = dynamic(() => import("@/components/Article"), {
  ssr: false,
});

const DynamicLoading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

type Props = {};

const AdminArticlePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { isLoading, data, error } = useGetArticleByIdQuery(id);

  return (
    <div className="flex-1 md:flex-[0.8]">
      {isLoading ? <DynamicLoading /> : <DynamicArticle data={data.article} />}
    </div>
  );
};

export default AdminArticlePage;
