import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetFilmsQuery } from "@/apis/films";
import "./home.css";
import Modal from "../../components/widget/Popup/Modal"; // Import Modal component

const Home = () => {
  const [params, setParams] = useState<any>({
    isRelease: false,
  });
  const { data: filmsData, isFetching } = useGetFilmsQuery(params);
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>(undefined);

  // State để theo dõi trạng thái của popup mua vé
  const [isBuyPopupOpen, setIsBuyPopupOpen] = useState(false);

  // Function để mở popup mua vé
  const openBuyPopup = () => {
    setIsBuyPopupOpen(true);
  };

  // Function để đóng popup mua vé
  const closeBuyPopup = () => {
    setIsBuyPopupOpen(false);
  };

  return (
    <div>
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
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
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
                          <Link to={`/film/${item._id}`} className="line-clamp-1">
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
                          onClick={openBuyPopup} // Mở popup mua vé khi click vào nút "MUA VÉ"
                        >
                          MUA VÉ
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No films available.</div>
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
      {/* Popup Mua Vé */}
      <Modal isOpen={isBuyPopupOpen} onClose={closeBuyPopup}>
        {/* Nội dung bên trong popup mua vé */}
        <h2>Tên Phim:</h2>
        {/* Thêm nút để đóng popup */}
      </Modal>
    </div>
  );
};

export default Home;
