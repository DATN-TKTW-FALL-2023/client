import React, { useState, useEffect } from "react";
import { GiTicket } from "react-icons/gi";
import { useResetPasswordMutation } from "@/apis/auth";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Hook để gọi API ResetPassword
  const [resetPassword] = useResetPasswordMutation();

  // Sử dụng useSearchParams để lấy token từ URL
  const [searchParams] = useSearchParams();
  const tokenFromParams = searchParams.get("token");

  useEffect(() => {
    if (tokenFromParams) {
      setToken(tokenFromParams);
    }
  }, [tokenFromParams]);

  const handleResetPassword = async () => {
    try {
      // Kiểm tra giá trị token trước khi gọi API
      console.log("Token:", token);

      const result = await resetPassword({ newPassword, confirmPassword, token });

      // Kiểm tra phản hồi từ API
      if ('error' in result) {
        // Hiển thị thông báo lỗi
        window.alert( "Đã có lỗi xảy ra.");
      } else {
        // Hiển thị thông báo thành công
        window.alert("Cập nhật mật khẩu thành công!");
        navigate("/login");

      }
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có lỗi trong quá trình gọi API
      window.alert("Đã có lỗi xảy ra.");
      console.error(error);
    }
  };

  return (
    <div className="bg-login">
      <div className="container">
        <div className="px-[300px]">
          <div className="forms">
            <ul className="tab-group flex text-center justify-center border-b-2 bg-white rounded-t-lg border-[#075fa3]">
              <li className=" w-[50%] tab px-14 py-2">
                <a href="#register">Change Password</a>
              </li>
            </ul>
            <form>
              <div className="input-field rounded-b-lg bg-white p-4 pb-8">
                <div className="relative my-4">
                  <p className="pb-4">Password</p>
                  <div className="form-field">
                    <input
                      className={`form-input`}
                      placeholder=" "
                      type="password"
                      name="newPassword"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label">
                      <span>Password</span>
                    </label>
                  </div>
                </div>
                <div className="relative my-4">
                  <p className="pb-4">Confirm Password</p>
                  <div className="form-field">
                    <input
                      className={`form-input`}
                      placeholder=" "
                      type="password"
                      name="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="form-label">
                      <span>Confirm Password</span>
                    </label>
                  </div>
                </div>

                <div className="text-center flex justify-center">
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="btn text-white font-medium w-[50%] mt-4 py-2 rounded-lg"
                  >
                    <span>
                      <GiTicket className="bg-icon" />
                    </span>
                    Đổi mật khẩu
                  </button>
                </div>

                <div className="flex justify-end">
                  <p className="text-p py-4 text-[#337ab7] hover:underline inline-block text-gradient">
                    <a href="#">Đăng nhập</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
