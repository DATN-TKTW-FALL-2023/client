import dayjs from "dayjs";
import { GiTicket } from "react-icons/gi";
import {
  FaCalendarAlt,
  FaRegClock,
  FaTv,
  FaCubes,
  FaTimes,
} from "react-icons/fa";
import "./PopupCart.css";
import { useCreateUrlMutation } from "@/apis/payment";
import { useAppDispatch } from "@/store/hook";
import { setCurrentShowtime } from "@/slices/orderSlice";
import { useCreateOrderMutation } from "@/apis/order";
const PopupCart = ({
  inforShowtime,
  isPopupVisible,
  onClosePopup,
  cartNameSelected,
}: any) => {
  if (!isPopupVisible) {
    return null;
  }
  const dispatch = useAppDispatch();

  const [createUrl, { isLoading }] = useCreateUrlMutation();
  const [createOrder, { isLoading: isLoa }] = useCreateOrderMutation();

  function randomMongoId(): string {
    const hexDigits: string = "0123456789abcdef";
    let result: string = "";
    for (let i: number = 0; i < 12; i++) {
      result += hexDigits[Math.floor(Math.random() * 16)];
    }
    return result;
  }

  const handlePayment = async () => {
    // const resOrder: any = await createOrder({
    //   showtime: inforShowtime?._id,
    //   seats: cartNameSelected?.map((s: any) => s._id),
    // });

    const resUrl: any = await createUrl({
      orderId: randomMongoId(),
      amount: inforShowtime?.price * cartNameSelected?.length,
    });
    dispatch(
      setCurrentShowtime({
        showtime: inforShowtime?._id,
        seats: cartNameSelected?.map((s: any) => s._id),
      })
    );
    window.open(resUrl.data.url, "_blank");

  };

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
                <span>
                  {cartNameSelected?.length} x{" "}
                  {formatCurrency(inforShowtime?.price)}
                </span>
                <span> = </span>
                <span className="text-[#494c62] font-bold">
                  {formatCurrency(
                    Number(cartNameSelected?.length) *
                      Number(inforShowtime?.price)
                  )}
                </span>
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
                  <span>{dayjs(inforShowtime?.startHour).format("HH:mm")}</span>
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
                  <div className="">
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
              <button
                onClick={handlePayment}
                className="btn btn mx-2 mb-8 text-white font-medium w-[40%] py-2 rounded-md inline-flex justify-center items-center"
              >
                <span>
                  <GiTicket className="bg-icon" />
                </span>
                {isLoading || isLoa ? (
                  <svg
                    aria-hidden="true"
                    className="flex items-center justify-center w-8 h-8 mr-2 text-[#39adf0] animate-spin dark:text-gray-600 fill-[#075fa3]"
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
      </div>
    </>
  );
};

export default PopupCart;
