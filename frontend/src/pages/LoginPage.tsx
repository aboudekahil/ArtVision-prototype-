import { FormEvent } from "react";
import { authenticate } from "../services/userService";
import Requests from "../http-common";
import LocalStorageHandler from "../utils/LocalStorageHandler";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input id="email" name="email" type="email" />

        <label htmlFor="password">Enter your password</label>
        <input id="password" name="password" type="password" />

        <button>Send data!</button>
      </form>
    </>
  );
};

export default LoginPage;
