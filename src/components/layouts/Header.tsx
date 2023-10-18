import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <div className="pre-header h-6 bg-black">
        <div className="container w-[1150px] m-auto">
          <div className="float-right">
            <ul className="flex">
              <li className="text-white text-[14px]">
                <a href="">Đăng nhập</a>
              </li>
              <li className="text-white px-2 text-[14px]">|</li>
              <li className="text-white text-[14px]">
                <a href="">Đăng ký</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header relative z-50">
        <div className=" h-[80px] leading-[80px] flex container justify-between ">
          <div className="py-[8px]">
            <a href="#">
              <img width="170" src="./img/Pornhub-Logo-700x394.png" alt="" />
            </a>
          </div>
          <div>
            <ul className="flex">
              <li className="font-bold px-4">
                <a href="">LỊCH CHIẾU THEO RẠP</a>
              </li>
              <li className="font-bold px-4">
                <a href="">PHIM</a>
              </li>
              <li className="font-bold px-4">
                <a href="">RẠP</a>
              </li>
              <li className="font-bold px-4">
                <a href="">GIÁ VÉ</a>
              </li>
              <li className="font-bold px-4">
                <a href="">TIM MỚI VÀ ƯU ĐÃI</a>
              </li>
              <li className="font-bold px-4">
                <a href="">NHƯỢNG QUYỀN</a>
              </li>
              <li className="font-bold px-4">
                <a href="">THÀNH VIÊN</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="banner">
        <img src="./img/Thiết kế chưa có tên.png" alt="" />
      </div>
    </div>
  );
};

export default Header;
