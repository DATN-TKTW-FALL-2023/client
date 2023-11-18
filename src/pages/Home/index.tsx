import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetFilmsQuery } from "@/apis/films";
import "./home.css";
import { GiTicket } from "react-icons/gi";
import Modal from "../../components/widget/Popup/Modal"; // Import Modal component

const Home = () => {
  const [params, setParams] = useState<any>({
    isRelease: false,
  });
  const { data: filmsData, isFetching } = useGetFilmsQuery(params);
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>(undefined);
  const [filmSelected, setFilmSelected] = useState<string | undefined>(
    undefined
  );
  // State để theo dõi trạng thái của popup mua vé
  const [isBuyPopupOpen, setIsBuyPopupOpen] = useState(false);

  // Function để mở popup mua vé
  const openBuyPopup = (id: any) => {
    setFilmSelected(id);
    setIsBuyPopupOpen(true);
  };

  // Function để đóng popup mua vé
  const closeBuyPopup = () => {
    setIsBuyPopupOpen(false);
  };

  return (
    <div>
      <div className="banner">
        <img src="https://files.betacorp.vn/files/ecm/2023/11/16/untitled-1-172749-161123-58.jpg" alt="" />
      </div>
      <div className="content container">
        <div>
          <div className="mt-12 text-center">
            <ul className="inline-block text-center border-b-2 border-gray">
              <li
                className={`inline-block px-4 text-3xl ${
                  !params.isRelease ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() =>
                    setParams((prev: any) => ({
                      ...prev,
                      isRelease: false,
                    }))
                  }
                >
                  PHIM SẮP CHIẾU
                </a>
              </li>
              <li
                className={`inline-block px-4 text-3xl ${
                  params.isRelease ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() =>
                    setParams((prev: any) => ({
                      ...prev,
                      isRelease: true,
                    }))
                  }
                >
                  PHIM ĐANG CHIẾU
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          {isFetching ? (
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
            <div className="product py-16 grid grid-cols-4 gap-14">
              {filmsData && filmsData?.data?.length > 0 ? (
                filmsData?.data.map((item: any) => (
                  <div className="mb-20" key={item?._id}>
                    <div className="product-image relative">
                      <div className="">
                        <img
                          className="rounded-3xl w-full h-[360px]"
                          width="228px"
                          src={item?.thumbnail?.location}
                          alt=""
                          onClick={() => setTrailerUrl(item?.trailerUrl)}
                        />
                      </div>
                      <span></span>
                      <div className="sticker sticker-new"></div>
                    </div>
                    <div className="product-content">
                      <div>
                        <h3 className="text-[#337ab7] font-bold text-lg py-2">
                          <Link
                            to={`/film/${item._id}`}
                            className="line-clamp-1"
                          >
                            {item?.name}
                          </Link>
                        </h3>
                        <ul className="pb-6">
                          <li className="line-clamp-1">
                            Thể loại:{" "}
                            <span className="font-light">
                              {item?.taxonomies
                                ?.map((taxonomy: any) => taxonomy.name)
                                .join(", ")}
                            </span>
                          </li>
                          <li>
                            Thời lượng:
                            <span className="font-light">
                              {item?.duration} phút
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <button
                          className="btn text-white font-medium w-full py-2 rounded-lg"
                          onClick={() => openBuyPopup(item?._id)} // Mở popup mua vé khi click vào nút "MUA VÉ"
                        >
                          <span><GiTicket className="bg-icon"/></span>
                          MUA VÉ
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <img src="https://img.freepik.com/free-vector/film-rolls-concept-illustration_114360-6784.jpg?w=740&t=st=1700193402~exp=1700194002~hmac=795cb794df67e690dfed1f6ef1122711ca2168182c20a72ae45f6308f0bbad31" alt="" />
                </div>
              )}
            </div>
          )}
        </div>
        {trailerUrl && (
          <div className="trailer-modal">
            <div className="trailer-modal-content">
              <ReactPlayer
                url={trailerUrl}
                width="100%"
                height="100%"
                controls={true}
              />
              <button onClick={() => setTrailerUrl(undefined)}>✖</button>
            </div>
          </div>
        )}
      </div>
      {filmSelected && (
        <Modal
          isOpen={isBuyPopupOpen}
          onClose={closeBuyPopup}
          id={filmSelected}
        />
      )}
    </div>
  );
};

export default Home;
