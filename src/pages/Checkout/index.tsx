import { useGetOrderDetailQuery } from "@/apis/order";
import { useMemo } from "react";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import { GiTicket } from "react-icons/gi";

import { useGetListOrderQuery } from "@/apis/order";
import {
  FaTags,
  FaClock,
  FaCalendarAlt,
  FaRegClock,
  FaTv,
  FaCubes,
} from "react-icons/fa";


import { useCreateUrlMutation } from "@/apis/payment";


const Checkout = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id as string);
  const order = useMemo(() => data?.data, [data, isLoading]);

  const formatCurrency = (amount: number | bigint | string | undefined) => {
    if (amount === undefined) {
      return "";
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));
  };

  const [createUrl] = useCreateUrlMutation();

  const handlePayment = async () => {
    const res: any = await createUrl({ orderId: id, amount: order?.price });
    console.log("🚀 ~ file: index.tsx:28 ~ handlePayment ~ res:", res);
    window.location.href = res.data.url;
  };

  return (
    <div className="container">
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-7 ">
          <div className="text-xl flex items-center justify-start gap-2 mt-3 title-oswald">
            <Link to="/">Trang Chủ &gt;</Link>
            <span className="text-[#337ab7]">Đơn hàng</span> &gt;
            <span className="text-[#337ab7]">{order?.film}</span>
          </div>
          <div className="inline-block mt-8">
            <div className="inline-block">
              <img width="35" src="https://picsum.photos/200/300" alt="" />
            </div>
            <div className="inline-block  mb-[-10px] mx-4">
              <h1 className="text-xl text-[#494c62]">THÔNG TIN THANH TOÁN</h1>
            </div>
          </div>
          <div className="grid grid-cols-3 my-6">
            <div>
              <h4>Họ tên:</h4>
              <span>{order?.user?.username}</span>
            </div>
            <div>
              <h4>Số điện thoại:</h4>
              <span>{order?.user?.phone}</span>
            </div>
            <div>
              <h4>Email:</h4>
              <span>{order?.user?.email}</span>
            </div>
          </div>
          <div className="flex justify-between border-b-2 border-[#ccc] ">
            <div className="col-span-7">
              <h1>Số ghế: {order?.seats?.length}</h1>
            </div>
            <div>

              <span>
                {order?.seats?.length} x {formatCurrency(order?.price)}
              </span>
              <span> = </span>
              <span>
                {formatCurrency(
                  Number(order?.seats?.length) * Number(order?.price)
                )}
              </span>

              <span>Tổng tiền: </span>
              <span>{formatCurrency(order?.price)}</span>

            </div>
          </div>
        </div>
        <div className="col-span-3 bg-white">
          <div className=" px-10 gap-6 dashed-border pb-6 border-dashed border-b-2 border-[#ccc]">
            <div>
              <h1 className="text-xl text-[#03599d] font-bold py-4">
                {order?.film}
              </h1>
              <h4>2D Phụ đề</h4>
            </div>
          </div>
          <div className=" px-10">
            <ul>
              <li className="py-2 check-out">
                <label className="flex">
                  <FaCalendarAlt className="mr-2 mt-[4px]" />
                  Ngày chiếu:
                </label>

                <span>{dayjs(order?.day).format("DD/MM/YYYY")}</span>
              </li>
              <li className="py-2 check-out">
                <label className="flex">
                  <FaRegClock className="mr-2 mt-[4px]" />
                  Giờ chiếu:
                </label>
                <span>{dayjs(order?.startHour).format("HH:mm")}</span>
              </li>
              <li className="py-2 check-out">
                <label className="flex">
                  <FaTv className="mr-2 mt-[4px]" />
                  Phòng chiếu:
                </label>
                <span>{order?.room}</span>
              </li>
              <li className="py-2 check-out">
                <label className="flex">
                  <FaCubes className="mr-2 mt-[4px]" />
                  Ghế ngồi:
                </label>

                {order?.seats.map((seat: any, index: any) => (
                  <span key={index} className={`seat-${seat}`}>
                    {seat}
                    {index < order?.seats.length - 1 && ","}
                  </span>
                ))}

                <div>
                  {order?.seats.map((seat: any, index: any) => (
                    <span key={index}>
                      {seat}
                      {index < order?.seats.length - 1 && ", "}
                    </span>
                  ))}
                </div>

              </li>
            </ul>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn mx-2 mb-8 text-white font-medium w-[40%] py-2 rounded-md">
              <span>
                <GiTicket className="bg-icon" />
              </span>
              Quay lại
            </button>

            <button className="btn btn mx-2 mb-8 text-white font-medium w-[40%] py-2 rounded-md">

            <button
              onClick={handlePayment}
              className="btn btn mx-2 mb-8 text-white font-medium w-[40%] py-2 rounded-md"
            >

              <span>
                <GiTicket className="bg-icon" />
              </span>
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
