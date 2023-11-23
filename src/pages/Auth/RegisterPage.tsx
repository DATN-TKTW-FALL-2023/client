import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/apis/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
  username: string;
  lastName: string;
  firstName: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const isUsernameValid = (username: string) => {
    // Regular expression to match alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(username);
  };

  const isPasswordValid = (password: string) => {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự và ít nhất một ký tự đặc biệt
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
    return password.length >= minLength && hasSpecialChar;
  };

  const onSubmit = async (formData: FormData) => {
    formData.username = formData.username.trim();
    formData.lastName = formData.lastName.trim();
    formData.firstName = formData.firstName.trim();
    formData.password = formData.password.trim();
    formData.confirmPassword = formData.confirmPassword.trim();
    // Check if the username contains only alphanumeric characters
    if (!isUsernameValid(formData.username)) {
      Swal.fire(
        "Error",
        "Tên đăng nhập chỉ được chứa ký tự chữ và số",
        "error"
      );
      return;
    }
    // Thêm kiểm tra mật khẩu ở đây
    if (!isPasswordValid(formData.password)) {
      Swal.fire(
        "Error",
        "Mật khẩu phải có ít nhất 8 ký tự và ít nhất một ký tự đặc biệt",
        "error"
      );
      return;
    }
    // Kiểm tra mật khẩu không khớp
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Mật khẩu không khớp", "error");
      return;
    }

    try {
      const response = await registerMutation(formData);
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
        Swal.fire("Success", "Đăng kí tài khoản thành công", "success").then(
          (result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          }
        );
      }
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
              <li className=" w-[50%] tab px-14 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-tr-lg">
                <a className="font-bold text-white" href="#register">
                  Sign Up
                </a>
              </li>
            </ul>

            <form id="signup" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-field bg-white p-4 rounded-b-lg">
                {/* Username field */}
                <div className="mr-2 flex-1 mb-2">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Tên đăng nhập
                  </p>
                  <div className="relative">
                    <div
                      className={`form-field ${errors.username ? "error" : ""}`}
                    >
                      <input
                        className="form-input"
                        placeholder=" "
                        {...register("username", {
                          required: "Username is required",
                          validate: (value) => value.trim() !== "",
                        })}
                        type="text"
                        name="username"
                      />
                      <label className="form-label">
                        <span>Username</span>
                      </label>
                    </div>
                    {errors.username && (
                      <p className="error-text text-red-500 text-[13px]">
                        Username không được để trống
                      </p>
                    )}
                  </div>
                </div>

                {/* First Name */}
                <div className="mr-2 flex-1 mb-2">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Họ
                  </p>
                  <div className="relative">
                    <div
                      className={`form-field ${errors.lastName ? "error" : ""}`}
                    >
                      <input
                        className="form-input"
                        placeholder=" "
                        {...register("lastName", {
                          required: "Last name is required",
                          validate: (value) => value.trim() !== "",
                        })}
                        type="text"
                        name="lastName"
                      />
                      <label className="form-label">
                        <span>First Name</span>
                      </label>
                    </div>
                    {errors.lastName && (
                      <p className="error-text text-red-500 text-[13px]">
                        Firstname không được để trống
                      </p>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="mr-2 flex-1 mb-2">
                  <p className="py-2">
                    <span className="text-red-500">*</span> Tên
                  </p>
                  <div className="relative">
                    <div
                      className={`form-field ${
                        errors.firstName ? "error" : ""
                      }`}
                    >
                      <input
                        className="form-input"
                        placeholder=" "
                        {...register("firstName", {
                          required: "First name is required",
                          validate: (value) => value.trim() !== "",
                        })}
                        type="text"
                        name="firstName"
                      />
                      <label className="form-label">
                        <span>Last Name</span>
                      </label>
                    </div>
                    {errors.firstName && (
                      <p className="error-text text-red-500 text-[13px]">
                        Lastname không được để trống
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="flex">
                  <div className="mr-2 flex-1 mb-2">
                    <p className="py-2">
                      <span className="text-red-500">*</span> Mật khẩu
                    </p>
                    <div className="relative">
                      <div
                        className={`form-field ${
                          errors.password ? "error" : ""
                        }`}
                      >
                        <input
                          className="form-input"
                          placeholder=" "
                          {...register("password", {
                            required: "Password is required",
                            validate: (value) => value.trim() !== "",
                          })}
                          type="password"
                          name="password"
                        />
                        <label className="form-label">
                          <span>Password</span>
                        </label>
                      </div>
                      {errors.password && (
                        <p className="error-text text-red-500 text-[13px]">
                          Password không được để trống
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mr-2 flex-1 mb-2">
                    <p className="py-2">
                      <span className="text-red-500">*</span>Xác nhận mật khẩu
                    </p>
                    <div className="relative">
                      <div
                        className={`form-field ${
                          errors.confirmPassword ? "error" : ""
                        }`}
                      >
                        <input
                          className="form-input"
                          placeholder=" "
                          {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value.trim() !== "",
                          })}
                          type="password"
                          name="confirmPassword"
                        />
                        <label className="form-label">
                          <span>Confirm password</span>
                        </label>
                      </div>
                      {errors.confirmPassword && (
                        <p className="error-text text-red-500 text-[13px]">
                          Confirm password không được để trống
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-6">
                  <button className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-[100px] py-2">
                    {isLoading ? "loading" : "Đăng ký"}
                  </button>
                </div>
                <div className="mt-6 mb-6 flex justify-end">
                  <p className="font-semibold">
                    Bạn đã có tài khoản?{" "}
                    <span className="text-gradient">
                      <a href="#login">Đăng nhập ngay!</a>
                    </span>
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

export default Signup;
