"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} from "@/redux/features/articles/articleApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type SubArticle = {
  title: string;
  text: string;
  _id: string;
};

type Props = {
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

const Article = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [title, setTitle] = useState<string>(data.title);
  const [subArticles, setSubArticles] = useState<SubArticle[]>(data.subArticle);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<string>(data.image.url);
  const [keywords, setKeywords] = useState<string[]>(data.keywords);
  const [
    updateArticle,
    { data: dataUpdate, error: errorUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateArticleMutation();
  const [
    deleteArticle,
    { isSuccess: isSuccessDelete, data: dataDelete, error: errorDelete },
  ] = useDeleteArticleMutation();

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

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      // Ensure that the file has been completely read
      if (fileReader.readyState === 2) {
        const image = fileReader.result as string | null;

        if (image) {
          setUpdateImage(image);
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

  const handleUpdate = async () => {
    const cleanedSubArticles = subArticles.map(({ _id, ...rest }) => rest);

    const updatedData = {
      ...data,
      title,
      subArticle: cleanedSubArticles,
      image: {
        public_id: data.image.public_id,
        url: updateImage || data.image.url,
      },
      keywords
    };
    await updateArticle(updatedData);
  };

  useEffect(() => {
    if (isSuccessUpdate) {
      const message = dataUpdate?.message || "Article updated successfully!";
      toast.success(message);
      setIsAdminMode(false);
      location.reload();
    }
    if (isSuccessDelete) {
      const message = dataDelete?.message || "Article deleted successfully!";
      toast.success(message);
      redirect("/admin");
    }
    if (errorUpdate) {
      if ("data" in errorUpdate) {
        const errorData = errorUpdate as any;
        toast.error(errorData.data.message || "Someting went wrong");
      }
    }
    if (errorDelete) {
      toast.error("Someting went wrong");
    }
  }, [isSuccessUpdate, isSuccessDelete, errorDelete, errorUpdate]);

  return (
    <div className="mx-auto py-5 px-3 space-y-10">
      <div className="w-full relative">
        <Image
          src={updateImage}
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

        {isAdminMode && (
          <label
            className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center cursor-pointer bg-white/50"
            htmlFor="image"
          >
            <AiOutlineCamera size={100} className="z-1 text-white" />
          </label>
        )}
      </div>

      {isAdminMode ? (
        <div className="space-y-1 w-full">
          <label className="text-sm">Title</label>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
      ) : (
        <h1 className="text-3xl font-semibold">{data.title}</h1>
      )}

      {isAdminMode ? (
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
      ) : (
        data.subArticle.map((subArticle: any) => (
          <div className="space-y-5" key={subArticle._id}>
            <h2 className="text-xl font-semibold">{subArticle.title}</h2>
            <p>{subArticle.text}</p>
          </div>
        ))
      )}

      {isAdminMode && (
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
      )}

      {user.role == "admin" && (
        <div className="flex gap-2">
          <Button onClick={() => setIsAdminMode(true)}>Edit</Button>
          <Button
            className={`${cn("bg-red-400 hover:bg-red-300")}`}
            onClick={() => deleteArticle(data._id)}
          >
            Delete
          </Button>

          {isAdminMode && (
            <Button
              className={`${cn("bg-blue-400 hover:bg-blue-300")}`}
              onClick={handleUpdate}
            >
              Save
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Article;
