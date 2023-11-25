import { useGetOrderDetailQuery } from "@/apis/order";
import { expoleCode } from "@/utils/filter";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GiTicket } from "react-icons/gi";
import dayjs from "dayjs";
import Loading from "@/components/Loading";
const PaymentSuccess = () => {
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if(!searchParams.get('vnp_OrderInfo')) {
      navigate('/')
    }
  }, [searchParams])
  const { data, isLoading } = useGetOrderDetailQuery(expoleCode(searchParams.get('vnp_OrderInfo')));
  
  if (isLoading) {
    return <div className="text-center"><Loading /></div>;
  }

  return (
    <div className="container">
      <div className="mt-12 mb-12 px-8 py-4 shadow-htr rounded w-[800px] mx-auto ">
        <div className="grid grid-cols-2 ">
          <div className="flex">
            <p className="text-2xl font-medium">Hóa đơn số #conc</p> 
            <p className=" mt-[3px] mx-4"><span className="px-2 py-[4px] font-medium bg-[#89ce84] text-xs text-white rounded">ĐÃ THANH TOÁN</span></p>
          </div>
          <div>
            <div className="bill ">
              <p className="font-medium">Ngày tạo hóa đơn: </p>
              <p className="text-[#6a6868]">
              {data?.data?.day
                          ? dayjs(data?.data?.day).format("DD/MM/YYYY")
                          : "Invalid Date"}
              </p>
            </div>
            <div className="bill">
              <p className="font-medium">HÌnh thức thanh toán: </p>
              <p className="text-[#6a6868]">NCB - Ngân Hàng Quốc Dân</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-12">
          <div>
            <p className="font-medium text-xl">Nhà cung cấp dịch vụ: </p>
            <p className="text-base mt-4">MOFY BOOKING COMPANY LTD</p>
          </div>
          <div>
            <p className="font-medium text-xl">Thông tin khách hàng: </p>
            <div className="mt-4">
              <p className="text-base">{data?.data?.user?.lastName}</p>
              <p className="text-base">{data?.data?.user?.phone}</p>
              <p className="text-base">{data?.data?.user?.email}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="font-medium text-xl">Chi tiết đơn hàng: </p>
          </div>
          <div>
            <div className="mt-4 border-b-2 border-[#ccc] flex justify-between pr-8 pb-2">
              <p className="text-[#747373]">Tên Film</p>
              <p className="text-[#747373]">Thành tiền</p>
            </div>
            <div className="border-b-2 border-[#ccc] py-4 flex justify-between pr-8">
              <p>{data?.data?.film}</p>
              <p>{data?.data?.price}đ</p>
            </div>
            <div className="py-4 flex justify-between pr-8">
              <div></div>
              <div className="flex">
                <p className="mr-6 font-bold">Tổng tiền thanh toán</p>
                <p className="">{data?.data?.price}đ</p>
              </div>
            </div>
            <div className="flex justify-end pr-8 mt-2">
              <button className="btn w-[18%] text-white font-medium w-full py-2 rounded-lg">
                <span>
                  <GiTicket className="bg-icon" />
                </span>
                <Link to="/">Quay lại</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
