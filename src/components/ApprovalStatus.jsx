import { statusContent } from "../mock/data"
import CustomLoader from "./CustomLoader"
import LogoImage from "./LogoImage"
import Title from "./Title"
import Approved from "../assets/icons/approved.svg"
import CustomButton from "./CustomButton"

const ApprovalStatus = () => {
    const status = 'progress'


    return (
        <div className="min-h-screen defaultGradient flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full h-full p-2 relative">
                <LogoImage />
                <div className="text-center max-w-md mx-auto">
                    {/* Purple Loading Spinner */}
                    <div className="flex justify-center">
                        {status === 'progress' ? <CustomLoader style='w-40 h-40 border-12 border-t-12 border-[#7A3FFD]' /> :
                            <div className="min-h-[50vh] flex justify-center items-center">
                                <img src={Approved} alt="Approved" />
                            </div>
                        }
                    </div>

                    <Title
                        heading={statusContent[status].heading}
                        description={statusContent[status].description}
                    />
                    {status === 'completed' && <CustomButton
                        variant="orange"
                        size="lg"
                    >
                        Let’s Start!

                    </CustomButton>}
                </div>
            </div>
        </div>

    )
}

export default ApprovalStatus