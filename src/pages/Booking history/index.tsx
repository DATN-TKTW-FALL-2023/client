import { useGetListOrderQuery } from "@/apis/order";
import dayjs from "dayjs";
const BookingHistory = () => {
  const { data: orderData, isLoading } = useGetListOrderQuery({});

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light border-collapse">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
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
                {orderData?.data?.map((item: any, index: number) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
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
  );
};

export default BookingHistory;
