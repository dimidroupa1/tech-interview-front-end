"use client";

import Article from "@/components/Article";
import Loading from "@/components/Loading";
import { useGetArticleByIdQuery } from "@/redux/features/articles/articleApi";
import React from "react";

type Props = {};

const ArticlePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { isLoading, data, error } = useGetArticleByIdQuery(id);

  return <div>{isLoading ? <Loading /> : <Article data={data.article} />}</div>;
};

export default ArticlePage;
