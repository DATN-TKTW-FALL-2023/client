import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/apis/auth";
import { IUser } from "@/interfaces/User";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { clearAccessToken, setAccessToken } from "@/slices/authSlice";
import Swal from "sweetalert2";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  
  const onSubmit = async (formData: IUser) => {
    try {
      const response = await loginMutation(formData);
      const { accessToken } = response.data.data.auth;
      dispatch(setAccessToken(accessToken));
      Swal.fire("Good job!", "You clicked the button!", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getAccessToken = useAppSelector((state) => state.auth.accessToken);
  
  const handleLogout = () => {
    dispatch(clearAccessToken());
  };
  return (
    <div className="container">
      <div className="px-[300px]">
        <div className="forms">
          <ul className="tab-group flex text-center border-b-2 border-[#ccc]">
            <li className=" w-[50%] tab px-14 py-2 event">
              <a href="#login">Log In</a>
            </li>
            <li className=" w-[50%] tab px-14 py-2">
              <a href="#signup">Sign Up</a>
            </li>
          </ul>
          <form id="login" onSubmit={handleSubmit(onSubmit as any)}>
            <div className="input-field bg-white p-4">
              <p className="py-2">Name</p>
              <div className="relative">
                <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                <input
                  {...register("username", { required: true })}
                  className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                  placeholder="Tên tài khoản"
                  type="username"
                  name="username"
                  required
                />
              </div>
              <p className="py-2 mt-2">Password</p>
              <div className="relative">
                <i className="fa-solid fa-lock absolute m-[10px] text-gray-500"></i>
                <input
                  {...register("password", { required: true })}
                  className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                  placeholder="Mật khẩu"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <p className="text-p py-4 text-[#337ab7] hover:underline inline-block">
                <a href="#">Quên mật khẩu?</a>
              </p>
              <div className="text-center">
                <button
                  onClick={onSubmit}
                  className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2"
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
