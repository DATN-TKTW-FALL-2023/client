import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetFilmsQuery } from "@/apis/films";
import "./home.css";
import { GiTicket } from "react-icons/gi";
import Modal from "../../components/widget/Popup/Modal"; // Import Modal component
import Loading from "@/components/Loading";
import { AiFillPlayCircle } from "react-icons/ai";
import * as dayjs from "dayjs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useOptionByKeyQuery } from "@/apis/option";

const Home = () => {
  const [params, setParams] = useState<any>({
    isRelease: true,
  });
  const { data: filmsData, isFetching } = useGetFilmsQuery(params);
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>(undefined);
  const [filmSelected, setFilmSelected] = useState<string | undefined>(
    undefined
  );
  // State để theo dõi trạng thái của popup mua vé
  const [isBuyPopupOpen, setIsBuyPopupOpen] = useState(false);
    const {data:bannerData} = useOptionByKeyQuery('BANNER')
    
  // Function để mở popup mua vé
  const openBuyPopup = (id: any) => {
    setFilmSelected(id);
    setIsBuyPopupOpen(true);
  };

  // Function để đóng popup mua vé
  const closeBuyPopup = () => {
    setIsBuyPopupOpen(false);
  };

  const bannerImages = [
    "https://files.betacorp.vn/files/ecm/2023/12/11/untitled-1-154822-111223-78.jpg",
    "https://files.betacorp.vn/files/ecm/2023/11/16/untitled-1-172749-161123-58.jpg",

  ];

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="banner">
        <Slider {...sliderSettings}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <img width="100%" src={image} alt={`Banner ${index}`} />
            </div>
          ))}
        </Slider>
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
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    setParams((prev: any) => ({
                      ...prev,
                      isRelease: false,
                    }))
                  }
                >
                  PHIM SẮP CHIẾU
                </p>
              </li>
              <li
                className={`inline-block px-4 text-3xl ${
                  params.isRelease ? "active" : ""
                }`}
              >
                <p
                  className="cursor-pointer"
                  onClick={() =>
                    setParams((prev: any) => ({
                      ...prev,
                      isRelease: true,
                    }))
                  }
                >
                  PHIM ĐANG CHIẾU
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          {isFetching ? (
            <Loading />
          ) : (
            <div className="product py-16 grid grid-cols-4 gap-14">
              {filmsData && filmsData?.data?.length > 0 ? (
                filmsData?.data.map((item: any) => (
                  <div className="mb-20" key={item?._id}>
                    <div className="product-image relative">
                      <div className="cursor-pointer">
                        <img
                          className="rounded-3xl w-full h-[360px]"
                          width="228px"
                          src={item?.thumbnail?.location}
                          alt=""
                          onClick={() => setTrailerUrl(item?.trailerUrl)}
                        />
                        <div
                          className="play-icon"
                          onClick={() => setTrailerUrl(item?.trailerUrl)}
                        >
                          <AiFillPlayCircle className="play-button" />
                        </div>
                        <div className="overlay"></div>
                      </div>
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
                            Thời lượng:{" "}
                            <span className="font-light">
                              {item?.duration} phút
                            </span>
                          </li>
                          {!params.isRelease && (
                            <li>
                              Ngày khởi chiếu:{" "}
                              <span className="font-bold italic text-[#337ab7]">
                                {dayjs(item.scheduleAt).format("DD/MM/YYYY")}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                      {item.dayShowing.length > 0 && (
                        <button
                          className="btn text-white font-medium w-full py-2 rounded-lg"
                          onClick={() => openBuyPopup(item?._id)} // Mở popup mua vé khi click vào nút "MUA VÉ"
                        >
                          <span>
                            <GiTicket className="bg-icon" />
                          </span>
                          MUA VÉ
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <img
                    src="https://img.freepik.com/free-vector/film-rolls-concept-illustration_114360-6784.jpg?w=740&t=st=1700193402~exp=1700194002~hmac=795cb794df67e690dfed1f6ef1122711ca2168182c20a72ae45f6308f0bbad31"
                    alt=""
                  />
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
