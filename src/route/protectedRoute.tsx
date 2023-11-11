import { useAppSelector } from "@/store/hook";
import { checkAuth } from "@/utils/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAppSelector((state) => state.auth.auth);

  const token: string = checkAuth(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
