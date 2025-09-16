import { Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAddPostInspectionMutation, useGetInspectionTasksByTypeQuery } from "../../../../api/apiSlice"
import CustomButton from "../../../../components/CustomButton"
import CustomLoader from "../../../../components/CustomLoader"
import NoDataFound from "../../../../components/NoDataFound"
import BeforeAfterSection from "../../../../components/task/BeforeAfterSection"
import InspectionDetailArea from "../../../../components/task/InspectionDetailArea"
import PremisesDetails from "../../../../components/task/PremisesDetails"
import BeforeScopeOfWork from "../../components/BeforeScopeOfWork"
import InspectorTaskHeader from "../../components/InspectorTaskHeader"
import PostScopeOfWork from "../../components/PostScopeOfWork"
import QuestionsForPost from "../../components/QuestionsForPost"

const PrePostTask = () => {
    const { id } = useParams()
    const [type, settype] = useState('Pre-Inspection')
    // const { data: taskDetail, isLoading } = useGetTaskByIdQuery(id)
    const { data: taskDetail, isLoading } = useGetInspectionTasksByTypeQuery({ id, type: type })
    const [addPostInspection, { isLoading: addLoader }] = useAddPostInspectionMutation()
    const navigate = useNavigate()
    // console.log(taskDetail?.data?.taskId?.formId?.ScopeOfWork, 'taskDetail for SOW');


    const findings = taskDetail?.data?.report?.flatMap((section) => {
        return section?.findings?.map((finding) => {
            return {
                sectionIndex: finding?.sectionIndex,
                sectionHeading: finding?.sectionHeading,
                questions: finding?.questions?.map((question) => ({
                    question: question?.question,
                    answer: '',
                    type: question?.type,
                })) || [],
                standardInfo: {
                    findings: "",
                    possibleRootCause: "",
                    recommendations: ""
                }
            }
        }) || []
    })
    // console.log(findings, 'findings')
    const initialValues = {
        taskId: taskDetail?.data?.taskId?._id,
        findings: findings,
        findingImages: [],
        file_upload: [],
        selectedScope: taskDetail?.data?.scopeOfWork || [],
    }
    const handleSubmit = async (values) => {
        console.log(values, 'values');
        try {
            const formData = new FormData();
            formData.append(`taskId`, values?.taskId);
            formData.append(`findings`, JSON.stringify(values?.findings));
            formData.append(`selectedScope`, JSON.stringify(values?.selectedScope));


            values?.file_upload?.forEach((image, j) => {
                if (image instanceof File) {
                    formData.append(`file_upload`, image);
                }
            });
            values?.findingImages?.forEach((image, j) => {
                if (image instanceof File) {
                    formData.append(`findingImages`, image);
                }
            });
            await addPostInspection(formData).unwrap()
            navigate('/inspector-tasks')

        } catch (error) {
            console.log(error?.data?.message, 'error in handleSubmit');
        }
    }
    if (taskDetail?.message === 'No reports found.') return <NoDataFound />

    console.log(taskDetail?.data, 'taskDetail')
    return (
        <>
            {isLoading ? (
                <CustomLoader />
            ) : (
                <>
                    <InspectorTaskHeader data={taskDetail?.data} />
                    <PremisesDetails
                        facilityType={taskDetail?.data?.premisesDetails}
                        floorPlan={taskDetail?.data?.floorPlan}
                    />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                {taskDetail?.data?.report.map((section, index) => (
                                    <InspectionDetailArea title={section?.sectionName} key={index}>
                                        {section?.findings.map((finding, findingIndex) => (
                                            <BeforeAfterSection data={finding} >
                                                <QuestionsForPost data={finding?.questions} findingIndex={index} finding={finding} />
                                            </BeforeAfterSection>
                                        ))}
                                    </InspectionDetailArea>
                                ))}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-4 bg-[#F6F6F6]">
                                    <BeforeScopeOfWork data={taskDetail?.data?.scopeOfWork} />
                                    <PostScopeOfWork />
                                </div>
                                <div className="flex justify-end mx-3">
                                    <CustomButton size="md" variant="primary" className="" type="submit" isLoading={addLoader}>
                                        Save
                                    </CustomButton>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </>
            )}
        </>
    )
}

export default PrePostTask