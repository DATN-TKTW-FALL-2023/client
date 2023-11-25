import { useGetOrderDetailQuery } from "@/apis/order";
import { expoleCode } from "@/utils/filter";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const { data } = useGetOrderDetailQuery(expoleCode(searchParams.get('vnp_OrderInfo')));
  const navigate = useNavigate()
  return (
    <div className="container">
      <div className="text-center h-center py-[200px]">
        <div className="flex justify-center text-center">
          <img src="https://img.upanh.tv/2023/11/22/success.png" alt="" />
        </div>
        <p className="font-bold pt-4">Thanh toán thành công</p>
        <Link to="/bookinghistory" className="py-2 mb-4">
          Bạn có thể xem chi tiết trong{" "}
          <span className="text-gradient cursor-pointer">lịch sử đặt vé.</span>
        </Link>
        <button
          onClick={() => navigate("/")}
          className="btn text-white px-12 py-[12px] rounded-md"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
