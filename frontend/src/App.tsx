import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import DrawPage from "./pages/DrawPage";
import SignUpPage from "./pages/SignUpPage";
import BasePage from "./pages/BasePage";

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
    path: "/signin",
    element: <SignUpPage />,
  },
]);

function App(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
