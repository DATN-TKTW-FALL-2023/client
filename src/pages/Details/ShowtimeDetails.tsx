import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
      <div className="">
      <div className="bg-white px-[250px] my-[200px] rounded shadow-lg text-center relative">
        <h1 className="flex justify-start">Bạn đang đặt vé xem phim</h1>
        <span
          onClick={onClosePopup}
          className="text-blue-500 hover:underline cursor-pointer absolute top-2 right-2"
          style={{ cursor: "pointer" }}
        >
          X
        </span>
        <h2 className="text-lg font-medium">{film.name}</h2>
        <p className="text-sm">{dayjs(day).format("DD/MM/YYYY")}</p>
        <p className="text-sm">{dayjs(startHour).format("HH:mm")}</p>
        <div>
          <button
            onClick={() => navigate(`/showtime/${_id}`)}
            className="btn text-white font-medium w-full py-2 rounded-lg"
          >
            ĐỒNG Ý
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShowtimeDetails;
