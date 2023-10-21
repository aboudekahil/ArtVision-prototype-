import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function App(): React.JSX.Element {
  return (
    <>
      <Link to={"/draw"}>Go Draw</Link>
      <Link to={"/login"}>Go login</Link>
    </>
  );
}

export default App;
