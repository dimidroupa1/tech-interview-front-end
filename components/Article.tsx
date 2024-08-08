import Image from "next/image";
import React from "react";

type Props = {
  data: any;
};

const Article = ({ data }: Props) => {
  return (
    <div className="max-w-7xl mx-auto py-5 px-3 space-y-10">
      <Image
        src={data.image.url}
        alt="image"
        unoptimized
        width={200}
        height={200}
        className="h-[300px] w-full object-cover aspect-square rounded-md"
      />

      <h1 className="text-3xl font-semibold">{data.title}</h1>

      {data.subArticle.map((subArticle: any) => (
        <div className="space-y-5" key={subArticle._id}>
          <h2 className="text-xl font-semibold">{subArticle.title}</h2>
          <p>{subArticle.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Article;
