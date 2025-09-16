import JobCardHeader from "../../../components/applicationdetail/JobCardHeader";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import RateShiftInfo from "../../../components/dashboard/shift/RateShiftInfo";
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet";
import { sampleJobs } from "../../../mock/data";
import { PiSlidersDuotone } from "react-icons/pi";

const Shifts = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-4">
                        <TitleComponent title="Shifts" />
                        <PiSlidersDuotone size={30} className="text-[#FF5A1F] cursor-pointer " />
                    </div>
                    <div className="space-y-4 bg-white rounded-lg shadow-md p-4 ">

                        {sampleJobs.map((job, index) => (
                            <>
                                <div key={index} className="flex justify-between items-center mb-4 border border-gray-300 p-2 rounded-xl">
                                    <div>
                                        <JobCardHeader title={job.title}
                                            clinic={job.clinic} patients={job.applicantCount} />
                                    </div>
                                    <div className="space-y-2">
                                        <RateShiftInfo
                                            hourlyRate={job.hourlyRate}
                                            shiftDate={job.shiftDate}
                                            startTime={job.startTime}
                                            endTime={job.endTime}
                                        />
                                        <div className="flex justify-end gap-4 ">
                                            <CustomButton
                                                variant='normal'
                                                size='sm'
                                            >
                                                View Details
                                            </CustomButton>
                                            <CustomButton
                                                variant='orange'
                                                size='sm'
                                            >
                                                View Details
                                            </CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>

                </>
            )}
        </>
    )
}

export default Shifts