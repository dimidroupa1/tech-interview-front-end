"use client";

import React, { useContext, useEffect, useState } from "react";
import ArticlePreview from "./ArticlePreview";
import { useGetAllArticlesQuery } from "@/redux/features/articles/articleApi";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Context } from "@/lib/providers/context";

type Props = {};

const Articles = (props: Props) => {
  const { search } = useContext(Context);
  const [activePage, setActivePage] = useState<number>(1);
  const { isLoading, data, error } = useGetAllArticlesQuery(
    { page: activePage, search },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    window.history.pushState({}, "", `?page=${activePage}&search=${search}`);
  }, [activePage, search]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      {isLoading ? (
        <Loading />
      ) : (
        data.articles.map((article: any) => (
          <ArticlePreview key={article._id} data={article} />
        ))
      )}

      <div className="w-full flex items-center justify-center gap-2">
        {!isLoading &&
          Array.from({ length: data.totalPages }, (_, index) => (
            <Button
              key={index}
              variant={activePage !== index + 1 ? "outline" : "default"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Articles;
