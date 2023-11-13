import { useGetOrderDetailQuery } from "@/apis/order";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailQuery(id as string);
  console.log("🚀 ~ file: index.tsx:7 ~ Checkout ~ data:", data);

  const order = useMemo(() => data?.data, [data, isLoading]);

  return (
    <div className="container">
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-7">
          <div className="text-[#337ab7] text-xl flex items-center justify-start gap-2 mt-3">
            <Link to="/">Trang Chủ</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span>Đơn hàng</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span>{order?.film}</span>
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
              <h1>Ghế thường</h1>
            </div>
            <div>
              <span>
                {order?.seats?.length} x {order?.price}
              </span>
              <span> = </span>
              <span>
                {Number(order?.seats?.length) * Number(order?.price)} vnđ
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-white">
          <div className="grid grid-cols-2 gap-6 dashed-border pb-8">
            <div>
              <img width="170" src="./img/img1.png" alt="" />
            </div>
            <div>
              <h1 className="text-xl text-[#03599d] font-bold py-4">
                {order?.film}
              </h1>
              <h4>2D Phụ đề</h4>
            </div>
            <div className="col-span-4 px-10">
              <ul>
                <li className="py-2">
                  <i className="fa fa-tags"></i>
                  Thể loại
                  <span>Tâm lý</span>
                </li>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Thời lượng
                  <span>110 phút</span>
                </li>
              </ul>
            </div>
          </div>
          <div className=" px-10">
            <ul>
              <li className="py-2">
                <i className="fa fa-tags"></i>
                Rạp chiếu
                <span>Beta Thái Nguyên</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Ngày chiếu
                <span>18/10/2023</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Giờ chiếu
                <span>15:00</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Phòng chiếu
                <span>P2</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Ghế ngồi
                <span>P2</span>
              </li>
            </ul>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn text-white font-medium w-[40%] py-2 rounded-lg">
              Quay lại
            </button>
            <button className="btn btn text-white font-medium w-[40%] py-2 rounded-lg">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
