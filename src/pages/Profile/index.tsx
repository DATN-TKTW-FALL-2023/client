import { useGetUserProfileQuery } from "@/apis/user";
import React, { useState, useEffect } from "react";

import Loading from "@/components/Loading";
import { GiTicket } from "react-icons/gi";
import { Link } from 'react-router-dom';
const Profile = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: userData, isLoading, isError,refetch } = useGetUserProfileQuery(
    { key: "listOrder", enabled: false },
    {}
  );
  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading, currentPage, refetch]);

  if (isLoading) {
    return <div className="text-center"><Loading /></div>;
  }
  if (isError) {
    return <div>Error fetching user data</div>;
  }

//   console.log(userData);

  return (

    <div className="container">
      <div className="pt-5 pb-5">
        <div className="mx-auto max-w-2xl shadow-htr overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Thông tin thành viên
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  {userData?.data.username}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  {userData?.data.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  {userData?.data.phone}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Họ</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  {userData?.data.firstName}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium font-bold text-black">Tên</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 font-normal sm:col-span-2">
                  {userData?.data.lastName}
                </dd>
              </div>
              <div className="flex justify-end mx-8">
              <button className="btn text-white font-medium w-[25%] py-2 rounded-lg my-4 mb-8">
                <Link to="/update_profile">
                  <span>
                    <GiTicket className="bg-icon" />
                  </span>
                 Chỉnh sửa 
                </Link>
              </button>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
