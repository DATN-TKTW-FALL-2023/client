import { useCreateOrderMutation } from "@/apis/order";
import {
  useBookingSeatMutation,
  useCancelBookingMutation,
  useGetShowtimeDetailQuery,
} from "@/apis/showtime";
import { TSeat } from "@/interfaces/showtime";
import { useAppSelector } from "@/store/hook";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Showtime = () => {
  const { id } = useParams();
  const [selectedSeats, setSeletedSeats] = useState<TSeat[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const profile: any = useAppSelector((state) => state.auth.profile);

  const { data, isLoading } = useGetShowtimeDetailQuery(id as string);
  const showtime = useMemo(() => data?.data, [data, isLoading]);

  const [bookingSeat, { isError }] = useBookingSeatMutation();
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [cancelBooking] = useCancelBookingMutation();
  const [order, { isLoading: isLoadingOrder }] = useCreateOrderMutation();

  useEffect(() => {
    return () => {
      cancelBooking({ idShowtime: id as string });
    };
  }, [location]);

  useEffect(() => {
    if (showtime) {
      const bookedSeatIds = showtime.seatsBooked.map((s) => s._id);
      setBookedSeats(bookedSeatIds);
    }
  }, [showtime]);
  const seatsBooked = showtime?.seatsBooked.map((s) => s._id) || [];

  const seatsOtherHeld =
    showtime?.seatsHeld
      .filter((s) => s.user !== profile._id)
      .reduce(
        (acc, curr) => [...acc, ...curr.seats.map((s) => s._id)],
        [] as string[]
      ) || [];

  const totalPrice = useMemo(
    () => selectedSeats.length * (showtime?.price || 0),
    [showtime, selectedSeats]
  );

  const getSeatImageURL = (seat: TSeat) => {
    if (selectedSeats.map((s) => s._id).includes(seat._id)) {
      return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1699092631/seat-select-normal_lw1mjo.png";
    }
    if (seatsBooked.includes(seat._id)) {
      return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1699685086/seat-buy-normal_npr5z1.png";
    }
    if (seatsOtherHeld.includes(seat._id)) {
      return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1699685110/seat-process-normal_tbo1zs.png";
    }
    return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png";
  };

  const handleSelectSeats = async (seat: TSeat) => {
    const isSeatBooked = bookedSeats.includes(seat._id);
    const index = selectedSeats.findIndex((s) => s._id === seat._id);
    if (index < 0 && selectedSeats.length < 10 && !isSeatBooked) {
      setSeletedSeats((prev) => [...prev, seat]);
    } else if (index >= 0) {
      setSeletedSeats((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
    } else if (isSeatBooked) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ghế này đã được đặt, vui lòng chọn ghế khác!",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bạn không thể đặt được quá 10 ghế trong 1 lần đặt!",
      });
    }
    await bookingSeat({
      idShowtime: id as string,
      idSeat: seat._id,
    });

    if (isError) {
      setSeletedSeats((prev) => [...prev.filter((s) => s._id !== seat._id)]);
    }
  };

  const handleOrder = async () => {
    const res: any = await order({
      showtime: id,
      seats: selectedSeats.map((s) => s._id),
    });
    navigate(`/checkout/${res.data.data._id}`);
  };

  return (
    <div className="container">
      {isLoading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
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
              <span>Đặt vé</span>
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
              <span>{showtime?.film?.name}</span>
            </div>
            <div className="mt-12 grid grid-cols-5">
              <div className="flex h-[35px] justify-evenly">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center">
                  Ghế trống
                </span>
              </div>
              <div className="flex h-[35px] justify-evenly">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center">
                  Ghế đang chọn
                </span>
              </div>
              <div className="flex h-[35px] justify-evenly">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center">
                  Ghế đang được giữ
                </span>
              </div>
              <div className="flex h-[35px] justify-evenly">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center">
                  Ghế đã bán
                </span>
              </div>
              <div className="flex h-[35px] justify-evenly">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center">
                  Ghế đặt trước
                </span>
              </div>
            </div>
            <div className="mt-8">
              <div>
                <img
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1699007234/ic-screen_gyne3k.png"
                  alt=""
                />
              </div>
              <div
                className={`text-center grid grid-cols-${showtime?.room?.layout?.column}`}
              >
                {showtime?.room?.seats.map((seat: any) => (
                  <div key={seat._id} onClick={() => handleSelectSeats(seat)}>
                    <div
                      className={` cursor-pointer text-white w-[40px] h-[40px] inline-flex justify-center items-center text-[14px] font-semibold bg-[length:35px_35px] bg-center bg-[#00000000] bg-no-repeat`}
                      style={{
                        backgroundImage: `url(${getSeatImageURL(seat)})`,
                      }}
                    >
                      {seat.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4 bg-white p-6 mt-10">
              <div className="grid grid-cols-2">
                <div>
                  <img
                    width="40"
                    height="40"
                    src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
                </div>
                <div className="col-span-4 py-2">
                  {/* <h4 className="text-[#494c62]">2x45.000 vnđ</h4> */}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <img
                    width="40"
                    height="40"
                    src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
                </div>
                <div className="col-span-4 py-2">
                  {/* <h4 className="text-[#494c62]">2x45.000 vnđ</h4> */}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <img
                    width="40"
                    height="40"
                    src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className="text-lg text-[#494c62]">Tổng tiền</h3>
                </div>
                <div></div>
                <div className="col-span-4 py-2">
                  <h1 className="text-xl pt-6 text-[#03599d]">
                    {totalPrice} VNĐ
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-4">
                  <h3 className="text-lg text-[#494c62]">Thời gian còn lại</h3>
                </div>
                <div></div>
                <div className="col-span-4 py-2">
                  <h1 className="text-xl pt-6 text-[#494c62]">10:00</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white">
            <div className="grid grid-cols-2 gap-6 dashed-border pb-8">
              <div>
                <img
                  width="170"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1699108751/edit-dat-rung-phuong-nam-3768-1641271253-1641280108735333113800_cyp0tn.webp"
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-xl text-[#03599d] font-bold py-4">
                  {showtime?.film?.name}
                </h1>
                <h4>2D Phụ đề</h4>
              </div>
              <div className="col-span-4 px-10">
                <ul>
                  <li className="py-2">
                    <i className="fa fa-tags"></i>
                    Thể loại:
                    <span className="ml-2">
                      {showtime?.film?.taxonomies
                        ?.map((t: { name: any }) => t.name)
                        .join(", ")}
                    </span>
                  </li>
                  <li className="py-2">
                    <i className="fa-solid fa-clock"></i>
                    Thời lượng:
                    <span className="ml-2">
                      {showtime?.film?.duration} phút
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" px-10">
              <ul>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Ngày chiếu:
                  <span className="ml-2">
                    {dayjs(showtime?.day).format("DD/MM/YYYY")}
                  </span>
                </li>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Giờ chiếu:
                  <span className="ml-2">
                    {dayjs(showtime?.startHour).format("HH:mm")}
                  </span>
                </li>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Phòng chiếu:
                  <span className="ml-2">{showtime?.room?.name}</span>
                </li>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Ghế ngồi: {selectedSeats.map((s) => s.name).join(" ")}
                </li>
              </ul>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleOrder}
                className="btn btn text-white font-medium w-[40%] py-2 rounded-lg"
              >
                {isLoadingOrder ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : (
                  "Tiếp tục"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showtime;
