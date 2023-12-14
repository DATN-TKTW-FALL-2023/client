import React, { useState, useEffect } from "react";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/apis/user";
import Loading from "@/components/Loading";
import "../../App.css";
import { GiTicket } from "react-icons/gi";
import { Alert, Space, message  } from 'antd';
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const { data: userData, isLoading, isError } = useGetUserProfileQuery({});
  const [updateProfileData, setUpdateProfileData] = useState({
    username: userData?.data.username || "",
    email: userData?.data.email || "",
    phone: userData?.data.phone || "",
    firstName: userData?.data.firstName || "",
    lastName: userData?.data.lastName || "",
  });

  const navigate = useNavigate()
  console.log(updateProfileData);
  
  const [updateUserProfile, { isLoading: isUpdating, isError: updateError }] = useUpdateUserProfileMutation();

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setUpdateProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserProfile(updateProfileData).unwrap();
      message.success(`Cập nhật thông tin thành công`);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  if (isLoading) {
    return <div className="text-center"><Loading /></div>;
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
                <dt className="text-sm font-medium font-bold text-black">
                  Username
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="username"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.username}
                    onChange={handleInputChange}
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="email"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.email}
                    onChange={handleInputChange}
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="phone"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.phone}
                    onChange={handleInputChange}
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">
                  Họ
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="firstName"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.firstName}
                    onChange={handleInputChange}
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">
                  Tên
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  <input
                    type="text"
                    name="lastName"
                    className="input-profile pl-[3px] py-[14px]"
                    value={updateProfileData.lastName}
                    onChange={handleInputChange}
                  />
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
