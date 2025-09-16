import CustomCardHeader from "../CustomCardHeader"
import TitleComponent from "../dashboard/shift/TitleComponnet"


const ReviewCard = ({ children }) => {
    return (

        <div className="p-6 bg-white rounded-lg shadow-md w-3/4 max-h-[750px] overflow-y-auto">
            {/* <TitleComponent title='Active Applications' /> */}
            <CustomCardHeader title={'Recent Feedback'} text={`Latest reviews from clinics`} />

            <div className="space-y-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default ReviewCard