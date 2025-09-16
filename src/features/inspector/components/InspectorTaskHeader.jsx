
const InspectorTaskHeader = ({ data }) => {
    // console.log(data?.taskId, 'data')

    return (
        <div className="p-4 ">
            <h2 className="text-xl font-bold">Task Name</h2>
            <div className="flex justify-between mt-2 text-sm w-1/2 text-[#777E90]  ">
                <div><strong>Address:</strong>{data?.jobData?.customer?.customer_address?.street} </div>
                <div><strong >Assigned Date:</strong>{data?.createdAt || data?.taskId?.createdAt} </div>
                <div><strong>Status:</strong> <span className="text-green-600"></span>{data?.status || data?.taskId?.status}</div>
            </div>
            <div className="text-[#777E90]">
                <div><strong>Inspector:</strong>{data?.inspectorId?.fullName} </div>
                <div><strong>Inspection Type:</strong>{data?.jobData?.job_title}</div>
            </div>
        </div>
    )
}

export default InspectorTaskHeader