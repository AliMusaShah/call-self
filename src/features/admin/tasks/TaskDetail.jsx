import { useParams } from 'react-router-dom'
import { useGetPdfMutation, useGetPrePostreportByIdQuery } from '../../../api/apiSlice'
import CustomButton from '../../../components/CustomButton'
import CustomLoader from '../../../components/CustomLoader'
import AdminBeforeAfterTask from '../../../components/task/AdminBeforeAfterTask'
import InspectionSection from '../../../components/task/InspectionSection'
import PremisesDetails from '../../../components/task/PremisesDetails'
import { useDownload } from '../../../utils/Hooks'
import InspectorTaskHeader from '../../inspector/components/InspectorTaskHeader'
import { toast } from 'react-toastify'
import NoDataFound from '../../../components/NoDataFound'

const TaskDetail = () => {
    const { id } = useParams()
    // const [isDownloading, setIsDownloading] = useState(false);
    const { isDownloading, DownloadAnchor } = useDownload();
    // console.log(id, 'id')
    // const href = `${import.meta.env.VITE_BASE_URL}/inspectionReport/downloadReport/${id}`

    const { data: PrePostData, isLoading } = useGetPrePostreportByIdQuery(id)

    // console.log(PrePostData?.data?.postReport, 'postReport')
    // console.log(PrePostData?.data?.preReport, 'preReport')
    const [getPdf, { isLoading: pdfLoader }] = useGetPdfMutation()

    const generatePdf = async () => {
        try {
            const response = await getPdf(id).unwrap()
            // console.log(response, 'pdf response')
            if (response.pdfPath) {
                window.open(response.pdfPath, '_blank');
            } else {
                toast.error("No PDF file found in the response");
            }
        } catch (error) {
            toast.error(error?.data?.error || "Failed to download PDF. Please try again later.");

        }
    }
    console.log(PrePostData?.message === 'No reports found.', 'PrePostData')
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    {PrePostData?.message && PrePostData?.message === 'No reports found.' ?
                        <NoDataFound /> :
                        <>
                            <div className='flex justify-end'>

                                {/* <DownloadAnchor onDownload={generatePdf} href={href}> */}
                                <CustomButton size='md' isLoading={pdfLoader} onClick={generatePdf} >
                                    {isDownloading ? 'Downloading...' : 'Export Pdf'}
                                </CustomButton>
                                {/* </DownloadAnchor> */}
                            </div>
                            <InspectorTaskHeader data={PrePostData?.data} />
                            <PremisesDetails
                                facilityType={PrePostData?.data?.premisesDetails}
                                floorPlan={PrePostData?.data?.floorPlan}
                            />
                            <InspectionSection >
                                <AdminBeforeAfterTask preData={PrePostData?.data?.preReport} postData={PrePostData?.data?.postReport} />
                                {/* {PrePostData?.data?.preReport?.report.map((section, index) => (
                            <InspectionDetailArea title={section?.sectionName} key={index}>

                            </InspectionDetailArea>
                        ))} */}
                            </InspectionSection>

                        </>
                    }

                </>
            )}
        </>
    )
}

export default TaskDetail