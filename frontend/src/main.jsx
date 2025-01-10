import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import Header from "./Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <div className="max-w-[1440px]  mx-auto">
      <App />
    </div>
    <Toaster />
  </StrictMode>
);
