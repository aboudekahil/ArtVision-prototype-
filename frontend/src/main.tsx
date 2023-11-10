import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
);
