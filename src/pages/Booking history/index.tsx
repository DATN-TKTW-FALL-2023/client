import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Loading from "@/components/Loading";
import { useGetListOrderQuery } from "@/apis/order";

const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data: orderData, isLoading, refetch } = useGetListOrderQuery(
    { key: "listOrder", enabled: false },
    { retry: false }
  );

  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading, currentPage, refetch]);

  if (isLoading) {
    return <div className="text-center"><Loading /></div>;
  }

  const itemsPerPage = 5;
  const pageCount = Math.ceil(orderData?.data?.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = orderData?.data?.slice(offset, offset + itemsPerPage);

  const handlePageClick = (data:any) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="container">
      <div className="flex flex-col mt-12 mb-12 shadow-htr">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light border-collapse">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Film
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phòng
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ghế
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Giá
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ngày
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Giờ chiếu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData?.map((item:any, index:any) => (
                    <tr key={index} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.film}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.room}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.seats.map((seat:any, index:any) => (
                          <span key={index} className={`seat-${seat}`}>
                            {seat}
                            {index < item?.seats.length - 1 && '-'}
                          </span>
                        ))}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.price}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.day
                          ? dayjs(item?.day).format("DD/MM/YYYY")
                          : "Invalid Date"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.startHour
                          ? dayjs(item?.startHour).format("HH:mm")
                          : "Invalid Date"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
      <ReactPaginate
        className="flex"
        previousLabel={<FaAngleLeft  />}
        nextLabel={<FaAngleRight />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"cursor-pointer p-2 mx-2 flex"}
        nextClassName={"cursor-pointer p-2 mx-2"}
        pageClassName={"cursor-pointer mt-[-3px] p-2 mx-2"}
        breakClassName={"cursor-pointer p-2 mx-2"}
      />
      </div>
    </div>
  );
};

export default BookingHistory;
