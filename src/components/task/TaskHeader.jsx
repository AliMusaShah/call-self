const TaskHeader = ({ customer, date, status, inspector, type }) => (
    <div className="p-4 ">
        <h2 className="text-xl font-bold">Task Name</h2>
        <div className="flex justify-between mt-2 text-sm w-1/2 text-[#777E90]  ">
            <div><strong>Address:</strong> {customer}</div>
            <div><strong >Assigned Date:</strong> {date}</div>
            <div><strong>Status:</strong> <span className="text-green-600">{status}</span></div>
        </div>
        <div className="text-[#777E90]">
            <div><strong>Inspector:</strong> {inspector}</div>
            <div><strong>Inspection Type:</strong> {type}</div>
        </div>
    </div>
);
export default TaskHeader;