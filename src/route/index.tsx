import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Checkout from "@/pages/Checkout/checkout";
import Details from "@/pages/Details/detail";
import Home from "@/pages/Home";
import Ticket from "@/pages/Ticket/ticket";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
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
      {
        path: "detail",
        element: <Details />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/ticket",
    element: <Ticket />,
  },
]);
