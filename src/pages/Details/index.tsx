import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetFilmsByIdQuery } from "@/apis/films";
import { useGetShowtimeQuery } from "@/apis/showtime";
import dayjs from "dayjs";
import ShowtimeDetails from "./ShowtimeDetails";
import Loading from "@/components/Loading";
const Details = () => {
  const { id } = useParams();
  const [selectedDay, setSelectedDate] = useState<string>("");
  const [dayShowing, setDayShowing] = useState<any[]>([]);
  const [params, setParams] = useState<any>({
    film: id,
    day: selectedDay,
  });

  const { data: film, isLoading: isLoadingFilm } = useGetFilmsByIdQuery(id);
  const { data: showtime, isLoading } = useGetShowtimeQuery(params, {
    skip: !params.day,
  });
  const [isShowtimeDetailsVisible, setIsShowtimeDetailsVisible] =
    useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    if (film?.data?.dayShowing.length > 0) {
      const dataDayShowing = film?.data?.dayShowing;
      const dateObjects = dataDayShowing?.map((item: any) =>
        dayjs(item).format("YYYY-MM-DD")
      );
      setDayShowing([...new Set(dateObjects)]);
      setSelectedDate(new Date(film?.data?.dayShowing?.[0])?.toISOString());
    }
  }, [film]);

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      day: selectedDay,
    }));
  }, [selectedDay]);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date string
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}/${month}/${dayOfWeek}`;
  }

  return (
    <div className="container">
      {isLoadingFilm ? (
        <Loading />
      ) : (
        <>
          <h3 className="text-2xl mt-10 mb-4">
            <Link to="/">Trang chủ &gt; </Link>
            <span className="text-[#03599d]">{film?.data?.name}</span>
          </h3>
          <div className="py-4 grid grid-cols-[250px_minmax(720px,_1fr)_100px] gap-10">
            <div>
              <div>
                <img
                  className="rounded-3xl w-[228px] h-[360px]"
                  width="228px"
                  src={film?.data?.thumbnail?.location}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-medium">{film?.data?.name}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: film?.data?.content,
                }}
                className="text-justify py-4"
              ></div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">ĐẠO DIỄN:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">{film?.data?.director}</h3>
                </div>
              </div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">DIỄN VIÊN:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">{film?.data?.actor}</h3>
                </div>
              </div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">THỂ LOẠI:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">
                    {film?.data?.taxonomies?.map(
                      (taxonomy: any, index: any) => (
                        <h3 className="text-lg font-light" key={index}>
                          {taxonomy.name}
                        </h3>
                      )
                    )}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">THỜI LƯỢNG:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">
                    {film?.data?.duration} phút
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">NGÔN NGỮ:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">Tiếng Việt</h3>
                </div>
              </div>
              <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
                <div>
                  <h3 className="text-lg">NGÀY KHỞI CHIẾU:</h3>
                </div>
                <div>
                  <h3 className="text-lg font-light">
                    {film?.data?.scheduleAt
                      ? dayjs(film.data.scheduleAt).format("DD/MM/YYYY")
                      : "Invalid Date"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex border-b-2 border-[#ccc]">
              {dayShowing?.map((showingDate: any, index: any) => {
                const dateString = dayjs(showingDate).format("YYYY-MM-DD");
                const formattedDate = formatDate(showingDate);
                const [day, month, dayOfWeek] = formattedDate.split("/");
                return (
                  <div
                    className={`my-2 px-4 py-1 text-center cursor-pointer ${
                      dayjs(selectedDay).format("YYYY-MM-DD") === dateString
                        ? "bg-[#03599d]"
                        : "bg-transparent"
                    }`}
                    key={index}
                    onClick={() => setSelectedDate(dateString)}
                  >
                    <a
                      className={`${
                        dayjs(selectedDay).format("YYYY-MM-DD") === dateString
                          ? "text-white"
                          : "text-black"
                      }`}
                      style={{ display: "block" }}
                    >
                      <span className="text-4xl">{day}</span>/{month}-
                      {dayOfWeek}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="py-8">
              {isLoading && (
                <div role="status">
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
                </div>
              )}
              {showtime && !isLoading && (
                <div className="flex mx-[-4px]">
                  {/* <h2 className="text-lg font-medium">2D PHỤ ĐỀ</h2> */}
                  {showtime?.data
                    ?.slice() 
                    .sort((a: any, b: any) => {
                    
                      return (
                        new Date(a.startHour).getTime() -
                        new Date(b.startHour).getTime()
                      );
                    })
                    .map((st: any) => (
                      <div
                        className="relative my-4 text-center px-2 cursor-pointer"
                        key={st.id}
                      >
                        <div
                          onClick={() => {
                            setSelectedShowtime(st);
                            setIsShowtimeDetailsVisible(true);
                          }}
                          className="px-4 py-[6px] bg-[#e5e5e5] text-sm font-medium duration-500 hover:bg-[#ccc]"
                        >
                          {`${dayjs(
                            new Date(st.startHour).toISOString()
                          ).format("h:mm A")}`}
                        </div>
                        <p className="text-xs py-2 font-medium">
                          {st.room.seats.length - st.seatsBooked.length} {"  "}
                          ghế trống
                        </p>
                        {selectedShowtime && (
                          <ShowtimeDetails
                            showtime={selectedShowtime}
                            isPopupVisible={isShowtimeDetailsVisible}
                            onClosePopup={() =>
                              setIsShowtimeDetailsVisible(false)
                            }
                          />
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div>
            {film?.data?.trailerUrl && (
              <div>
                <h1 className="font-bold text-center text-[30px]">TRAILER</h1>
                <iframe
                  width="100%"
                  height="555"
                  src={film?.data?.trailerUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
