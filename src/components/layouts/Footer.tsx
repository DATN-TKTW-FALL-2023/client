import { AiFillFacebook, AiFillYoutube, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      {" "}
      <div className="footer border-t-2 border-[#ccc]">
        <div className="container py-10 grid grid-cols-3">
          <div>
            <div className="mb-4">
              <img
                width="200"
                src="https://res.cloudinary.com/dxzkcrvi0/image/upload/v1698914102/logo_datn-01_bun5pj.png"
                alt=""
              />
            </div>

            <div>
              <ul>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Tuyển dụng
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Giới thiệu
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Liên hệ
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  F.A.Q
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Hoạt động xã hội
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Điều khoản sử dụng
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Chính sách thanh toán
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Liên hệ quảng cáo
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Điều khoản bảo mật
                </li>
                <li className="font-light hover:text-sky-700 cursor-pointer py-[2px]">
                  Hướng dẫn đặt vé online
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="br text-xl inline-block mb-4">
              KẾT NỐI VỚI CHÚNG TÔI
            </h2>
            <div>
              <div className="flex text-3xl text-[#ccc] mb-2">
                <AiFillFacebook className="mx-2" />
                <AiFillInstagram className="mx-2" />
                <AiFillYoutube className="mx-2" />
              </div>
              <img
                width="150"
                src="https://betacinemas.vn/Assets/Common/logo/dathongbao.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <h2 className="br text-xl inline-block mb-4">LIÊN HỆ</h2>
            <div>
              <h4>CÔNG TY CỔ PHẦN BETA FREE FIRE</h4>
              <h6 className="text-xs py-2">
                Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày
                08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
              </h6>
              <h6 className="text-xs py-2">
                Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp
                Bát, quận Hoàng Mai, thành phố Hà Nội
              </h6>
              <h6 className="text-xs py-2">Hotline: 1900 636807</h6>
              <h6 className="text-xs py-2">Email: cskh@betacorp.vn</h6>
              <h4>Liên hệ hợp tác kinh doanh:</h4>
              <h6 className="text-xs py-2">Email: phuongdh@betagroup.vn</h6>
              <h6 className="text-xs py-2">Phone: +8490 666 9169</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
