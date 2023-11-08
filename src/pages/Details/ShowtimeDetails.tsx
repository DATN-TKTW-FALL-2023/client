import React from "react";

const ShowtimeDetails = ({ movieName, showDate, showTime, isPopupVisible, onClosePopup }:any) => {
  if (!isPopupVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white px-[250px] py-[200px] rounded shadow-lg text-center relative">
        <span
          onClick={onClosePopup}
          className="text-blue-500 hover:underline cursor-pointer absolute top-2 right-2"
          style={{ cursor: "pointer" }}
        >
          X
        </span>
        <h2 className="text-lg font-medium">{movieName}</h2>
        <p className="text-sm">{showDate}</p>
        <p className="text-sm">{showTime}</p>
        <div>
        <button className="btn text-white font-medium w-full py-2 rounded-lg">
                          ĐỒNG Ý
                        </button>
        </div>
      </div>

    </div>
  );
};

export default ShowtimeDetails;
