import Details from "@/pages/Details";
import Home from "@/pages/Home";
import Showtime from "@/pages/Showtime";
import Profile from "@/pages/Profile";
import React from "react";
import { PathRouteProps } from "react-router-dom";
import BookingHistory from "@/pages/Booking history";
import PaymentSuccess from "@/pages/Callback";
export interface TRouteConfig extends PathRouteProps {
  Element: React.FC;
  isProtected: boolean;
}
const routeConfig: TRouteConfig[] = [
  {
    path: "/",
    Element: Home,
    isProtected: false,
  },
  {
    path: "/film/:id",
    Element: Details,
    isProtected: false,
  },
  {
    path: "/showtime/:id",
    Element: Showtime,
    isProtected: true,
  },
  {
    path: "/profile",
    Element: Profile,
    isProtected: true,
  },
  {
    path: "/bookinghistory",
    Element: BookingHistory,
    isProtected: true,
  },
  {
    path: "/vnpay_return",
    Element: PaymentSuccess,
    isProtected: true,
  },
];

export default routeConfig;
