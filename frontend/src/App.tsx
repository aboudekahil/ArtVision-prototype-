import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import DrawPage from "./pages/DrawPage";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/BasePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/draw",
        element: <DrawPage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
    ],
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
