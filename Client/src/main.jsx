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
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          closeOnClick
          draggable
          theme="dark"
          toastClassName={() =>
            "bg-white text-black border border-black rounded-lg px-4 py-3"
          }
          bodyClassName="text-sm font-medium"
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

