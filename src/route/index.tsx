import NotFound from "@/components/widget/404";
import { Route, Routes } from "react-router-dom";
import routeConfig, { TRouteConfig } from "./routeConfig";
import ProtectedRoute from "./protectedRoute";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/Register";

function RouteApp() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <Header />
            <Signup />
            <Footer />
          </>
        }
      />
      <Route path="*" element={<NotFound />} />
      {routeConfig.map(
        (
          { path, Element, isProtected, ...args }: TRouteConfig,
          index: number
        ) => (
          <Route
            path={path}
            key={index}
            element={
              <>
                <Header />
                {isProtected ? (
                  <ProtectedRoute>
                    <Element />
                  </ProtectedRoute>
                ) : (
                  <Element />
                )}
                <Footer />
              </>
            }
            action={args.action}
            loader={args.action}
          />
        )
      )}
    </Routes>
  );
}

export default RouteApp;
