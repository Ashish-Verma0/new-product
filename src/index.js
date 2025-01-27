import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";
import StoreContext from "./context/StoreContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { DataProvider } from "./context/useData";
const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DataProvider>
        <StoreContext>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </StoreContext>
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>
);
