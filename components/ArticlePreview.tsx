import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  data: any;
};

const ArticlePreview = ({ data }: Props) => {
  return (
    <Link
      href={`/article/${data._id}`}
      className="w-full h-[250px] border p-5 rounded-md hover:border-2 hover:shadow-md transition-all cursor-pointer flex items-start gap-4"
    >
      <Image
        src={data.image.url}
        alt="image"
        unoptimized
        width={200}
        height={200}
        className="h-full object-cover aspect-square rounded-md"
      />

      <div className="">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <h3 className="text-lg font-semibold">{data.subArticle[0].title}</h3>
        <p className="line-clamp-6">{data.subArticle[0].text}</p>
      </div>
    </Link>
  );
};

export default ArticlePreview;
