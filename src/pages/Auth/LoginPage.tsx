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
    <div className="bg-login">
      <div className="container">
        <div className="px-[300px]">
          <div className="forms">
            <ul className="tab-group flex text-center border-b-2  bg-white rounded-t-lg border-[#075fa3]">
              <li className=" w-[50%] tab px-14 py-2 event">
                <a href="#login">Log In</a>
              </li>
              <li className=" w-[50%] tab px-14 py-2">
                <a href="#register">Sign Up</a>
              </li>
            </ul>
            <form id="login" onSubmit={handleSubmit(onSubmit as any)}>
              <div className="input-field rounded-b-lg bg-white p-4 pb-8">
                <div className="relative my-4">
                  <p className="pb-4">Username</p>
                  <div className="form-field">
                      <input className="form-input" placeholder=" " 
                        {...register("username", { required: true })}
                        type="username"
                        name="username"
                        required
                        />
                      <label className="form-label"><span>Username</span></label>
                  </div>
                </div>
                <div className="relative my-4">
                  <p className="pb-4">Password</p>
                  <div className="form-field">
                    <input className="form-input" placeholder=" " 
                      {...register("password", { required: true })}
                      type="password"
                      name="password"
                      required
                      />
                    <label className="form-label"><span>Password</span></label>
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
