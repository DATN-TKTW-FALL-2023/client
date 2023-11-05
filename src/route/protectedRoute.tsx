import { checkAuth } from "@/utils/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token: string = checkAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
