"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useEditProfileMutation,
  useUpdatedAvatarMutation,
  useUpdatePasswordMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserIcon from "@public/Avatar.jpeg";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [name, setName] = useState<string>(user && user.name);
  const [email, setEmail] = useState<string>(user && user.email);
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [updateAvatar, { isSuccess, error }] = useUpdatedAvatarMutation();
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [
    editProfile,
    { isSuccess: isSuccessEditProfile, error: errorEditProfile },
  ] = useEditProfileMutation();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [
    updatePassword,
    { isSuccess: isSuccessPassword, error: errorPassword },
  ] = useUpdatePasswordMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      // Ensure that the file has been completely read
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string | null;

        if (avatar) {
          console.log(1);
          updateAvatar(avatar);
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

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (!oldPassword && !newPassword && !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    await updatePassword({ oldPassword, newPassword });
  };

  useEffect(() => {
    if (isSuccess || isSuccessEditProfile) {
      setLoadUser(true);
    }
    if (error || errorEditProfile) {
      console.log(error);
    }
    if (isSuccess || isSuccessEditProfile) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, isSuccessEditProfile, errorEditProfile]);

  useEffect(() => {
    if (isSuccessPassword) {
      toast.success("Password changed successfully");
    }
    if (errorPassword) {
      if ("data" in errorPassword) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    if (name || email) {
      console.log("Updating");
      await editProfile({
        name,
        email,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="w-full max-w-[500px] flex flex-col  justify-center gap-6">
        <div className="relative w-fit h-fit mx-auto cursor-pointer">
          <Image
            src={user?.avatar?.url || UserIcon}
            alt="avatar"
            className="w-full max-w-[250px] rounded-full h-full max-h-[250px] mx-auto"
            unoptimized
            width={250}
            height={250}
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-gray-50 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>

        <div className="w-full space-y-1">
          <label className="text-sm">Name</label>
          <Input
            placeholder="Name"
            type="text"
            className={`${cn("w-full")}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full space-y-1">
          <label className="text-sm">Email</label>
          <Input
            placeholder="Email"
            type="email"
            className={`${cn("w-full")}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button className="w-fit" onClick={handleUpdateProfile}>
          Save
        </Button>

        <div className="w-full space-y-1">
          <label className="text-sm">Old password</label>
          <Input
            placeholder="Old password"
            type="text"
            className={`${cn("w-full")}`}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="w-full space-y-1">
          <label className="text-sm">New password</label>
          <Input
            placeholder="New password"
            type="text"
            className={`${cn("w-full")}`}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="w-full space-y-1">
          <label className="text-sm"> Enter your confirm password</label>
          <Input
            placeholder=" Enter your confirm password"
            type="text"
            className={`${cn("w-full")}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button className="w-fit" onClick={passwordChangeHandler}>
          Change password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
