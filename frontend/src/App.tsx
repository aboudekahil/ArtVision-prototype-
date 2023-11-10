import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import DrawPage from "./pages/DrawPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
// import { AuthContext } from "./contexts/AuthContext.tsx";
import Header from "./components/Header.tsx";

function App(): React.JSX.Element {
  // const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path={"*"} errorElement={<ErrorPage />} />
        <Route path={"/"} element={<Header />} />
        <Route path={"/draw"} element={<DrawPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />

        <Route path={"/signin"} element={<SignInPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
