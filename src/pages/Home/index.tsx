import { useGetFilmsQuery } from "@/apis/films";
import React, { useState, useEffect } from "react";

type Props = {};

const Home = () => {
  const { data: films } = useGetFilmsQuery();
  const [currentTab, setCurrentTab] = useState("upcoming"); // Ban đầu hiển thị danh sách phim sắp chiếu
  const [filteredFilms, setFilteredFilms] = useState<any[] | undefined>(undefined);

  const filterFilmsByStatus = (status: string) => {
    return films?.data?.filter((film: any) =>
      status === "upcoming"
        ? film.status === "inactive"
        : status === "nowShowing"
        ? film.status === "active"
        : false
    );
  };

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    setFilteredFilms(filterFilmsByStatus(currentTab));
  }, [currentTab, films]);

  return (
    <div>
      <div className="content container">
        <div>
          <div className="mt-12 text-center">
            <ul className="inline-block text-center border-b-2 border-gray">
              <li
                className={`inline-block px-4 text-3xl ${
                  currentTab === "upcoming" ? "active" : ""
                }`}
              >
                <a href="#" onClick={() => handleTabClick("upcoming")}>
                  PHIM SẮP CHIẾU
                </a>
              </li>
              <li
                className={`inline-block px-4 text-3xl ${
                  currentTab === "nowShowing" ? "active" : ""
                }`}
              >
                <a href="#" onClick={() => handleTabClick("nowShowing")}>
                  PHIM ĐANG CHIẾU
                </a>
              </li>
              <li className={`inline-block px-4 text-3xl`}>
                <a href="#" onClick={() => handleTabClick("special")}>
                  SUẤT CHIẾU ĐẶC BIỆT
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="product py-16 grid grid-cols-4">
          {filteredFilms ? (
            filteredFilms.map((item: any) => (
              <div className="mb-20" key={item?._id}>
                <div className="product-image relative">
                  <div className="">
                    <img
                      className="rounded-3xl w-[228px] h-[360px]"
                      width="228px"
                      src={item?.thumbnail?.location}
                      alt=""
                    />
                  </div>
                  <span></span>
                  <div className="sticker sticker-new"></div>
                </div>
                <div className="product-content">
                  <div>
                    <h3 className="text-[#337ab7] font-bold text-lg py-2">
                      {item?.name}
                    </h3>
                    <ul className="pb-6">
                      <li>
                        Thể loại:{" "}
                        <span className="font-light">
                          {item?.taxonomies?.map((taxonomy: any) => taxonomy.name).join(", ")}
                        </span>
                      </li>
                      <li>
                        Thời lượng:
                        <span className="font-light">{item?.duration} phút</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button className="btn text-white font-medium w-[80%] py-2 rounded-lg">
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
      </div>
    </div>
  );
};

export default Home;
