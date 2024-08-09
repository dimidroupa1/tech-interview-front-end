"use client";

import React, { useEffect, useState } from "react";

import UserIcon from "@public/Avatar.jpeg";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCreateArticleMutation } from "@/redux/features/articles/articleApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type SubArticle = {
  title: string;
  text: string;
  _id: string;
};

type Data = {
  data: {
    createdAt: string;
    image: {
      public_id: string;
      url: string;
    };
    keywords: string[];
    title: string;
    updatedAt: string;
    _v: number;
    _id: string;
    subArticle: SubArticle[];
  };
};

type Props = {};

const CreateArticle = (props: Props) => {
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [subArticles, setSubArticles] = useState<SubArticle[]>([
    {
      title: "",
      text: "",
      _id: "",
    },
  ]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [createArticle, { isSuccess, error, data }] =
    useCreateArticleMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      // Ensure that the file has been completely read
      if (fileReader.readyState === 2) {
        const image = fileReader.result as string | null;

        if (image) {
          setImage(image);
        } else {
          console.error("Failed to read the avatar.");
        }
      }
    };

    // Read the file as a data URL
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubArticleChange = (
    index: number,
    key: keyof SubArticle,
    value: string
  ) => {
    const newSubArticles = [...subArticles];
    newSubArticles[index] = { ...newSubArticles[index], [key]: value };
    setSubArticles(newSubArticles);
  };

  const handleAddSubArticle = () => {
    setSubArticles([
      ...subArticles,
      { title: "", text: "", _id: Date.now().toString() },
    ]);
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleAddKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const handleDeleteKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const handleCreate = async () => {
    const cleanedSubArticles = subArticles.map(({ _id, ...rest }) => rest);

    const data = {
      title,
      image,
      subArticle: cleanedSubArticles,
      keywords,
    };

    await createArticle(data);
    toast.success("Article created successfully!");
  };

  return (
    <div className="mx-auto py-5 px-3 space-y-10">
      <div className="w-full relative">
        <Image
          src={image || UserIcon}
          alt="image"
          unoptimized
          width={200}
          height={200}
          className="h-[300px] w-full object-cover aspect-square rounded-md"
        />
        <input
          type="file"
          name=""
          id="image"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />

        <label
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer bg-white/50"
          htmlFor="image"
        >
          <AiOutlineCamera size={100} className="z-1 text-white" />
        </label>
      </div>

      <div className="space-y-1 w-full">
        <label className="text-sm">Title</label>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>

      <div className="w-full space-y-4">
        {subArticles.map((subArticle, index) => (
          <div key={subArticle._id} className="w-full space-y-1">
            <div className="w-full space-y-1">
              <label className="text-sm">Subtitle {index + 1}</label>
              <Input
                placeholder="Subtitle"
                type="text"
                className={`${cn("w-full")}`}
                value={subArticle.title}
                onChange={(e) =>
                  handleSubArticleChange(index, "title", e.target.value)
                }
              />
            </div>
            <div className="w-full space-y-1">
              <label className="text-sm">Text {index + 1}</label>
              <Textarea
                placeholder="Text"
                className={`${cn("w-full")}`}
                value={subArticle.text}
                onChange={(e) =>
                  handleSubArticleChange(index, "text", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAddSubArticle}>Add Sub-Article</Button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className="text-sm">Keywords</label>
        {keywords.map((keyword, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder={`Keyword ${index + 1}`}
              value={keyword}
              onChange={(e) => handleKeywordChange(index, e.target.value)}
              type="text"
              className="flex-grow"
            />
            <Button
              onClick={() => handleDeleteKeyword(index)}
              className="bg-red-400 hover:bg-red-300"
            >
              Delete
            </Button>
          </div>
        ))}
        <Button onClick={handleAddKeyword} className="w-fit">
          Add Keyword
        </Button>
      </div>

      <Button
        className={`${cn("bg-blue-400 hover:bg-blue-300")}`}
        onClick={handleCreate}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateArticle;
