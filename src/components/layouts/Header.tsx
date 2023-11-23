import { clearAuth } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useAppDispatch();
  const auth: any = useAppSelector((state) => state.auth.auth);

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  return (
    <div>
      <div className="pre-header h-7 bg-black">
        <div className="container w-[1150px] m-auto">
          <div className="float-right">
            <ul className="flex">
              {auth ? (
                <>
                  <li className="pt-1 text-white text-[15px] hover:underline">
                    <Link to="/profile">Xin Chào {auth?.email}</Link>
                  </li>
                  <li className="pt-1 text-white text-[15px] px-3 hover:underline">
                    <Link to="/bookinghistory">Lịch sử đặt vé</Link>
                  </li>
                  <li className="pt-1 text-white text-[15px] hover:underline cursor-pointer">
                    <p onClick={handleLogout}>Đăng xuất</p>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-white text-[14px] hover:underline ">
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                  <li className="pl-2 text-white text-[14px] hover:underline">
                    <Link to="/register">Đăng ký</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="header relative z-50">
        <div className=" h-[80px] leading-[80px] flex container justify-between ">
          <div className="py-[8px]">
            <Link to="/">
              <img
                width="185"
                src="https://res.cloudinary.com/dxzkcrvi0/image/upload/v1698913976/logo_datn-01_alv0lc.jpg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <ul className="flex">
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">LỊCH CHIẾU THEO RẠP</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">PHIM</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">RẠP</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">GIÁ VÉ</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">TIN MỚI VÀ ƯU ĐÃI</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">NHƯỢNG QUYỀN</a>
              </li>
              <li className="font-bold px-4 hover:text-[#2d98da]">
                <a href="">THÀNH VIÊN</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="banner">
        <img src="https://files.betacorp.vn/files/ecm/2023/11/16/untitled-1-172749-161123-58.jpg" alt="" />
      </div> */}
    </div>
  );
};

export default Header;
