import { useFormikContext } from 'formik';
import { useState } from 'react';
import { BiBath, BiCabinet, BiDoorOpen, BiHome } from 'react-icons/bi';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import FloorPlanItem from '../../../components/task/FloorPlanItem';
import AddArea from './AddArea';
import ImageVideoUploader from './ImageVideoUploader';

const PremisesDetailForAdd = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { setFieldValue } = useFormikContext()
    const { values } = useFormikContext()

    const handleOpenModal = () => {
        setIsOpen(true);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
        // setFieldValue("report.areas", initialAreas);
        setFieldValue("report.generalAssets", []);
    }
    const handleJustSave = () => {
        setIsOpen(false);
    }
    const getAreaIcon = (areaType) => {
        const iconMap = {
            Room: <BiHome size={20} className="text-blue-500" />,
            Bathroom: <BiBath size={20} className="text-blue-500" />,
            Hall: <BiDoorOpen size={20} className="text-blue-500" />,
            Kitchen: <BiCabinet size={20} className="text-blue-500" />
        };

        return iconMap[areaType] || <BiHome size={20} className="text-blue-500" />;
    };

    return (
        <>
            <div className="p-4">
                <ImageVideoUploader />

                <p className="mt-4">Post our inspection, the following areas/premises will be covered in this report:</p>
                <div className='flex gap-4 mt-2'>
                    {children}
                </div>

                <div className='flex justify-between items-center gap-2 mt-4'>
                    <div className="flex mt-2 gap-2 text-sm">
                        <strong>Floor Plan:</strong>
                        {values?.report?.areas.map((area, index) => (
                            <FloorPlanItem
                                key={index}
                                icon={getAreaIcon(area?.areaType)}
                                count={area?.details.length}
                                label={area?.areaType}
                            />))}

                    </div>

                    <div>
                        <CustomButton size='md' variant='primary' className='mt-2' onClick={handleOpenModal}>
                            + Add Area
                        </CustomButton>
                    </div>

                </div>
                <div className="flex mt-2 gap-2 text-sm">
                    <strong>Assets:</strong>
                    <FloorPlanItem
                        count={values?.report?.generalAssets.length}
                    />

                </div>
            </div>
            <CustomModal onClose={handleCloseModal} isOpen={isOpen} title="Add Area">
                <AddArea onClose={handleCloseModal} justSave={handleJustSave} />
            </CustomModal>
        </>
    )
}

export default PremisesDetailForAdd