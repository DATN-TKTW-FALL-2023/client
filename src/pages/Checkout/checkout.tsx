import React from "react";

type Props = {};

const Checkout = (props: Props) => {
  return (
    <div className="container">
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-7">
          <h3 className="text-[#337ab7] text-xl">
            <a href="">Trang Chủ</a>
            <i className="text-base text-[#000] fa-solid fa-chevron-right"></i>
            <a href="">Đặt vé</a>
            <i className="text-base text-[#000] fa-solid fa-chevron-right"></i>
            <span>Đất Rừng Phương Nam</span>
          </h3>
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
              <span>Quách Trung Anh</span>
            </div>
            <div>
              <h4>Số điện thoại:</h4>
              <span>0326912033</span>
            </div>
            <div>
              <h4>Email:</h4>
              <span>trunganh123cx@gmail.com</span>
            </div>
          </div>
          <div className="grid grid-cols-10 pb-4 border-b-2 border-[#ccc] ">
            <div className="col-span-7">
              <h1>Ghết VIP</h1>
            </div>
            <div className="col-span-1">
              <span>2 x 50.000</span>
            </div>
            <div className="col-span-2">
              <span> = 100.000 vnđ</span>
            </div>
          </div>
          <div className="inline-block mt-8">
            <div className="inline-block">
              <img width="35" src="https://picsum.photos/200/300" alt="" />
            </div>
            <div className="inline-block  mb-[-10px] mx-4">
              <h1 className="text-xl text-[#494c62]">COMBO ƯU ĐÃI</h1>
            </div>
          </div>

          <table className="w-full mt-10">
            <tr className="border-b-2 border-[#ccc] pb-4">
              <th className=" font-normal text-base w-[20%]"></th>
              <th className=" font-normal text-base w-[25%]">Tên combo</th>
              <th className=" font-normal text-base ">Mô tả</th>
              <th className=" font-normal text-base w-[15%]">Số lượng</th>
            </tr>
            <tr>
              <td className="px-4">
                <img src="https://picsum.photos/200/300" alt="" />
              </td>
              <td className="px-4 font-medium">Combo See Mê - Cầu Vồng</td>
              <td className="px-4">
                GIÁ SỐC, Chỉ 139K sở hữu ngay: 1 Bắp (69oz) + 1 Cốc Cầu vồng kèm
                nước có gaz
              </td>
              <td className="px-4">5</td>
            </tr>
          </table>

          <div className="inline-block mt-8">
            <div className="inline-block">
              <img width="45" src="https://picsum.photos/200/300" alt="" />
            </div>
            <div className="inline-block  mb-[-10px] mx-4">
              <h1 className="text-xl text-[#494c62]">GIẢM GIÁ</h1>
            </div>
          </div>
          <div className="mt-6">
            <div className="border-b-2 border-[#ccc] pb-2">
              <h3>
                <i className="fa-solid fa-circle-down"></i>
                Beta Voucher
                <span className="text-[#1473B6] italic">
                  (Nhấn vào đây để xem danh sách voucher của bạn)
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-5 gap-8 mt-4">
              <div className="col-span-2">
                <p className="py-2">Mã Voucher</p>
                <input
                  className="w-full border-[1px] border-[#ccc] py-2 bg-[#f8f8f8] focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                />
              </div>
              <div className="col-span-2">
                <p className="py-2">Mã Pin</p>
                <input
                  className="w-full border-[1px] border-[#ccc] py-2 bg-[#f8f8f8] focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                />
              </div>
              <div className="col-span-1">
                <p className="py-2">&nbsp;</p>
                <button className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-8 py-2">
                  ĐĂNG KÝ
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 border-b-2 border-[#ccc] pb-12">
            <div className="border-b-2 border-[#ccc] pb-2">
              <h3>
                <i className="fa-solid fa-circle-down"></i>
                Điểm Beta
                <span className="text-[#1473B6] italic">
                  (Nhấn vào đây để xem danh sách voucher của bạn)
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-[90px] mt-4">
              <div className="col-span-1">
                <p className="py-2">Điểm hiện có</p>
                <h3>0</h3>
              </div>
              <div className="col-span-1">
                <p className="py-2">Nhập điểm</p>
                <input
                  className="w-full border-[1px] border-[#ccc] py-2 bg-[#f8f8f8] focus:outline-none focus:ring focus:border-blue-500"
                  type="text"
                />
              </div>
              <div className="col-span-1">
                <p className="py-2">Số tiền được giảm</p>
                <h3>= 0 vnđ</h3>
              </div>
              <div className="col-span-1">
                <p className="py-2">&nbsp;</p>
                <button className="btn-gradient bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg text-white px-8 py-2">
                  Đổi điểm
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <h3>Tổng tiền:</h3>
              <p className="text-red-500">50.000 vnđ</p>
            </div>
            <div className="flex">
              <h3>Số tiền được giảm:</h3>
              <p className="text-red-500">0 vnđ</p>
            </div>
            <div className="flex">
              <h3>Số tiền cần thanh toán:</h3>
              <p className="text-red-500">50.000 vnđ</p>
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
                Đất Rừng Phương Nam
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
