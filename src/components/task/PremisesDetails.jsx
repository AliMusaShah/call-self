import { BiHome } from 'react-icons/bi';
import Apartment from '../../assets/Apartment.png';
import FloorPlanItem from './FloorPlanItem';
const PremisesDetails = ({ facilityType, floorPlan }) => {
    // console.log(facilityType?.apartment, 'facilityType');
    // console.log(floorPlan, 'floorPlan');
    return (
        <div className="p-4 ">
            <h3 className="font-bold">Premises Details</h3>
            <p>Post our inspection, the following areas/premises will be covered in this report:</p>
            <div className="flex items-center gap-2 mt-2">
                <img src={Apartment || facilityType.image} alt="Facility" className="w-12 h-12" />
                <span>{facilityType?.apartment && "Apartment"}</span>
                <span>{facilityType?.villa && "Villa"}</span>

            </div>
            <div className="flex mt-2 gap-2 text-sm">
                <strong>Floor Plan:  </strong>
                {Object?.entries(floorPlan).map(([sectionName, count]) => (
                    <FloorPlanItem
                        key={sectionName}
                        icon={<BiHome size={20} className="text-blue-500" />}
                        count={count}
                        label={sectionName}
                    />
                ))}

            </div>
        </div>
    )
};
export default PremisesDetails;  