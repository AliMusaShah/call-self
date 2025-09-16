import EventCard from "../../../components/calendar/EventCard";
import Cards from "../../../components/Cards";
import CustomCardHeader from "../../../components/CustomCardHeader";
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet";
import NewDisputeForm from "../../../components/dispute/NewDisputeForm";
import Header from "../../../components/preview/Header";
import { sampleJobs } from "../../../mock/data"

const DisputeCenter = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Dispute center" />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        {/* <ReviewCard /> */}
                        <NewDisputeForm />

                        <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col gap-4  flex-1`}>
                            <Header title="Your Disputes" subtitle="Track the status of your submitted disputes" />
                            {sampleJobs.map((job, index) => (
                                <EventCard
                                    key={index}
                                    day="Tuesday"
                                    date={job.shiftDate}
                                    startTime={job.startTime}
                                    endTime={job.startTime}
                                    status="Hidden"
                                    statusColor="red"
                                />
                            ))}
                        </div>
                    </div>


                </>
            )}
        </>
    )
}

export default DisputeCenter