import React, { FormEventHandler, useContext, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import {
  Button,
  Input,
  Label,
  TextArea,
  TextField,
} from "react-aria-components";
import Header from "../components/Header.tsx";
import Requests from "../http-common.ts";
import { toast, Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import ArtImage from "../components/ArtImage.tsx";

const ProfilePage: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setFile] = useState<File | string>(
    user?.user.profile_image || "pfpimages/defaultImage.png",
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    data.append("avatar", selectedFile);
    let response = Requests.post("changeProfile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      await toast.promise(response, {
        loading: "Loading...",
        success: (res) => {
          setUser({
            token: user!.token,
            user: {
              email: user!.user.email,
              profile_image: res.data.profile_image || user!.user.profile_image,
              bio: res.data.bio,
              name: res.data.name,
              display_name: res.data.username,
            },
          });
          return "Success!";
        },
        error: (error: AxiosError) => {
          return (error.response?.data as string) || "Error";
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <Header />
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="font-Inter text-center ml-1 text-4xl font-bold">
          Your profile
        </h1>
        <div className="p-5 rounded">
          <form className="flex gap-20" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 md:min-w-[20rem]">
              <TextField className="flex flex-col" isDisabled={true}>
                <Label className="font-Inter text-xl font-semibold">
                  Email
                </Label>
                <Input
                  className="bg-gray-800 p-2 text-gray-700 font-Inter rounded w-full"
                  name="email"
                  value={user!.user.email}
                />
              </TextField>
              <TextField className="flex flex-col">
                <Label className="font-Inter text-xl font-semibold">Name</Label>
                <Input
                  name="name"
                  defaultValue={user!.user.name || ""}
                  className="bg-Porple p-2 font-Inter rounded w-full"
                />
              </TextField>
              <TextField className="flex flex-col">
                <Label className="font-Inter text-xl font-semibold">
                  Username
                </Label>
                <Input
                  name="username"
                  defaultValue={user!.user.display_name || ""}
                  className="bg-Porple p-2 font-Inter rounded w-full"
                />
              </TextField>
              <TextField className="flex flex-col">
                <Label className="font-Inter text-xl font-semibold">Bio</Label>
                <TextArea
                  name="bio"
                  className="bg-Porple p-2 font-Inter rounded w-full h-20 min-h-[2rem] max-h-64"
                  defaultValue={user!.user.bio || ""}
                />
              </TextField>
              <Button
                className="rounded w-full p-2 font-Inter font-semibold bg-Porple"
                type={"submit"}
                value={"update profile"}
              >
                Update Profile
              </Button>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                name="avatar"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={() => {
                  if (!fileInputRef.current) return;

                  const currFiles = fileInputRef.current.files;
                  if (imgRef.current && currFiles) {
                    let file = currFiles.item(0);
                    if (!file || file.size > 1024 * 1024) {
                      fileInputRef.current.value = "";
                      return;
                    }

                    imgRef.current.src = URL.createObjectURL(file);
                    setFile(file);
                  }
                }}
              />
              <Button
                onPress={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                <ArtImage
                  ref={imgRef}
                  className="max-w-[400px]"
                  src={user?.user.profile_image || "pfpimages/defaultImage.png"}
                  alt={"profile image"}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ProfilePage;
