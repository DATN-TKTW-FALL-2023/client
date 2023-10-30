import React from "react";

type Props = {};

const Details = (props: Props) => {
  return (
    <div className="container">
      <h3 className="text-2xl">
        Trang chủ<span className="text-[#03599d]">Đất Rừng Phương Nam</span>
      </h3>
      <div className="py-4 grid grid grid-cols-[250px_minmax(720px,_1fr)_100px] gap-10">
        <div>
          <div>
            <img
              width="250"
              className="rounded-3xl"
              src="./img/img1.png"
              alt=""
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-medium">Đất Rừng Phương Nam</h1>
          <p className="text-justify py-4">
            Đất Rừng Phương Nam phiên bản điện ảnh được kế thừa và phát triển từ
            tiểu thuyết cùng tên của nhà văn Đoàn Giỏi và tác phẩm truyền hình
            nổi tiếng “Đất Phương Nam” của đạo diễn Nguyễn Vinh Sơn. Bộ phim kể
            về hành trình phiêu lưu của An - một cậu bé chẳng may mất mẹ trên
            đường đi tìm cha. Cùng với An, khán giả sẽ trải nghiệm sự trù phú
            của thiên nhiên và nét đẹp văn hoá đặc sắc của vùng đất Nam Kì Lục
            Tỉnh, sự hào hiệp của những người nông dân bám đất bám rừng và tinh
            thần yêu nước kháng Pháp đầu thế kỉ 20. Bên cạnh đó, tình cảm gia
            đình, tình bạn, tình người, tình thầy trò, tình yêu nước là những
            cung bậc cảm xúc sâu sắc sẽ đọng lại qua mỗi bước chân của An và
            đồng bạn.
          </p>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">ĐẠO DIỄN:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">Nguyễn Quang Dũng</h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">DIỄN VIÊN:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">
                Hồng Ánh, Huỳnh Hạo Khang, Mai Tài Phến, Công Ninh, Hứa Vĩ Văn,
                Tuyền Mập, Tuấn Trần.
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">THỂ LOẠI:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">Tâm lý</h3>
            </div>
          </div>
          <div className="grid grid-cols-[150px_minmax(420px,_1fr)_100px]">
            <div>
              <h3 className="text-lg">THỜI LƯỢNG:</h3>
            </div>
            <div>
              <h3 className="text-lg font-light">110 phút</h3>
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
              <h3 className="text-lg font-light">20/10/2023</h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ul className="flex border-b-2 border-[#ccc]">
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
                style="transition: 0.5s;"
                id="myBtn"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
                href=""
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
                style="transition: 0.5s;"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
                href=""
              >
                13:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                style="transition: 0.5s;"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
                href=""
              >
                15:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                style="transition: 0.5s;"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
                href=""
              >
                17:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                style="transition: 0.5s;"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
                href=""
              >
                20:00
              </a>
              <p className="text-xs py-2 font-medium">136 ghế trống</p>
            </div>
            <div className="my-4 text-center">
              <a
                style="transition: 0.5s;"
                className="px-12 py-[6px] hover:bg-[#ccc] ease-linear bg-[#e5e5e5] text-sm font-medium"
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
