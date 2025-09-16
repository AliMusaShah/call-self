import CalendarComponent from "../../../components/calendar/CalendarComponent";
import CurrentAvailability from "../../../components/calendar/CurrentAvailability";
import CustomButton from "../../../components/CustomButton";
import CustomLoader from "../../../components/CustomLoader";
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet";
import Header from "../../../components/preview/Header";
import CalendarPreiview from "../dashboard/components/CalendarPreiview";
import ApplicationsListings from "../dashboard/components/ShiftListings";

const Calendar = () => {
    const isLoading = false;
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Calendar" />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <div className="w-3/4 ">
                            <div className="flex justify-between  items-center">
                                <Header title="Weekly Availability" subtitle="Click on time slots to add or edit your availability" />
                                <CustomButton
                                    variant="orange"
                                    size="md"
                                    to={'/calendar/add-availability'}
                                >
                                    + Add Availability
                                </CustomButton>
                            </div>
                            <CalendarComponent />
                        </div>
                        <CurrentAvailability />
                    </div>
                </>
            )}
        </>
    )
}

export default Calendar