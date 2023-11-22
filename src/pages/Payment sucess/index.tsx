import React from 'react'

const paymentSuccess = () => {
    return (
        <div className='container'>
            <div className='text-center h-center py-[200px]'>
                <div className='flex justify-center text-center'>
                    <img src="https://img.upanh.tv/2023/11/22/success.png" alt="" />
                </div>
                <p className='font-bold pt-4'>Thanh toán thành công</p>
                <p className='py-2 mb-4'>Bạn có thể xem chi tiết trong <span className='text-gradient cursor-pointer'>lịch sử đặt vé.</span></p>
                <button className='btn text-white px-12 py-[12px] rounded-md'>Tiếp tục mua vé</button>
            </div>
        </div>
    )
}

export default paymentSuccess