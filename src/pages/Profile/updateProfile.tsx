import React, { useState, useEffect } from "react";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/apis/user";
import Loading from "@/components/Loading";
import "../../App.css";
import { GiTicket } from "react-icons/gi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: userData, isLoading, isError, refetch } = useGetUserProfileQuery(
    { key: "listOrder", enabled: false },
    {}
  );

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading, currentPage, refetch]);

  const [updateProfileData, setUpdateProfileData] = useState({
    username: userData?.data.username || "",
    email: userData?.data.email || "",
    phone: userData?.data.phone || "",
    firstName: userData?.data.firstName || "",
    lastName: userData?.data.lastName || "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Skip updating the email field
    if (name === "email") {
      return;
    }
    setUpdateProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleUpdateProfile = async () => {
    const newErrors = {
      username: !updateProfileData.username.trim() ? "Vui lòng nhập username!" : "",
      email: !updateProfileData.email ? "Vui lòng nhập email!" : "",
      phone: !updateProfileData.phone.trim() ? "Vui lòng nhập phone!" : "",
      firstName: !updateProfileData.firstName.trim() ? "Vui lòng nhập họ!" : "",
      lastName: !updateProfileData.lastName.trim() ? "Vui lòng nhập tên!" : "",
    };

    // Validate phone number
    const isPhoneNumberValid = /^\+84\d{9,10}$/.test(updateProfileData.phone) || /^\d{10}$/.test(updateProfileData.phone);

    if (!isPhoneNumberValid) {
      newErrors.phone = "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      // Update phone number format before making the request
      updateProfileData.phone = "(+84)" + updateProfileData.phone;

      const response = await updateUserProfile(updateProfileData).unwrap();
      message.success("Cập nhật thông tin thành công");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile", error);
      message.error("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  useEffect(() => {
    setUpdateProfileData({
      username: userData?.data.username || "",
      email: userData?.data.email || "",
      phone: userData?.data.phone || "",
      firstName: userData?.data.firstName || "",
      lastName: userData?.data.lastName || "",
    });
  }, [userData]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return (
    <div className="container">
      <div className="pt-5 pb-5">
        <div className="mx-auto max-w-2xl shadow-htr overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Sửa thông tin tài khoản
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="username"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && <div className="text-red-500">{errors.username}</div>}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="email"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.email}
                    disabled // Disable the email input field
                  />
                  {errors.email && <div className="text-red-500">{errors.email}</div>}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="phone"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Họ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="firstName"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && <div className="text-red-500">{errors.firstName}</div>}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Tên</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="lastName"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}
                </dd>
              </div>
              <div className="m-6">
                <div className="text-center">
                  <button
                    className="btn text-white font-medium w-[40%] py-2 rounded-lg"
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                  >
                    <span>
                      <GiTicket className="bg-icon" />
                    </span>
                    {isUpdating ? "Đang cập nhật..." : "Cập nhật thông tin"}
                  </button>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
