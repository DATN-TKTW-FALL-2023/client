import React from 'react'
import { GiTicket } from "react-icons/gi";
const ForgotPassword = () => {
    return (
        <div className="bg-login">
        <div className="container">
            <div className="px-[300px]">
            <div className="forms">
                <ul className="tab-group flex text-center justify-center border-b-2  bg-white rounded-t-lg border-[#075fa3]">
                    <li className=" w-[50%] tab px-14 py-2">
                        <a href="#register">Forgot Password</a>
                    </li>
                </ul>
                <form >
                    <div className="input-field rounded-b-lg bg-white p-4 pb-8">
                        <div className="relative my-4">
                            <p className="pb-4">Email</p>
                            <div className="form-field">
                                <input
                                className={`form-input`}
                                placeholder=" "
                                type="email"
                                name="email"
                                />
                                <label className="form-label">
                                    <span>Email</span>
                                </label>
                            </div>
                        </div>

                        <div className="text-center flex justify-center">
                            
                            <button
                                className="btn text-white font-medium w-[50%] mt-4 py-2 rounded-lg">
                                <span>
                                    <GiTicket className="bg-icon" />
                                </span>
                                Lấy lại mật khẩu
                            </button>
                            </div>

                        <div className="flex justify-end">
                        <p className="text-p py-4 text-[#337ab7] hover:underline inline-block text-gradient">
                            <a href="#">Đăng nhập</a>
                        </p>
                        </div>
                    </div>
                    </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword  