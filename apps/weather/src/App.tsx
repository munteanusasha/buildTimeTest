import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import WeatherBoard from "./components/weatherBoard/weatherBoard";
import WeatherDay from "./components/weatherDay/weatherDay.tsx";
import ErrorPage from "./components/errorPage.tsx";


const router = createBrowserRouter([

  {
    path: "/", element: <WeatherBoard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:city/week/:day',
    element: <WeatherDay />,
    errorElement: <ErrorPage />,
  },
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}