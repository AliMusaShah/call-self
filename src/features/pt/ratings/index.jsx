import TitleComponent from '../../../components/dashboard/shift/TitleComponnet';
import CustomLoader from '../../../components/CustomLoader';
import Cards from '../../../components/Cards';
import ApplicationsListings from '../dashboard/components/ShiftListings';
import Rating from '../../../components/applicationdetail/Rating';
import StrikeHistory from '../../../components/ratingstrike/StrikeHistory';
import { sampleJobs } from '../../../mock/data';
import Header from '../../../components/preview/Header';
import EventCard from '../../../components/calendar/EventCard';
import ReviewCard from '../../../components/ratingstrike/ReviewCard';
import { FaStar } from "react-icons/fa"
import CustomCardHeader from '../../../components/CustomCardHeader';
import BlockQuote from '../../../components/ratingstrike/BlockQuote';
const RatingsStrikes = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Rating and Strikes" />
                    <Cards />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        {/* <ReviewCard /> */}
                        <ReviewCard>

                            {sampleJobs.map((job, index) => (
                                <>
                                    <div className='border-b border-b-gray-400  p-2 my-2' key={index}>
                                        <div className="flex items-start justify-between ">
                                            <CustomCardHeader title={job?.title} text={` Morning PT Shift • ${job?.shiftDate} `} />
                                            <div className="flex gap-1">
                                                {[...Array(job?.applicantCount)].map((_, index) => (
                                                    <FaStar key={index} className=" text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <BlockQuote text={job?.title} />
                                    </div>
                                </>
                            ))}
                        </ReviewCard>

                        <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4 justify-between flex-1`}>
                            <Header title="Strike History" subtitle="Track any performance issues or policy violations" />
                            {sampleJobs.map((job, index) => (
                                <EventCard
                                    key={index}
                                    day="Tuesday"
                                    date={job.shiftDate}
                                    startTime={job.startTime}
                                    endTime={job.startTime}
                                    status="Hidden"
                                    statusColor="red"
                                // bgColor='bg-[#FED7AA]'
                                />
                            ))}
                            <Rating />
                        </div>
                    </div>


                </>
            )}
        </>
    )
}

export default RatingsStrikes