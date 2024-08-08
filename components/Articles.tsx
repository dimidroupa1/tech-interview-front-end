"use client";

import React from "react";
import ArticlePreview from "./ArticlePreview";
import { useGetAllArticlesQuery } from "@/redux/features/articles/articleApi";
import Loading from "./Loading";

type Props = {};

const Articles = (props: Props) => {
  const { isLoading, data, error } = useGetAllArticlesQuery({}, { refetchOnMountOrArgChange: true });

  return (
    <div className="w-full flex flex-col gap-y-4">
      {isLoading ? (
        <Loading />
      ) : (
        data.articles.map((article: any) => (
          <ArticlePreview key={article._id} data={article} />
        ))
      )}
    </div>
  );
};

export default Articles;
