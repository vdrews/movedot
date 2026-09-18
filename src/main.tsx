

import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

const appRouter = router();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={appRouter} />
);