import Checkout from "@/pages/Checkout";
import Details from "@/pages/Details";
import Home from "@/pages/Home";
import Showtime from "@/pages/Showtime";
import React from "react";
import { PathRouteProps } from "react-router-dom";

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
    path: "/checkout",
    Element: Checkout,
    isProtected: true,
  },
];

export default routeConfig;
