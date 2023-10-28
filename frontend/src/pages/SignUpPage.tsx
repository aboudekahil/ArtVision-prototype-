import { FormEvent } from "react";
import { authenticate } from "../services/userService";
import Requests from "../http-common";
import LocalStorageHandler from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";
import { Input, Label, TextField } from "react-aria-components";

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
      <form className="" onSubmit={onSubmit}>
        <TextField type="email" isRequired={true}>
          <Label>Email</Label>
          <Input required />
        </TextField>
        <TextField type="password" isRequired>
          <Label>Password</Label>
          <Input required />
        </TextField>

        <button>Send data!</button>
      </form>
    </div>
  );
};

export default SignUpPage;
