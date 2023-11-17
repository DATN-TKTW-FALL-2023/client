import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { GiTicket } from "react-icons/gi";

const ShowtimeDetails = ({
  showtime: { _id, film, day, startHour },
  isPopupVisible,
  onClosePopup,
}: any) => {
  const navigate = useNavigate();
  if (!isPopupVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white w-[700px] h-[430px] p-10 my-[200px] rounded shadow-lg text-center relative">
        <div className=" ">
          <h1 className="flex justify-start text-2xl border-b-2 border-gray pb-4 mb-8">Bạn đang đặt vé xem phim</h1>
          <span
            onClick={onClosePopup}
            className="text-black cursor-pointer absolute top-2 right-2"
            style={{ cursor: "pointer" }}
          >
            X
          </span>
          <h2 className="text-2xl font-medium text-[#03599d] mb-8">{film.name}</h2>
          <div className="flex justify-between px-[150px] border-b-2 border-gray pb-4 mb-4">
            <h3>Ngày chiếu</h3>
            <h3>Giờ chiếu</h3>
          </div>
          <div className="flex justify-between px-[150px] border-b-2 border-gray pb-4 mb-8">
            <p className="font-bold text-xl">{dayjs(day).format("DD/MM/YYYY")}</p>
            <p className="font-bold text-xl">{dayjs(startHour).format("HH:mm")}</p>
          </div>
          <div>
            <button
              onClick={() => navigate(`/showtime/${_id}`)}
              className="btn w-[150px] text-white font-medium w-full py-2 rounded-lg"
            >
              <span><GiTicket className="bg-icon"/></span>
              ĐỒNG Ý
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowtimeDetails;
