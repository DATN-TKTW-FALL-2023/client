import React from "react";

type Props = {};

const Signup = (props: Props) => {
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

          <form action="#" id="signup">
            <div className="input-field bg-white p-4">
              <div className="flex">
                <div className="mr-2 flex-1">
                  <p className="py-2" for="email">
                    <span className="text-red-500">*</span> Họ và tên
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Họ và tên "
                      type="text"
                      name="text"
                      required="text"
                    />
                  </div>
                </div>
                <div className="ml-2 flex-1">
                  <p className="py-2" for="password">
                    <span className="text-red-500">*</span>Email
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-envelope absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Email"
                      type="email"
                      name="Email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2 flex-1">
                  <p className="py-2" for="email">
                    <span className="text-red-500">*</span> Mật khẩu
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Mật khẩu"
                      type="password"
                      name="password"
                      required="password"
                    />
                  </div>
                </div>
                <div className="ml-2 flex-1">
                  <p className="py-2" for="password">
                    <span className="text-red-500">*</span>Xác nhận mật khẩu
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-lock absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Xác nhận mật khẩu"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="mr-2 flex-1">
                  <p className="py-2" for="email">
                    <span className="text-red-500">*</span> Ngày sinh
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-days absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Ngày sinh"
                      type="date"
                      name="date"
                      required="date"
                    />
                  </div>
                </div>
                <div className="ml-2 flex-1">
                  <p className="py-2" for="password">
                    <span className="text-red-500">*</span>Số điện thoại
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Số điện thoại"
                      type="text"
                      name="number"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2">
                  Đăng ký
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
