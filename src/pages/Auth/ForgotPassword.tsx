import React, { useState } from 'react';
import { GiTicket } from 'react-icons/gi';
import { useForgotPasswordMutation } from '@/apis/auth'
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e:any) => {
    e.preventDefault();

    try {
      // Gọi hàm mutation để thực hiện yêu cầu Forgot Password
      const [mutateAsync] = forgotPasswordMutation;
      await mutateAsync({ email });

      // Xử lý kết quả nếu cần thiết
      window.alert('Yêu cầu thành công. Kiểm tra email của bạn để đặt lại mật khẩu.');
      navigate("/");
      
    } catch (error) {
      // Xử lý khi có lỗi
      console.error('Yêu cầu không thành công. Vui lòng kiểm tra lại địa chỉ email.');
    }
  };

  return (
    <div className="bg-login">
      <div className="container">
        <div className="px-[300px]">
          <div className="forms">
            <ul className="tab-group flex text-center justify-center border-b-2  bg-white rounded-t-lg border-[#075fa3]">
              <li className=" w-[50%] tab px-14 py-2">
                <a href="#register">Forgot Password</a>
              </li>
            </ul>
            <form>
              <div className="input-field rounded-b-lg bg-white p-4 pb-8">
                <div className="relative my-4">
                  <p className="pb-4">Email</p>
                  <div className="form-field">
                    <input
                      className={`form-input`}
                      placeholder=" "
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <label className="form-label">
                      <span>Email</span>
                    </label>
                  </div>
                </div>

                <div className="text-center flex justify-center">
                  <button
                    onClick={handleForgotPassword}
                    className="btn text-white font-medium w-[50%] mt-4 py-2 rounded-lg"
                  >
                    <span>
                      <GiTicket className="bg-icon" />
                    </span>
                    Lấy lại mật khẩu
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

export default ForgotPassword;
