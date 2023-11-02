import React from "react";
import { useParams } from "react-router-dom";
import { useGetFilmsByIdQuery } from "@/apis/films";
type Props = {};

const Details = () => {
  const { id } = useParams();
  const { data: films } = useGetFilmsByIdQuery(id);

  function formatDate(dateString:any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}/${month}/${dayOfWeek}`;
  }
  return (
    <div className="container">
      <h3 className="text-2xl">
        Trang chủ <span className="text-[#03599d]">{films?.data?.name}</span>
      </h3>
      <div className="py-4 grid grid-cols-[250px_minmax(720px,_1fr)_100px] gap-10">
        <div>
          <div>
          <img
                      className="rounded-3xl w-[228px] h-[360px]" 
                      width="228px"
                      src={films?.data?.thumbnail?.location}
                      alt=""
                    />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-medium">{films?.data?.name}</h1>
          <p className="text-justify py-4">
            {films?.data?.content}
          </p>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">ĐẠO DIỄN:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">{films?.data?.director}</h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">DIỄN VIÊN:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">
              {films?.data?.actor}
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">THỂ LOẠI:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">
              {films?.data?.taxonomies?.map((taxonomy:any, index:any) => (
                <h3 className="text-lg font-light" key={index}>
                  {taxonomy.name}
                </h3>
              ))}
                </h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">THỜI LƯỢNG:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">{films?.data?.duration} phút</h3>
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
              <h3 className="text-lg font-light">{films?.data?.scheduleAt}</h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="flex border-b-2 border-[#ccc]">
        {films?.data?.dayShowing.map((showingDate:any, index:any) => {
       const formattedDate = formatDate(showingDate);
        const [day, month,dayOfWeek] = formattedDate.split('/');

      return (
        <div className="my-4 text-center" key={index}>
          <a className="text-[#03599d] active px-8" style={{ display: "block" }}>
            <span className="text-4xl">{day}</span>/{month}-{dayOfWeek}
          </a>
          </div>
  );
})}


          <li className="text-[#03599d] active px-8">
            <a href="">
              <span className="text-4xl">16</span>/10 - T2
            </a>
          </li>
          <li className="px-8">
            <a href="">
              <span className="text-4xl">17</span>/10 - T3
            </a>
          </li>
          <li className="px-8">
            <a href="">
              <span className="text-4xl">20</span>/10 - T6
            </a>
          </li>
          <li className="px-8">
            <a href="">
              <span className="text-4xl">21</span>/10 - T7
            </a>
          </li>
        </ul>
        <div className="py-8">
          <h2 className="text-lg font-medium">2D PHỤ ĐỀ</h2>
          <div className="grid grid-cols-8">
            <div className="my-4 text-center">
              <button
                id="myBtn"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500"

              >
                09:00
              </button>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div id="myModal" className="modal my-4 hidden text-center ">
              <span className="close">&times;</span>
              <h1>trung anh</h1>
            </div>
            <div className="my-4 text-center">
              <a
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500" 
                href=""
              >
                13:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500"
                href=""
              >
                15:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500"
                href=""
              >
                17:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500"
                href=""
              >
                20:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium duration-500"
                href=""
              >
                22:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
