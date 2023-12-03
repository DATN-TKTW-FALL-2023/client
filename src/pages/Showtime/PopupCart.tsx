import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { GiTicket } from "react-icons/gi";
import {
  FaTags,
  FaClock,
  FaCalendarAlt,
  FaRegClock,
  FaTv,
  FaCubes,
  FaTimes,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./PopupCart.css";
const PopupCart = ({ inforShowtime,isPopupVisible, onClosePopup, cartNameSelected }: any) => {
  console.log(cartNameSelected);

  const navigate = useNavigate();
  if (!isPopupVisible) {
    return null;
  }
  const formatCurrency = (amount: number | bigint | string | undefined) => {
        if (amount === undefined) {
          return "";
        }
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(Number(amount));
      };
  return (
    <>
      <div className=" popup-container ">
        <FaTimes className="close-icon" onClick={onClosePopup} />
        <div className="container grid grid-cols-10 gap-8 bg-white p-8">
          <div className="col-span-7 ">
            <div className="mt-8 flex items-center ">
              <img
                className="w-8 h-8"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1700898452/ic-inforpayment_dvyogr.png"
                alt=""
              />

              <h1 className="text-xl text-[#494c62] font-bold ml-4">
                THÔNG TIN THANH TOÁN
              </h1>
            </div>
            <div className="grid grid-cols-3 my-6">
              <div>
                <h4 className="font-bold text-[#494c62]">Họ tên:</h4>
                <span>{inforShowtime?.author?.username}</span>
              </div>
              <div>
                <h4 className="font-bold text-[#494c62]">Số điện thoại:</h4>
                <span>{inforShowtime?.author?.phone}</span>
              </div>
              <div>
                <h4 className="font-bold text-[#494c62]">Email:</h4>
                <span>{inforShowtime?.author?.email}</span>
              </div>
            </div>
            <div className="flex justify-between border-b-2 border-[#ccc] ">
              <div className="col-span-7 flex">
                <h1 className="pr-1 font-bold text-[#494c62]">Số ghế: </h1>
                <span>{cartNameSelected?.length}</span>
              </div>
              <div>
                <span>{cartNameSelected?.length} x{" "}
                {formatCurrency(inforShowtime?.price)}</span>
                <span> = </span>
                <span className="text-[#494c62] font-bold">{formatCurrency(
                  Number(cartNameSelected?.length) *
                    Number(inforShowtime?.price)
                )}</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white">
            <div className="px-10 gap-6 dashed-border pb-6 border-dashed border-b-2 border-[#ccc]">
              <div>
                <h1 className="text-xl text-[#03599d] font-bold py-4">
                {inforShowtime?.film.name}
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

                  <span>{dayjs(inforShowtime?.day).format("DD/MM/YYYY")}</span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaRegClock className="mr-2 mt-[4px]" />
                    Giờ chiếu:
                  </label>
                  <span>{ dayjs(inforShowtime?.startHour).format("HH:mm")}</span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaTv className="mr-2 mt-[4px]" />
                    Phòng chiếu:
                  </label>
                  <span>{inforShowtime?.room?.name}</span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaCubes className="mr-2 mt-[4px]" />
                    Ghế ngồi:
                  </label>
                  <div className="displaySeatSelected">
                    {cartNameSelected.map((nameSeat: any, index: number) => (
                      <span key={index}>
                        {nameSeat.name}
                        {index < cartNameSelected.length - 1 && ","}
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
                <span>
                  <GiTicket className="bg-icon" />
                </span>
                Hủy Đơn Hàng
              </button>

              <button
                // onClick={handlePayment}
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
    </>
  );
};

export default PopupCart;
