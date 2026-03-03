import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App.jsx";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="white"
          style={{ width: "380px" }}   
          toastClassName={() =>
            "bg-white text-black   rounded-sm shadow-2xl px-5 py-4 w-full"
          }
          bodyClassName="text-sm font-medium"
          progressClassName="bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

