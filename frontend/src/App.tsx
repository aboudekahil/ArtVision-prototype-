import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Header from "./components/HeaderComponents/Header.tsx";
import StreamingRoomPage from "./pages/StreamingRoomPage.tsx";

function App(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={"*"} errorElement={<ErrorPage />} />
        <Route path={"/"} element={<Header />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/signin"} element={<SignInPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/room/:roomId"} element={<StreamingRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
