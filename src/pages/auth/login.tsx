import React from "react";

type Props = {};

const Login = (props: Props) => {
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
          <form action="#" id="login">
            <div className="input-field bg-white p-4">
              <p className="py-2" for="email">
                Email
              </p>
              <div className="relative">
                <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                <input
                  className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                  placeholder="Email"
                  type="email"
                  name="email"
                  required="email"
                />
              </div>
              <p className="py-2 mt-2" for="password">
                Password
              </p>
              <div className="relative">
                <i className="fa-solid fa-lock absolute m-[10px] text-gray-500"></i>
                <input
                  className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                  placeholder="Mật khẩu"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <p className="text-p py-4 text-[#337ab7] hover:underline inline-block">
                {" "}
                <a href="#">Quên mật khẩu?</a>{" "}
              </p>
              <div className="text-center">
                <button className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2">
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
