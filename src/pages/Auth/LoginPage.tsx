import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";
import { setAuth, setProfile } from "@/slices/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async (formData: any) => {
    try {
      const res: any = await loginMutation(formData);
      const { auth, user } = res.data.data;
      dispatch(setAuth(auth));
      dispatch(setProfile(user));
      navigate("/");
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
                  type="submit"
                  className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2"
                >
                  {isLoading ? "loading" : "Đăng nhập"}
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
