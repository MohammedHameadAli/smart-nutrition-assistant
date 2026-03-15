import React from "react";
import ReactDOM from "react-dom/client";//connects react to html DOM
import { BrowserRouter } from "react-router-dom";//routing multiple pages without refreshing
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(//connects reacto html;s root
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
