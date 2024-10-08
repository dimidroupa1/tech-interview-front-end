"use client";

import { useGetArticleByIdQuery } from "@/redux/features/articles/articleApi";
import React from "react";
import dynamic from "next/dynamic";

const DynamicArticle = dynamic(() => import("@/components/Article"), {
  ssr: false,
});

const DynamicLoading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

const ArticlePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { isLoading, data, error } = useGetArticleByIdQuery(id);

  return (
    <div>
      {isLoading ? <DynamicLoading /> : <DynamicArticle data={data.article} />}
    </div>
  );
};

export default ArticlePage;
