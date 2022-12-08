import { createBrowserRouter } from "react-router-dom";

import { Login, Register } from "@/pages/auths";
import { User } from "@/pages/user";
import { Organizers } from "@/pages/organizers";
import { MainLayout } from "@/layouts/Main";
import { Sports } from "@/pages/sports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "sports-events",
        element: <Sports />,
      },
      {
        path: "organizers",
        element: <Organizers />,
      },
      {
        path: "users",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
