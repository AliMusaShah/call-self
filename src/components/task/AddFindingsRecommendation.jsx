import { Field, useFormikContext } from "formik";
import { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { toast } from "react-toastify";
import { useGetAiSuggestionsForMultipleImagesMutation, useGetAiSuggestionsMutation } from "../../api/apiSlice";
import MeterReadingsForm from "../../features/inspector/components/MeterReadingsForm";
import AiSuggestButton from "./AiSuggestButton";
import { IoClose } from "react-icons/io5";

const AddFindingsRecommendation = ({ section, sectionIndex, findingIndex, children }) => {
    const { setFieldValue, values } = useFormikContext()
    const [image, setImage] = useState([])
    const fieldBaseName = `report.findings.${findingIndex}`;
    const [getAiSuggestionsForMultipleImages, { isLoading }] = useGetAiSuggestionsForMultipleImagesMutation()

    const handleFileChange = (e, name) => {
        const files = Array.from(e.target.files);
        const existingFiles = values?.report?.findingImages || [];
        const newFiles = [];
        const newPreviews = [];
        files.forEach((file, index) => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                newFiles.push(file);

                const fileId = Date.now() + index;

                if (file.type.startsWith('image/')) {
                    // Create preview for images
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setImage(prev => [...prev, {
                            id: fileId,
                            type: 'image',
                            url: e.target.result,
                            name: file.name,
                            file: file
                        }]);
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video/')) {
                    // Create preview for videos
                    const videoUrl = URL.createObjectURL(file);
                    newPreviews.push({
                        id: fileId,
                        type: 'video',
                        url: videoUrl,
                        name: file.name,
                        file: file
                    });
                }
            }
        });
        if (newPreviews.length > 0) {
            setImage(prev => [...prev, ...newPreviews]);
        }

        if (files) {
            // Get existing files or initialize empty array

            // Add new file to the array
            const updatedFiles = [...existingFiles, ...newFiles];
            setFieldValue(name, updatedFiles);
            e.target.value = '';

        }
        // console.log(values, 'values');
    };
    const removeFile = (fileId, name) => {
        setImage(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            const updatedFiles = prev.filter(f => f.id !== fileId);

            if (fileToRemove) {
                // Update form values
                const updatedImages = values.report?.findingImages?.filter(file => file !== fileToRemove.file) || [];
                setFieldValue(name, updatedImages);

                // Revoke object URL for videos to prevent memory leaks
                if (fileToRemove.type === 'video') {
                    URL.revokeObjectURL(fileToRemove.url);
                }
            }

            return updatedFiles;
        });
    };
    const getAiSuggestion = async () => {
        try {
            const formData = new FormData();
            // formData.append('findingimages', previewFiles);
            image?.forEach((image,) => {
                if (image?.file instanceof File) {
                    formData.append(`findingimages`, image?.file);
                }
            });
            const response = await getAiSuggestionsForMultipleImages(formData).unwrap();
            if (response) {
                // Update the form fields with AI suggestions
                if (section?.standardInfo?.possibleRootCauses) { setFieldValue(`${fieldBaseName}.standardInfo.possibleRootCauses`, response?.possibleRootCause || ''); }
                if (section?.standardInfo?.recommendations) { setFieldValue(`${fieldBaseName}.standardInfo.recommendations`, response?.recommendations || ''); }
                if (section?.standardInfo?.findings) { setFieldValue(`${fieldBaseName}.standardInfo.findings`, response?.findings || ''); }
            }


        } catch (error) {
            console.error("Error fetching AI suggestions for root causes:", error);
            toast.error(error?.data?.error || "Error fetching AI suggestions for root causes. Please try again.");
        }
    }

    // console.log(image, 'image')
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                    {/* Questions */}
                    {children}
                    {section?.standardInfo?.meterReadings && <MeterReadingsForm name={`${fieldBaseName}.standardInfo.meterReadings`} />}
                    {image.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Added Files:</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {image.map((file) => (
                                    <div key={file.id} className="relative group">
                                        <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                            {file.type === 'image' ? (
                                                <img
                                                    src={file.url}
                                                    alt={file.name}
                                                    className="w-full h-24 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="text-2xl mb-1">🎥</div>
                                                        <div className="text-xs text-gray-600 truncate px-1">
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Remove button */}
                                            <button
                                                type="button"
                                                onClick={() => removeFile(file.id, 'report.findingImages')}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <IoClose size={16} />
                                            </button>
                                        </div>

                                        {/* File name */}
                                        <div className="mt-1 text-xs text-gray-600 truncate">
                                            {file.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {section?.standardInfo?.findings && (
                        <div className="flex items-center gap-1 my-2">

                            <h3 className="font-semibold text-gray-800 mb-2">Findings:</h3>
                            <div className="flex relative items-center border  w-full rounded ">
                                <Field
                                    as='textarea'
                                    name={`${fieldBaseName}.standardInfo.findings`}
                                    placeholder="Text Area"
                                    className=' w-full rounded placeholder:items-center h-[100px]'
                                />


                                <label className="hover:bg-blue-600 focus:outline-none cursor-pointer p-1 text-2xl text-white text-center bg-[var(--defaultBlue)] rounded-md absolute right-1 top-1">
                                    <span><CiCamera /></span>
                                    <Field >
                                        {() => (
                                            <input
                                                multiple
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={(e) => handleFileChange(e, `report.findingImages`)}
                                            />
                                        )}
                                    </Field>
                                </label>
                            </div>
                        </div>
                    )}

                    {section?.standardInfo?.possibleRootCauses && (
                        <div className="flex relative items-center gap-1 my-2">
                            <h3 className="font-semibold text-gray-800 mb-2">Root Causes:</h3>
                            <Field
                                as='textarea'
                                name={`${fieldBaseName}.standardInfo.possibleRootCauses`}
                                placeholder="Enter root causes"
                                className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 h-[100px]"
                            />
                            {isLoading ? 'Loading...' : <AiSuggestButton onClick={getAiSuggestion} />}
                        </div>
                    )}

                    {section?.standardInfo?.recommendations && (
                        <div className="flex relative items-center gap-1 my-2">
                            <h3 className="font-semibold text-gray-800 mb-2">Recommendations:</h3>
                            <Field
                                as='textarea'
                                name={`${fieldBaseName}.standardInfo.recommendations`}
                                placeholder="Enter recommendations"
                                className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 h-[100px]"
                            />
                            {isLoading ? 'Loading...' : <AiSuggestButton onClick={getAiSuggestion} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AddFindingsRecommendation