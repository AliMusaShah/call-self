import { Form, Formik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { useAddInspectionReportMutation, useGetTaskByIdQuery } from "../../../../api/apiSlice"
import CustomButton from "../../../../components/CustomButton"
import CustomLoader from "../../../../components/CustomLoader"
import { taskData } from "../../../../mock/data"
import AddFindings from "../../components/AddFindings"
import InspectorTaskHeader from "../../components/InspectorTaskHeader"
import PremisesDetailForAdd from "../../components/PremisesDetailForAdd"
import RadioField from "../../components/RadioField"
import PreScopeOfWork from "../../components/PreScopeOfWork"
import { toast } from "react-toastify"

const TaskDetailAdd = () => {
    const { id } = useParams()
    const { data: taskById, isLoading } = useGetTaskByIdQuery(id)
    const [addInspectionReport, { isLoading: addInspectionLoader }] = useAddInspectionReportMutation()
    const navigate = useNavigate()
    const sections = taskById?.data?.formId?.sections.map((item) => {
        return (
            {
                areaType: item?.heading,
                details: [],
                areaImages: [],
                assetImages: []
            }
        )
    })
    const findings = taskById?.data?.formId?.sections.map((section, sectionIndex) => {
        return {
            sectionIndex: sectionIndex,
            sectionHeading: section?.heading,
            questions: section?.questions?.map(question => ({
                question: question?.questionText,
                type: question?.questionType,
                options: question?.options || [],
                answer: question?.questionType === "Multiple Choice" ? "" :
                    question?.questionType === "File Upload" ? "" : ""
            })) || [],

            standardInfo: {
                findings: section?.standardInfo?.findings ? "" : undefined,
                possibleRootCauses: section?.standardInfo?.possibleRootCauses ? "" : undefined,
                recommendations: section?.standardInfo?.recommendations ? "" : undefined,
                meterReadings: section?.standardInfo?.meterReadings ? "" : undefined

            }
        }
    }) || [];


    const sow = taskById?.data?.formId?.ScopeOfWork.map((item) => {
        return (
            {
                text: item?.text,
                isChecked: item?.isChecked || false
            }
        )
    })
    // console.log(taskById?.data?.formId?.ScopeOfWork, 'SOW')
    // console.log(sow, 'sow')

    const initialValues = {
        report: {
            premisesDetails: {
                villa: false,
                apartment: false,
                office: false
            },
            areas: sections,
            findings: findings,
            addedImages: [],
            addedVideos: [],
            file_upload: [],
            findingImages: [],
            generalAssets: [],
            generalAssetImages: [],
            type: taskById?.data?.formId?.formType,
            taskId: id,
            selectedScope: sow
        },
    }
    // console.log(taskById?.data?.formId?.ScopeOfWork, 'SOW')


    // const handleSubmit = async (values) => {
    //     console.log("✅ FormData Values", values);

    //     try {
    //         const formData = new FormData();

    //         // Add simple fields
    //         formData.append("type", values.report?.type);
    //         formData.append("taskId", values.report?.taskId);

    //         // Add premisesDetails
    //         formData.append("premisesDetails", JSON.stringify(values.report?.premisesDetails));
    //         formData.append("addedImages", JSON.stringify(values.report?.addedImages));


    //         // Add areas (including nested assets and images)
    //         values.report?.areas?.forEach((area, i) => {
    //             formData.append(`areas[${i}].areaType`, area.areaType);

    //             area.details?.forEach((room, j) => {
    //                 formData.append(`areas[${i}].details[${j}].customName`, room.customName);
    //                 room.assets?.forEach((asset, k) => {
    //                     formData.append(`areas[${i}].details[${j}].assets[${k}].name`, asset.name);
    //                 });
    //             });

    //             area.roomImages?.forEach((image, j) => {
    //                 if (image instanceof File) {
    //                     formData.append(`areas[${i}].roomImages[${j}]`, image);
    //                 }
    //             });

    //             area.assetImages?.forEach((image, j) => {
    //                 if (image instanceof File) {
    //                     formData.append(`areas[${i}].assetImages[${j}]`, image);
    //                 }
    //             });
    //         });

    //         // Add findings
    //         formData.append("findings", JSON.stringify(values?.report?.findings || []));

    //         // Add generalAssets
    //         values.report.generalAssets?.forEach((asset, i) => {
    //             formData.append(`generalAssets[${i}].name`, asset.name);
    //             if (asset.image instanceof File) {
    //                 formData.append(`generalAssets[${i}].image`, asset.image);
    //             }
    //         });

    //         // Add addedImages
    //         values?.report.addedImages?.forEach((img, i) => {
    //             if (img instanceof File) {
    //                 formData.append(`addedImages[${i}]`, img);
    //             }
    //         });

    //         // Add addedVideos
    //         values?.report.addedVideos?.forEach((vid, i) => {
    //             if (vid instanceof File) {
    //                 formData.append(`addedVideos[${i}]`, vid);
    //             }
    //         });
    //         // console.log("✅ FormData ready to submit", formData);
    //         // console.log("✅ FormData Values", values);
    //         await addInspectionReport(formData).unwrap()
    //     } catch (error) {
    //         console.log(error)
    //     }



    // };
    const handleSubmit = async (values) => {
        console.log("✅ FormData Values", values);

        // try {
        //     const formData = new FormData();
        //     const processedAreas = values.report?.areas?.map((area, i) => {
        //         const processedArea = {
        //             areaType: area.areaType,
        //             details: area.details?.map(room => ({
        //                 customName: room.customName,
        //                 assets: room.assets?.map(asset => ({ name: asset.name })) || []
        //             })) || []
        //         };

        //         // Handle room images
        //         area.areaImages?.forEach((image, j) => {
        //             if (image instanceof File) {
        //                 formData.append(`areaImages`, image);
        //             }
        //         });

        //         // Handle asset images
        //         area.assetImages?.forEach((image, j) => {
        //             if (image instanceof File) {
        //                 formData.append(`assetImages`, image);
        //             }
        //         });

        //         return processedArea;
        //     }) || [];
        //     // Add simple fields
        //     formData.append("type", values.report?.type || '');
        //     formData.append("taskId", values.report?.taskId || '');
        //     formData.append("areas", JSON.stringify(processedAreas));
        //     // formData.append("file_upload", values.report?.file_upload);
        //     formData.append("findings", JSON.stringify(values.report?.findings));
        //     formData.append("selectedScope", JSON.stringify(values.report?.selectedScope));

        //     formData.append(`generalAssets`, JSON.stringify(values.report?.generalAssets));

        //     // Add premisesDetails - only send the ones that are true
        //     if (values.report?.premisesDetails) {
        //         if (values.report.premisesDetails.villa) {
        //             formData.append("premisesDetails[villa]", true);
        //         }
        //         if (values.report.premisesDetails.apartment) {
        //             formData.append("premisesDetails[apartment]", true);
        //         }
        //         if (values.report.premisesDetails.office) {
        //             formData.append("premisesDetails[office]", true);
        //         }
        //     }
        //     // values.report?.findings.forEach((finding, index) => {
        //     //     formData.append(`findings${index}.image`, finding?.image);
        //     //     if (finding?.image instanceof File) {
        //     //         formData.append(`findings${index}.image`, finding?.image);
        //     //     }

        //     // })


        //     // Add findings
        //     // values?.report?.findings?.forEach((finding, index) => {
        //     //     if (typeof finding === 'object' && finding !== null) {
        //     //         Object.keys(finding).forEach(key => {
        //     //             const value = finding[key];
        //     //             if (value !== null && value !== undefined) {
        //     //                 formData.append(`findings`, JSON.stringify(value));
        //     //             }
        //     //         });
        //     //     } else if (finding !== null && finding !== undefined) {
        //     //         formData.append(`findings[${index}]`, JSON.stringify(finding));
        //     //     }
        //     // });

        //     // Process areas and collect files separately


        //     // Convert areas to JSON string before appending

        //     // formData.append(`generalAssetImages`, values.report?.generalAssetImages);


        //     values?.report?.file_upload?.forEach((img, index) => {
        //         if (img instanceof File) {
        //             formData.append(`file_upload`, img);
        //         }
        //     });
        //     values?.report?.findingImages?.forEach((img, index) => {
        //         if (img instanceof File) {
        //             formData.append(`findingImages`, img);
        //         }
        //     });
        //     values?.report?.generalAssetImages?.forEach((img, index) => {
        //         if (img instanceof File) {
        //             formData.append(`generalAssetImages`, img);
        //         }
        //     });
        //     // values?.report?.generalAssetImages?.forEach(file => formData.append("generalAssetImages", file));

        //     // Add other images and videos
        //     values?.report?.addedImages?.forEach((img, index) => {
        //         if (img instanceof File) {
        //             formData.append(`addedImages`, img);
        //         }
        //     });

        //     values?.report?.addedVideos?.forEach((vid, index) => {
        //         if (vid instanceof File) {
        //             formData.append(`addedVideos`, vid);
        //         }
        //     });

        //     // Debug: Log all FormData entries
        //     console.log("FormData entries:");
        //     for (let [key, value] of formData.entries()) {
        //         console.log(key, value instanceof File ? `File: ${value.name}` : value);
        //     }

        //     await addInspectionReport(formData).unwrap();
        //     navigate(-1)
        // } catch (error) {
        //     console.error("Submission error:", error);
        //     toast.error(error?.data?.message || 'something went wrong')
        // }
    };
    const handleRadioChange = (selectedValue, setFieldValue) => {
        const updatedPremisesDetails = {
            villa: selectedValue === "villa",
            apartment: selectedValue === "apartment",
            office: selectedValue === "office"
        };

        setFieldValue("report.premisesDetails", updatedPremisesDetails);
    }

    // console.log(sections, 'sections')
    // console.log(taskById?.data?.formId?.sections, 'taskById')
    return (
        <>
            {isLoading ? <CustomLoader /> :
                (<Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                // enableReinitialize={true}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <InspectorTaskHeader data={taskById?.data} />
                            <PremisesDetailForAdd facilityType={taskData.premises.type} floorPlan={taskData.premises.floorPlan}>
                                <RadioField
                                    name="report.premisesDetails"
                                    label="VILLA"
                                    value="villa"
                                    checked={values.report.premisesDetails.villa}
                                    onChange={() => handleRadioChange("villa", setFieldValue)}
                                />
                                <RadioField
                                    name="report.premisesDetails"
                                    label="APARTMENT"
                                    value="apartment"
                                    checked={values.report.premisesDetails.apartment}
                                    onChange={() => handleRadioChange("apartment", setFieldValue)}
                                />
                                <RadioField
                                    name="report.premisesDetails"
                                    label="OFFICE"
                                    value="office"
                                    checked={values.report.premisesDetails.office}
                                    onChange={() => handleRadioChange("office", setFieldValue)}
                                />
                            </PremisesDetailForAdd >
                            <AddFindings data={taskById?.data} />
                            <PreScopeOfWork values={values} />

                            <CustomButton size="md" variant="primary" className="" type="submit" isLoading={addInspectionLoader}>
                                Save
                            </CustomButton>
                        </Form>
                    )}

                </Formik>)}


        </>
    )
}

export default TaskDetailAdd