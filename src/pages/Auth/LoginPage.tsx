import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";
import { setAuth, setProfile } from "@/slices/authSlice";
import { useState } from "react";

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
      <div className="container">
        <div className="px-[300px]">
          <div className="forms">
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

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn-gradient bg-gradient-to-r mt-4 from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2"
                  >
                    {isLoading ? "loading" : "Đăng nhập"}
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
