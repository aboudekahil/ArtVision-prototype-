import { FormEvent } from "react";
import { authenticate } from "../services/userService";
import Requests from "../http-common";
import LocalStorageHandler from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { Button, Input, Label, TextField } from "react-aria-components";
import ArtLink from "../components/ArtLink";

const SignUpPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const response = await authenticate({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    Requests.defaults.headers.common["Authorization"] = response.token;

    LocalStorageHandler.setItem("curru", response);

    navigate("/");
  };
  return (
    <div className="flex h-full w-full justify-center items-center">
      <form
        className="bg-Porple w-fit p-5 rounded flex flex-col gap-5"
        onSubmit={onSubmit}
      >
        <div className="flex items-center">
          <ArtLink aria-label="Go Home" to={"/"}>
            <figure>
              <img
                alt="ArtVision Logo"
                aria-label="ArtVision Logo"
                className="w-40 h-40"
                src="/Logo.svg"
              />
            </figure>
          </ArtLink>
          <h1 className="font-Inter font-bold text-5xl">Art Vision</h1>
        </div>
        <TextField className="flex flex-col" type="email" isRequired={true}>
          <Label className="font-Inter font-semibold">Email</Label>
          <Input className="rounded p-2 bg-ArtBlack" required />
        </TextField>
        <TextField className="flex flex-col" type="password" isRequired>
          <Label className="font-Inter font-semibold">Password</Label>
          <Input className="rounded p-2 bg-ArtBlack" required />
        </TextField>

        <Button
          aria-label="sign up"
          className="font-Inter font-semibold bg-ArtBlack p-2 rounded"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
