import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { ConfigProvider } from "antd";

const container = document.getElementById("root");
const root = createRoot(container);

const TEXT_COLOR = "rgb(38, 41, 102);";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(114, 107, 234)",
            colorText: TEXT_COLOR,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
