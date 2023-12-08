import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";
import { setAuth, setProfile } from "@/slices/authSlice";
import { useState } from "react";
import { GiTicket } from "react-icons/gi";
interface FormData {
  username: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (formData: FormData) => {
    // Trim the username and password
    formData.username = formData.username.trim();
    formData.password = formData.password.trim();

    try {
      const res: any = await loginMutation(formData);
      const { auth, user } = res.data.data;
      dispatch(setAuth(auth));
      dispatch(setProfile(user));
      navigate("/");
    } catch (error) {
      console.log(error);
      // Xử lý lỗi đăng nhập
      if (error.response && error.response.status === 401) {
        setLoginError("Đã xảy ra lỗi không xác định."); // Thiết lập thông báo lỗi
      } else {
        setLoginError("Tên người dùng hoặc mật khẩu không chính xác."); // Thiết lập thông báo lỗi mặc định
      }
    }
  };

  return (
    <div className="bg-login">
      <div className="overlay-banner--style"></div>
      <div className="container login-container--style">
        <div className="px-[300px]">
          <div className="forms form-login--style">
            <ul className="tab-group flex text-center border-b-2  bg-white rounded-t-lg border-[#075fa3]">
              <li className=" w-[50%] tab px-14 py-2 event bg-gradient-to-r from-cyan-500 to-blue-500 rounded-tl-lg">
                <a className="font-bold text-white" href="#login">
                  Log In
                </a>
              </li>
              <li className=" w-[50%] tab px-14 py-2">
                <a href="#register">Sign Up</a>
              </li>
            </ul>
            <form id="login" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-field rounded-b-lg bg-white p-4 pb-8">
                <div className="relative my-4">
                  <p className="pb-4">Username</p>
                  <div className="form-field">
                    <input
                      className={`form-input ${errors.username ? "error" : ""}`}
                      placeholder=" "
                      {...register("username", {
                        required: true,
                        validate: (value) => value.trim() !== "", // Custom trim validation
                      })}
                      type="text"
                      name="username"
                    />
                    <label className="form-label">
                      <span>Username</span>
                    </label>
                    {errors.username && (
                      <p className="error-text text-red-500 text-[13px]">
                        Username là bắt buộc
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative my-4">
                  <p className="pb-4">Password</p>
                  <div className="form-field">
                    <input
                      className={`form-input ${errors.password ? "error" : ""}`}
                      placeholder=" "
                      {...register("password", {
                        required: true,
                        validate: (value) => value.trim() !== "", // Custom trim validation
                      })}
                      type="password"
                      name="password"
                    />
                    <label className="form-label">
                      <span>Password</span>
                    </label>
                    {errors.password && (
                      <p className="error-text text-red-500 text-[13px]">
                        Password là bắt buộc
                      </p>
                    )}
                    {/* Hiển thị thông báo lỗi */}
                    {loginError && (
                      <div className="text-red-500 text-[13px] mt-4 text-center">
                        {loginError}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center flex justify-center">
                  <button
                    type="submit"
                    className="btn text-white font-medium w-[50%] mt-4 py-2 rounded-lg"
                  >
                    <span>
                        <GiTicket className="bg-icon" />
                    </span>
                    {isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="flex items-center justify-center w-8 h-8 mr-2 text-[#39adf0] animate-spin dark:text-gray-600 fill-[#075fa3]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : "Đăng nhập"}
                  </button>
                </div>

                <div className="flex justify-end">
                  <p className="text-p py-4 text-[#337ab7] hover:underline inline-block text-gradient">
                    <a href="#">Quên mật khẩu?</a>
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

export default Login;
