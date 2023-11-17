import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/apis/auth";
import { IUser } from "@/interfaces/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit = async (formData: IUser) => {
    try {
      const response: any = await registerMutation(formData);
      if (response.error) {
        if (response.error.data) {
          const errorMessages = response.error.data.message;
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((errorMessage) => {
              Swal.fire("Error", errorMessage, "error");
            });
          } else {
            Swal.fire("Error", errorMessages, "error");
          }
        } else {
          Swal.fire("Error", "An unknown error occurred.", "error");
        }
      } else {
        Swal.fire(
          "Success",
          "You have successfully registered!",
          "success"
        ).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
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

          <form id="signup" onSubmit={handleSubmit(onSubmit as any)}>
            <div className="input-field bg-white p-4">
              <div className="flex">
                <div className="mr-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Tên đăng nhập
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Tên đăng nhập"
                      type="text"
                      name="username"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="mr-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Họ
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Họ"
                      type="text"
                      name="lastName"
                      required
                    />
                  </div>
                </div>

                <div className="mr-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Tên
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Tên"
                      type="text"
                      name="firstName"
                      required
                    />
                  </div>
                </div>
                {/* <div className="ml-2 flex-1">
                  <p className="py-2">
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
                </div> */}
              </div>
              <div className="flex">
                <div className="mr-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Mật khẩu
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-user absolute m-[10px] text-gray-500"></i>
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Mật khẩu"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
                <div className="ml-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span>Xác nhận mật khẩu
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-lock absolute m-[10px] text-gray-500"></i>
                    <input
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                      })}
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Xác nhận mật khẩu"
                      type="password"
                      name="confirmPassword"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* <div className="flex ">
                <div className="mr-2 flex-1">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Ngày sinh
                  </p>
                  <div className="relative">
                    <i className="fa-solid fa-calendar-days absolute m-[10px] text-gray-500"></i>
                    <input
                      className="border-2 border-[#ccc] outline-none w-full py-[5px] px-8"
                      placeholder="Ngày sinh"
                      type="date"
                      name="date"
                      required
                    />
                  </div>
                </div>
                <div className="ml-2 flex-1">
                  <p className="py-2">
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
              </div> */}
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
