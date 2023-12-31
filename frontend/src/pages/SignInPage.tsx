import { FormEvent, useContext, useState } from "react";
import { authenticate } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { Button, Input, Label, Text, TextField } from "react-aria-components";
import ArtLink from "../components/ArtLink";
import cm from "../utils/cm.ts";
import { AuthContext } from "../contexts/AuthContext.tsx";

const SignInPage = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const response = await authenticate({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });

    setUser(response);
    navigate("/");
  };

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="bg-Porple  md:p-5 pt-5 pb-5 pr-2 pl-2 gap-3 rounded flex flex-col md:gap-5">
        <div className="flex items-center p-2 rounded">
          <ArtLink aria-label="Go Home" to={"/"}>
            <figure>
              <img
                alt="ArtVision Logo"
                aria-label="ArtVision Logo"
                className="w-32 h-32 md:w-40 md:h-40"
                src="/Logo.svg"
              />
            </figure>
          </ArtLink>
          <h1 className="font-Inter font-bold text-4xl md:text-5xl">
            Art Vision
          </h1>
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
            <Label className="font-Inter text-lg sm:text-xl font-semibold">
              Email
            </Label>
            <Input
              className={cm("rounded p-2 bg-ArtBlack font-Inter", {
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
            <Label className="ffont-Inter text-xl font-semibold">
              Password
            </Label>
            <Input
              className={cm("rounded p-2 bg-ArtBlack font-Inter", {
                "border-[#FFFF00] border-2": passwordError,
              })}
              name="password"
              required
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
            aria-label="sign in"
            className="font-Inter font-semibold p-2 text-xl rounded bg-ArtBlack"
            type={"submit"}
          >
            Sign In
          </Button>
        </form>

        <ArtLink
          className="font-Inter underline underline-offset-2 text-center"
          to="/signup"
          aria-label={"Don't have an account? Sign up"}
        >
          Don't have an account? Sign up
        </ArtLink>
      </div>
    </div>
  );
};

export default SignInPage;
