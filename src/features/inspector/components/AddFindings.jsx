import { FieldArray, useFormikContext } from 'formik'
import AddFindingsRecommendation from '../../../components/task/AddFindingsRecommendation'
import InspectionArea from '../../../components/task/InspectionArea'
import InspectionSection from '../../../components/task/InspectionSection'
import QuestionsForFindings from '../../../components/task/QuestionsForFindings'

const AddFindings = ({ data }) => {
    const { values } = useFormikContext()
    // console.log(data?.formId?.sections, 'data')
    return (
        <>
            {/* <InspectionSection>
                {data?.formId?.sections.map((section, sectionIndex) => (
                    <FieldArray key={sectionIndex} name={`report.findings.${sectionIndex}`}>
                        {({ remove: removesection, push: pushsection }) => {
                            console.log(section, 'individual Sections')
                            return (
                                <InspectionArea title={section?.heading} onClick={() => pushsection({

                                })}>
                                    <AddFindingsRecommendation
                                        section={section}
                                        sectionIndex={sectionIndex}
                                    >
                                        <QuestionsForFindings
                                            section={section}
                                            sectionIndex={sectionIndex}
                                        />

                                    </AddFindingsRecommendation>
                                </InspectionArea>
                            )
                        }}
                    </FieldArray>
                ))}
            </InspectionSection> */}
            <InspectionSection>
                {data?.formId?.sections.map((section, sectionIndex) => (
                    <FieldArray key={sectionIndex} name={`report.findings`}>
                        {({ remove: removeFinding, push: pushFinding }) => {
                            // console.log(section, 'individual Sections')

                            // Create the structure for a new finding
                            const createNewFinding = () => {
                                const newFinding = {
                                    sectionIndex: sectionIndex,
                                    sectionHeading: section?.heading,
                                    questions: section?.questions?.map(question => ({
                                        question: question?.questionText,
                                        answer: question?.questionType === "Multiple Choice" ? "" :
                                            question?.questionType === "File Upload" ? null : "",
                                        type: question?.questionType,
                                        options: question?.options || []
                                    })) || [],
                                    standardInfo: {
                                        findings: section?.standardInfo?.findings ? "" : undefined,
                                        possibleRootCauses: section?.standardInfo?.possibleRootCauses ? "" : undefined,
                                        recommendations: section?.standardInfo?.recommendations ? "" : undefined
                                    }
                                };
                                return newFinding;
                            };

                            // Get findings for this specific section
                            const sectionFindings = values?.report?.findings.filter(
                                finding => finding.sectionIndex === sectionIndex
                            );
                            // console.log(sectionFindings, 'section findings')

                            return (
                                <InspectionArea
                                    title={section?.heading}
                                    onClick={() => pushFinding(createNewFinding())}
                                >
                                    {/* Render all findings for this section */}
                                    {sectionFindings.map((finding, localIndex) => {
                                        // Find the actual index in the main findings array
                                        const actualFindingIndex = values.report.findings.findIndex(
                                            f => f === finding
                                        );

                                        return (
                                            <div key={actualFindingIndex} className="mb-4 border-b pb-4">
                                                {/* Only show finding number and remove button if there are multiple findings */}
                                                {sectionFindings.length > 1 && (
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="font-medium text-gray-700">
                                                            Finding #{localIndex + 1}
                                                        </h4>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFinding(actualFindingIndex)}
                                                            className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                )}
                                                <AddFindingsRecommendation
                                                    section={section}
                                                    sectionIndex={sectionIndex}
                                                    findingIndex={actualFindingIndex}
                                                >
                                                    <QuestionsForFindings
                                                        section={section}
                                                        sectionIndex={sectionIndex}
                                                        findingIndex={actualFindingIndex}
                                                    />
                                                </AddFindingsRecommendation>
                                            </div>
                                        );
                                    })}
                                </InspectionArea>
                            )
                        }}
                    </FieldArray>
                ))}
            </InspectionSection>

        </>
    )
}

export default AddFindings
