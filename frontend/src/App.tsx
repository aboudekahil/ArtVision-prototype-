import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
