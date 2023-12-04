import "../Home/home.css";
import { GiTicket } from "react-icons/gi";
import {
  FaTags,
  FaClock,
  FaCalendarAlt,
  FaRegClock,
  FaTv,
  FaCubes,
} from "react-icons/fa";
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
import Loading from "@/components/Loading";
import PopupCart from "@/pages/Showtime/PopupCart.tsx";

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
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const openBuyPopup = () => {
    setIsPopupVisible(true);
  };
  const closeBuyPopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
        if (timeLeft === 60) {
          Swal.fire({
            icon: "info",
            title: "Cảnh báo!",
            text: "Chỉ còn 1 phút để hoàn thành đặt ghế!",
          });
        }
      } else {
        setIsTimeUp(true);
        cancelBooking({ idShowtime: id as string });
        Swal.fire({
          icon: "warning",
          title: "Hết thời gian!",
          text: "Bạn đã hết thời gian để đặt ghế. Chuyển về trang chủ.",
        }).then(() => {
          navigate("/");
        });
        clearInterval(timerId);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (showtime) {
      const bookedSeatIds = showtime.seatsBooked.map((s) => s._id);
      setBookedSeats(bookedSeatIds);
    }
  }, [showtime]);

  useEffect(() => {
    return () => {
      cancelBooking({ idShowtime: id as string });
    };
  }, [location]);
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
  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

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
    const isSeatHeldByOthers = seatsOtherHeld.includes(seat._id);
    if (isSeatHeldByOthers) {
      Swal.fire({
        icon: "info",
        title: "Thông báo",
        text: "Ghế này đang được người khác giữ, vui lòng chọn ghế khác.",
      });
      return;
    }
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

  // const handleOrder = async () => {
  //   // const res: any = await order({
  //   //   showtime: id,
  //   //   seats: selectedSeats.map((s) => s._id),
  //   // });
  //   // dispatch(setSelectedShowtime(showtime));
  // };
  const isButtonDisabled = selectedSeats.length === 0;
  const displayTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <div className="container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-10 gap-8 mt-4">
          <div className="col-span-7">
            <div className="text-xl flex items-center justify-start gap-2 mt-3 title-oswald">
              <span>
                <Link to="/">Trang Chủ &gt;</Link>
              </span>
              <span className="text-[#337ab7]">Đặt vé</span>&gt;
              <span className="text-[#337ab7]">{showtime?.film?.name}</span>
            </div>
            <div className="mt-12 grid grid-cols-4">
              <div className="flex h-[35px] justify-center">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center ml-4">
                  Ghế trống
                </span>
              </div>
              <div className="flex h-[35px]  justify-center">
                <img
                  width="35"
                  height="35"
                  src="https://betacinemas.vn/Assets/global/img/booking/seat-select-normal.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center ml-4">
                  Ghế đang chọn
                </span>
              </div>
              <div className="flex h-[35px]  justify-center">
                <img
                  width="35"
                  height="35"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1699685110/seat-process-normal_tbo1zs.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center ml-4">
                  Ghế đang được giữ
                </span>
              </div>

              <div className="flex h-[35px]  justify-center">
                <img
                  width="35"
                  height="35"
                  src="https://betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png"
                  alt=""
                />
                <span className=" text-[13px] font-medium flex justify-center items-center ml-4">
                  Ghế đã bán
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
                  <h3 className="text-lg text-[#494c62]">Tổng tiền</h3>
                </div>
                <div></div>
                <div className="col-span-4 py-2">
                  <h1 className="text-xl pt-6 text-[#03599d]">
                    {formatCurrency(totalPrice)}
                  </h1>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="col-span-4">
                  <h3 className="text-lg text-[#494c62]">Thời gian còn lại</h3>
                </div>
                <div></div>
                {isTimeUp ? (
                  <div>
                    <p className="text-red-500 text-lg">Hết thời gian!</p>
                  </div>
                ) : (
                  <div className="col-span-4 py-2">
                    <h1 className="text-xl pt-6 text-[#494c62]">
                      {displayTime()}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-white">
            <div className="grid grid-cols-2 gap-6 dashed-border pb-8">
              <div>
                <img
                  width=""
                  src={showtime?.film?.thumbnail?.location}
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
                <ul className="border-dashed border-b-2 border-[#ccc] pb-6">
                  <li className="py-2 show-time check-out">
                    <label className="flex">
                      <FaTags className="mr-2 mt-[4px]" />
                      Thể loại:
                    </label>
                    <span className="ml-2">
                      {showtime?.film?.taxonomies
                        ?.map((t: { name: any }) => t.name)
                        .join(", ")}
                    </span>
                  </li>
                  <li className="py-2 show-time check-out">
                    <label className="flex">
                      <FaClock className="mr-2 mt-[4px]" />
                      Thời lượng:
                    </label>
                    <span className="ml-2">
                      {showtime?.film?.duration} phút
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" px-10">
              <ul>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaCalendarAlt className="mr-2 mt-[4px]" />
                    Ngày chiếu:
                  </label>
                  <span className="ml-2">
                    {dayjs(showtime?.day).format("DD/MM/YYYY")}
                  </span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaRegClock className="mr-2 mt-[4px]" />
                    Giờ chiếu:
                  </label>
                  <span className="ml-2">
                    {dayjs(showtime?.startHour).format("HH:mm")}
                  </span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaTv className="mr-2 mt-[4px]" />
                    Phòng chiếu:
                  </label>
                  <span className="ml-2">{showtime?.room?.name}</span>
                </li>
                <li className="py-2 check-out">
                  <label className="flex">
                    <FaCubes className="mr-2 mt-[4px]" />
                    Ghế ngồi:
                  </label>
                  <span className="ml-2">
                    {selectedSeats.map((s) => s.name).join(", ")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="text-center mt-4 px-10">
              <button
                // onClick={handleOrder}
                onClick={() => openBuyPopup()}
                className={`btn btn text-white flex justify-center font-medium w-[40%] py-2 rounded-lg ${
                  isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isButtonDisabled}
              >
                <span>
                  <GiTicket className="bg-icon" />
                </span>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopupVisible && (
        <PopupCart
          inforShowtime={showtime}
          cartNameSelected={selectedSeats}
          isPopupVisible={isPopupVisible}
          onClosePopup={closeBuyPopup}
        />
      )}
    </div>
  );
};

export default Showtime;
