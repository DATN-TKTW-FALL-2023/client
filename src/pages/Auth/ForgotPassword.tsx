import React, { useState } from 'react';
import { GiTicket } from 'react-icons/gi';
import { useForgotPasswordMutation } from '@/apis/auth';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();

    // Validate email format
    if (!emailRegex.test(email)) {
      setError('Định dạng email không hợp lệ. Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    try {
      // Call the mutation function to initiate Forgot Password request
      const [mutateAsync] = forgotPasswordMutation;
      await mutateAsync({ email });

      // Handle the result if necessary
      alert('Yêu cầu thành công. Kiểm tra email của bạn để đặt lại mật khẩu.');
      navigate('/');
    } catch (error) {
      // Handle errors
      setError('Yêu cầu không thành công. Vui lòng kiểm tra địa chỉ email của bạn.');
    }
  };

  return (
    <div className="bg-login">
      <div className="container">
        <div className="px-[300px]">
          <div className="forms">
            <ul className="tab-group flex text-center justify-center border-b-2  bg-white rounded-t-lg border-[#075fa3]">
              <li className=" w-[50%] tab px-14 py-2">
                <a href="#register">Quên mật khẩu</a>
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

                {error && (
                  <div className="text-red-500 mb-4">
                    <p>{error}</p>
                  </div>
                )}

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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
