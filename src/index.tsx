// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from "./app/App";
// import reportWebVitals from "./reportWebVitals";
// import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./app/theme";
// import "./css/index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ThemeProvider theme={theme}><ThemeProvider>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/theme";
import "./css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
