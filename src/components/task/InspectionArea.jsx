import Apartment from "../../assets/Apartment.png";
import CustomButton from "../CustomButton";

const InspectionArea = ({ children, title, onClick }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center bg-[#F6F6F6] px-5 py-2">
            <div>
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    <img src={Apartment} alt="" />
                </div>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div>
                <CustomButton size="md" onClick={onClick}>+ Add More Findings</CustomButton>
            </div>
        </div>
        {children}
    </div>
);

export default InspectionArea;