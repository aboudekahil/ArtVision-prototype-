import React, { useEffect } from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import DrawPage from "./pages/DrawPage";
import SignUpPage from "./pages/SignUpPage";
import BasePage from "./pages/BasePage";
import LocalStorageHandler from "./utils/LocalStorageHandler";
import Requests from "./http-common";
import { LocalStorageUser } from "./shared.types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <h1>Hello world</h1>,
      },
      {
        path: "/draw",
        element: <DrawPage />,
      },
      {},
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App(): React.JSX.Element {
  useEffect(() => {
    const user =
      LocalStorageHandler.getFromKeyParsed<LocalStorageUser>("curru");

    if (user) Requests.defaults.headers.common["Authorization"] = user.token;

    console.log(Requests.defaults.headers);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
