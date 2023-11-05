import React, { useEffect, useState } from "react";
// import { useGetLayoutByIdQuery } from "@/apis/layout";

const Showtime = () => {
  // const id = "653155e7d435bca94dad5e63";
  // const { data }: any = useGetLayoutByIdQuery(id as any);
  const generateRows = (numRows: any) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowChar = String.fromCharCode(65 + i); // Chữ cái A, B, C...
      rows.push(rowChar);
    }
    return rows;
  };

  const generateColumns = (numColumns: any) => {
    const columns = [];
    for (let i = 1; i <= numColumns; i++) {
      columns.push(i);
    }
    return columns;
  };
  const rows: any = generateRows(10);
  const columns: any = generateColumns(10);

  const generateSeats = (rows: any, columns: any) => {
    const seats = [];
    for (const row of rows) {
      for (const col of columns) {
        seats.push(`${row}${col}`);
      }
    }
    return seats;
  };
  const seats = generateSeats(rows, columns);
  const [seatStatus, setSeatStatus] = useState({});
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatNameSlected, setseatNameSlected] = useState([]);
  console.log(seatNameSlected);

  const seatPrices = {
    selected: 45000,
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const seat in seatStatus) {
      if (seatStatus[seat] === "selected") {
        totalPrice += seatPrices["selected"];
      }
    }
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [seatStatus]);

  const handleSeatClick = (seat: any) => {
    if (seatStatus[seat] === "selected") {
      setSeatStatus({ ...seatStatus, [seat]: "unselected" });
      setSelectedSeatCount(selectedSeatCount - 1);
      setseatNameSlected(seatNameSlected.filter((item) => item !== seat)); // Xóa ghế khỏi mảng
    } else if (selectedSeatCount < 10) {
      setSeatStatus({ ...seatStatus, [seat]: "selected" });
      setSelectedSeatCount(selectedSeatCount + 1);
      setseatNameSlected([...seatNameSlected, seat]);
    } else {
      alert("Bạn đã chọn đủ 10 ghế.");
    }
  };

  const getSeatImageURL = (seat: any) => {
    if (seatStatus[seat] === "selected") {
      return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1699092631/seat-select-normal_lw1mjo.png";
    } else {
      return "https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png";
    }
  };
  return (
    <div className="container">
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-7">
          <h3 className="text-[#337ab7] text-xl">
            <a href="">Trang Chủ</a>
            <i className="text-base text-[#000] fa-solid fa-chevron-right"></i>
            <a href="">Đặt vé</a>
            <i className="text-base text-[#000] fa-solid fa-chevron-right"></i>
            <span>Đất Rừng Phương Nam</span>
          </h3>

          <div className="mt-12 grid grid-cols-5">
            <div className="flex h-[35px] justify-evenly">
              <img
                width="35"
                height="35"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                alt=""
              />
              <span className=" text-[13px] font-medium flex justify-center items-center">
                Ghế trống
              </span>
            </div>
            <div className="flex h-[35px] justify-evenly">
              <img
                width="35"
                height="35"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                alt=""
              />
              <span className=" text-[13px] font-medium flex justify-center items-center">
                Ghế đang chọn
              </span>
            </div>
            <div className="flex h-[35px] justify-evenly">
              <img
                width="35"
                height="35"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                alt=""
              />
              <span className=" text-[13px] font-medium flex justify-center items-center">
                Ghế đang được giữ
              </span>
            </div>
            <div className="flex h-[35px] justify-evenly">
              <img
                width="35"
                height="35"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                alt=""
              />
              <span className=" text-[13px] font-medium flex justify-center items-center">
                Ghế đã bán
              </span>
            </div>
            <div className="flex h-[35px] justify-evenly">
              <img
                width="35"
                height="35"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                alt=""
              />
              <span className=" text-[13px] font-medium flex justify-center items-center">
                Ghế đặt trước
              </span>
            </div>
          </div>
          <div className="mt-8">
            <div>
              <img
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1699007234/ic-screen_gyne3k.png"
                alt=""
              />
            </div>
            <div
              className={`text-center grid grid-cols-${Number(columns.length)}`}
            >
              {seats.map((seat, index) => (
                <div key={index} onClick={() => handleSeatClick(seat)}>
                  <div
                    className={`chair text-[#494c62] w-[40px] h-[40px] inline-block text-center leading-[40px] text-[14px] font-semibold bg-[length:35px_35px] bg-center text-[#fff]  bg-[#00000000] bg-no-repeat`}
                    style={{
                      backgroundImage: `url('${getSeatImageURL(seat)}')`,
                    }}
                  >
                    {seat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 bg-white p-6 mt-10">
            <div className="grid grid-cols-2">
              <div>
                <img
                  width="40"
                  height="40"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
              </div>
              <div className="col-span-4 py-2">
                {/* <h4 className="text-[#494c62]">2x45.000 vnđ</h4> */}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <img
                  width="40"
                  height="40"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
              </div>
              <div className="col-span-4 py-2">
                {/* <h4 className="text-[#494c62]">2x45.000 vnđ</h4> */}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <img
                  width="40"
                  height="40"
                  src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1698942632/seat-unselect-normal_gy9jxv.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-lg text-[#494c62]">Ghế thường</h3>
              </div>
              <div className="col-span-4 py-2">
                {selectedSeatCount > 0 ? (
                  <h4 className="text-[#494c62]">
                    {selectedSeatCount} x {seatPrices.selected}
                  </h4>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h3 className="text-lg text-[#494c62]">Tổng tiền</h3>
              </div>
              <div></div>
              <div className="col-span-4 py-2">
                <h1 className="text-xl pt-6 text-[#03599d]">
                  {totalPrice} VNĐ
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-4">
                <h3 className="text-lg text-[#494c62]">Thời gian còn lại</h3>
              </div>
              <div></div>
              <div className="col-span-4 py-2">
                <h1 className="text-xl pt-6 text-[#494c62]">10:00</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-white">
          <div className="grid grid-cols-2 gap-6 dashed-border pb-8">
            <div>
              <img
                width="170"
                src="https://res.cloudinary.com/dtiwyksp8/image/upload/v1699108751/edit-dat-rung-phuong-nam-3768-1641271253-1641280108735333113800_cyp0tn.webp"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-xl text-[#03599d] font-bold py-4">
                Đất Rừng Phương Nam
              </h1>
              <h4>2D Phụ đề</h4>
            </div>
            <div className="col-span-4 px-10">
              <ul>
                <li className="py-2">
                  <i className="fa fa-tags"></i>
                  Thể loại
                  <span>Tâm lý</span>
                </li>
                <li className="py-2">
                  <i className="fa-solid fa-clock"></i>
                  Thời lượng
                  <span>110 phút</span>
                </li>
              </ul>
            </div>
          </div>
          <div className=" px-10">
            <ul>
              <li className="py-2">
                <i className="fa fa-tags"></i>
                Rạp chiếu
                <span>Beta Thái Nguyên</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Ngày chiếu
                <span>18/10/2023</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Giờ chiếu
                <span>15:00</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Phòng chiếu
                <span>P2</span>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-clock"></i>
                Ghế ngồi:
                {Array.isArray(seatNameSlected) && (
                  <span>{seatNameSlected.join(", ")}</span>
                )}
              </li>
            </ul>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn text-white font-medium w-[40%] py-2 rounded-lg">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showtime;
