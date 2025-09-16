import { Field, FieldArray, useFormikContext } from "formik";
import { useState } from "react";
import { BiCamera } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useGetAiSuggestionsForMultipleImagesMutation } from "../../../api/apiSlice";
import AiSuggestButton from "../../../components/task/AiSuggestButton";
import { questionTypeMapping } from "../../../mock/data";

const QuestionsForPost = ({ data, findingIndex, finding }) => {

    const [previewFiles, setPreviewFiles] = useState([]);
    const { setFieldValue, values } = useFormikContext();
    const [getAiSuggestionsForMultipleImages, { isLoading }] = useGetAiSuggestionsForMultipleImagesMutation()

    // console.log(data, 'data in QuestionsForPost');
    // console.log(findingIndex, 'findingIndex in QuestionsForPost');
    // const handleFileChange = (e, fieldName, form) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         form.setFieldValue(fieldName, file);
    //     }
    // };
    const handleFileChange = (e, name) => {
        const file = e.target.files[0];
        // console.log(file, 'file');

        if (file) {
            // Get existing files or initialize empty array
            const existingFiles = values?.file_upload || [];

            // Add new file to the array
            const updatedFiles = [...existingFiles, file];

            // Store in a single array
            setFieldValue(name, updatedFiles);
        }
    };

    const getAiSuggestion = async (index) => {
        // console.log(previewFiles, 'previewFiles')
        try {
            const formData = new FormData();
            // formData.append('findingimages', previewFiles);
            previewFiles?.forEach((image,) => {
                if (image?.file instanceof File) {
                    formData.append(`findingimages`, image?.file);
                }
            });
            const response = await getAiSuggestionsForMultipleImages(formData).unwrap();
            if (response) {
                // Update the form fields with AI suggestions
                if (finding?.standardInfo?.possibleRootCause) { setFieldValue(`findings.${index}.standardInfo.possibleRootCause`, response?.possibleRootCause || ''); }
                if (finding?.standardInfo?.recommendations) { setFieldValue(`findings.${index}.standardInfo.recommendations`, response?.recommendations || ''); }
                if (finding?.standardInfo?.findings) { setFieldValue(`findings.${index}.standardInfo.findings`, response?.findings || ''); }
            }

        } catch (error) {
            console.error("Error fetching AI suggestions for root causes:", error?.data?.error);
            toast.error(error?.data?.error || "Error fetching AI suggestions for root causes. Please try again.");
        }
    }
    const handleMultipleFileChange = (event) => {
        const files = Array.from(event.target.files);

        // Get existing files from form state
        const existingImages = values.findingImages || [];

        // Process new files
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
                        setPreviewFiles(prev => [...prev, {
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

        // Add video previews immediately
        if (newPreviews.length > 0) {
            setPreviewFiles(prev => [...prev, ...newPreviews]);
        }

        // Update form values
        setFieldValue('findingImages', [...existingImages, ...newFiles]);

        // Clear the input
        event.target.value = '';
    };

    const removeFile = (fileId) => {
        setPreviewFiles(prev => {
            const fileToRemove = prev.find(f => f.id === fileId);
            const updatedFiles = prev.filter(f => f.id !== fileId);

            if (fileToRemove) {
                // Update form values
                const updatedImages = values.findingImages?.filter(file => file !== fileToRemove.file) || [];
                setFieldValue('findingImages', updatedImages);

                // Revoke object URL for videos to prevent memory leaks
                if (fileToRemove.type === 'video') {
                    URL.revokeObjectURL(fileToRemove.url);
                }
            }

            return updatedFiles;
        });
    };

    return (

        <>

            <FieldArray name={`findings.${findingIndex}.questions`}>
                {({ form }) => (
                    <div className="gap-1">
                        <div className="flex gap-2 mb-4">
                            <div className="">

                            </div>
                            <Field name={`findingImages`}>
                                {({ field, form }) => (
                                    <div className="space-y-3">
                                        <label className="cursor-pointer block">
                                            <div className="relative w-20 h-20 bg-[var(--defaultBlue)] rounded flex items-center justify-center hover:bg-opacity-80 transition-all duration-200 border-2 border-dashed border-transparent hover:border-blue-300">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleMultipleFileChange}
                                                    multiple
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <BiCamera size={24} className="text-white" />
                                            </div>
                                            {/* <span className="block text-xs text-gray-500 mt-1 text-center">Upload Image</span> */}
                                        </label>
                                        {field.value && (
                                            <div className="mt-2 text-sm text-gray-600">
                                                Selected: {field.value.name}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        {previewFiles.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Added Files:</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {previewFiles.map((file) => (
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
                                                    onClick={() => removeFile(file.id)}
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
                        {data?.map((question, questionIndex) => {
                            const type = questionTypeMapping[question?.type] || questionTypeMapping['default'];
                            const fieldBaseName = `findings.${findingIndex}.questions.${questionIndex}`;
                            // if (question?.type === "Multiple Choice") {
                            //     console.log(question, ' Multiple Choice')
                            // }

                            return (
                                <div key={questionIndex} className="mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">
                                        Question#{questionIndex + 1}: {question?.question}
                                    </h3>

                                    {/* Hidden field for question text */}
                                    <Field name={`${fieldBaseName}.question`}>
                                        {({ field, form }) => {
                                            if (!field.value) {
                                                form.setFieldValue(field.name, question?.question);
                                            }
                                            return <input {...field} type="hidden" value={question?.question} />;
                                        }}
                                    </Field>

                                    {question?.type === "Multiple Choice" ? (
                                        <div className="flex flex-col gap-2">
                                            <div>
                                                {question?.options}

                                                {/* it is message */}
                                            </div>
                                            {/* {question?.options?.map((option, optionIndex) => (
                                                <label key={optionIndex} className="inline-flex items-center">
                                                    <Field
                                                        type="radio"
                                                        name={`${fieldBaseName}.answer`}
                                                        value={option}
                                                        className="form-radio"
                                                    />
                                                    <span className="ml-2">{option}</span>
                                                </label>
                                            ))} */}
                                        </div>
                                    ) : question?.type === "File Upload" ? (
                                        <Field name={`${fieldBaseName}.answer`}>
                                            {({ field, form }) => (
                                                <div className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                    <label className="cursor-pointer block">
                                                        <span className="block mb-2">Upload Image</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange(e, `file_upload`)}
                                                            className="block w-full text-sm text-gray-500
                                                                 file:mr-4 file:py-2 file:px-4
                                                                 file:rounded-full file:border-0
                                                                 file:text-sm file:font-semibold
                                                                 file:bg-blue-50 file:text-blue-700
                                                                 hover:file:bg-blue-100"
                                                        />
                                                    </label>
                                                    {field.value && (
                                                        <div className="mt-2 text-sm text-gray-600">
                                                            Selected: {field.value.name || 'File selected'}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Field>
                                    ) : (
                                        <Field
                                            type={type}
                                            name={`${fieldBaseName}.answer`}
                                            placeholder="Enter your response"
                                            className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                </div>
                            );
                        })}

                        {/* Standard Info Fields */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="font-semibold text-gray-800 mb-4">Standard Information</h3>

                            {/* Findings Field */}
                            {finding?.standardInfo?.findings && <div className=" mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Findings
                                </label>
                                <div className="relative">
                                    <Field
                                        as="textarea"
                                        name={`findings.${findingIndex}.standardInfo.findings`}
                                        placeholder="Enter findings..."
                                        rows={3}
                                        className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                    />
                                    {isLoading ? 'Loading...' : <AiSuggestButton onClick={() => getAiSuggestion(findingIndex)} />}
                                </div>
                            </div>}

                            {/* Possible Root Causes Field */}
                            {finding?.standardInfo?.possibleRootCause && <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Possible Root Causes
                                </label>
                                <Field
                                    as="textarea"
                                    name={`findings.${findingIndex}.standardInfo.possibleRootCause`}
                                    placeholder="Enter possible root causes..."
                                    rows={3}
                                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                            </div>}

                            {/* Recommendations Field */}
                            {finding?.standardInfo?.recommendations && <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Recommendations
                                </label>
                                <Field
                                    as="textarea"
                                    name={`findings.${findingIndex}.standardInfo.recommendations`}
                                    placeholder="Enter recommendations..."
                                    rows={4}
                                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                />
                            </div>}
                        </div>
                    </div>
                )}
            </FieldArray>
            {/* <PostScopeOfWork values={values} /> */}
        </>
    );
};

export default QuestionsForPost;