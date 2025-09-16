import { BiCalendar, BiChevronRight } from "react-icons/bi"
import Avatar from "./Avatar"

const OrderCard = ({ orders }) => {
    // console.log(orders, 'orderCard')
    return (
        <div className="w-1/5 p-3 rounded-xl border border-gray-100">
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            <div className="flex flex-col gap-4 mt-4">
                {orders && orders.length > 0 ? (
                    orders.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow">
                            <div className="space-y-2">
                                <Avatar name={item?.customerName} />
                                <h3 className="text-xl font-bold text-gray-900">{item?.serviceId?.serviceName}</h3>
                                <p className="text-gray-600 text-sm">
                                    {item?.serviceId?.description}...
                                </p>
                                <div className="flex items-center mt-4 text-gray-500">
                                    <BiCalendar size={16} className="mr-2" />
                                    <span className="text-sm">{item?.serviceId?.createdAt}</span>
                                </div>
                            </div>
                            <div className="text-gray-400 self-center">
                                <BiChevronRight size={24} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <BiCalendar size={48} className="mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="text-sm text-center mt-2">
                            No orders available for the selected date range
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderCard