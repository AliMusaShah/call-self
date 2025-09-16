import Cards from "../../../components/Cards";
import CustomLoader from "../../../components/CustomLoader";
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet";
import CalendarPreiview from "./components/CalendarPreiview";
import ApplicationsListings from "./components/ShiftListings";

const PtDashboard = () => {

    const isLoading = false; // Replace with actual loading state
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <TitleComponent title="Dashboard" />
                    <div className='flex justify-between items-center '>
                        {/* <SelectDropdown onChange={handleChange} value={timeFrame} options={Months} /> */}
                    </div>
                    <Cards />
                    <div className='flex justify-between gap-4 p-3 mt-4'>
                        <ApplicationsListings />
                        <CalendarPreiview />
                    </div>
                </>
            )}
        </>
    )
}

export default PtDashboard