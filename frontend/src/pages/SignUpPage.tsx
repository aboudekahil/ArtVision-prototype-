import { FormEvent, useContext, useState } from "react";
import { createUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { Button, Input, Label, Text, TextField } from "react-aria-components";
import ArtLink from "../components/ArtLink";
import cm from "../utils/cm.ts";
import { AuthContext } from "../contexts/AuthContext.tsx";
import ArtImage from "../components/ImageComponents/ArtImage.tsx";
import { useMutation } from "@tanstack/react-query";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setUser } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return createUser({ email, password });
    },
    onSuccess: (data) => {
      setUser(data || null);
      navigate("/");
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    mutation.mutate({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  };

  return (
    <div className="flex h-full w-full justify-center items-center transition">
      <div className="bg-Porple w-fit p-5 rounded flex flex-col gap-5 aspect-square">
        <div className="flex items-center">
          <ArtLink aria-label="Go Home" to={"/"}>
            <ArtImage
              alt={"ArtVision Logo"}
              aria-label="ArtVision Logo"
              className="w-40 h-40 text-center rounded-none object-none"
              src={"/Logo.svg"}
              fromServer={false}
            />
          </ArtLink>
          <h1 className="font-Inter font-bold text-5xl">Art Vision</h1>
        </div>
        <form
          className="bg-Porple rounded flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          <TextField
            className="flex flex-col"
            name="email"
            type="email"
            isRequired={true}
            isInvalid={emailError}
          >
            <Label className="font-Inter text-xl font-semibold">Email</Label>
            <Input
              className={cm("rounded p-2 bg-ArtBlack", {
                "border-[#FFFF00] border-2": emailError,
              })}
              name="email"
              required
              onInvalid={(e) => {
                e.preventDefault();

                setEmailError(true);
              }}
              title="Your email"
            />
            {emailError && (
              <Text
                className="text-[#FFFF00] text-sm font-semibold"
                slot="errorMessage"
              >
                Please enter a valid email address.
              </Text>
            )}
          </TextField>
          <TextField
            className="flex flex-col"
            name="password"
            type="password"
            isRequired={true}
          >
            <Label className="font-Inter text-xl font-semibold">Password</Label>
            <Input
              className={cm("rounded p-2 bg-ArtBlack", {
                "border-[#FFFF00] border-2": passwordError,
              })}
              name="password"
              required
              pattern={
                "^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$"
              }
              onInvalid={(e) => {
                e.preventDefault();
                setPasswordError(true);
              }}
            />
            {passwordError && (
              <Text
                className="text-[#FFFF00] text-sm font-semibold"
                slot="errorMessage"
              >
                Please enter a valid password.
              </Text>
            )}
          </TextField>
          <Button
            aria-label="sign up"
            className={cm(
              "font-Inter font-semibold p-2 text-xl rounded bg-ArtBlack",
              {
                "animate-ping": mutation.isPending,
              },
            )}
            type={"submit"}
          >
            Sign Up
          </Button>
        </form>
        <span className="font-Inter bg-ArtBlack rounded p-3">
          A valid password has:
          <ul className="list-disc list-inside">
            <li>Minimum 8 characters</li>
            <li>At least 1 uppercase letter</li>
            <li>At least 1 lowercase letter</li>
            <li>At least 1 number</li>
            <li>At least 1 symbol</li>
          </ul>
        </span>

        <ArtLink
          className="font-Inter underline underline-offset-2 text-center"
          to="/signin"
          aria-label={"Already have an account? Sign in"}
        >
          Already have an account? Sign in
        </ArtLink>
      </div>
    </div>
  );
};

export default SignUpPage;
