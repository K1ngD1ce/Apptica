import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/base/globals.scss";
import "./shared/styles/variables/fonts.scss";
import "./shared/styles/variables/vars.scss";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
