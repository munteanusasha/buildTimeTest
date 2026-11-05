import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import NotFoundPage from "./components/notFoundPage.tsx";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/show-5-day-forecast", Component: App },
  { path: "/:dayForecast", Component: App },
  { path: "*", Component: NotFoundPage },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
