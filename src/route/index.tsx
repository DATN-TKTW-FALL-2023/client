import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Home from "@/pages/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
