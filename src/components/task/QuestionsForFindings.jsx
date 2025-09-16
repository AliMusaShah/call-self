import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react'
import { questionTypeMapping } from '../../mock/data';

const QuestionsForFindings = ({ section, sectionIndex, findingIndex }) => {
    const { setFieldValue, values } = useFormikContext()

    // const handleFileChange = (e, name) => {
    //     const file = e.target.files[0];
    //     console.log(file, 'file');
    //     if (file) {
    //         setFieldValue(name, file);
    //     }
    // };
    const handleFileChange = (e, name) => {
        const file = e.target.files[0];
        // console.log(file, 'file');

        if (file) {
            // Get existing files or initialize empty array
            const existingFiles = values?.report?.file_upload || [];

            // Add new file to the array
            const updatedFiles = [...existingFiles, file];

            // Store in a single array
            setFieldValue(name, updatedFiles);
        }
    };
    const removeImage = (indexToRemove) => {
        const existingFiles = values?.report?.file_upload || [];
        const updatedFiles = existingFiles.filter((_, index) => index !== indexToRemove);
        setFieldValue('report.file_upload', updatedFiles);
    };


    // console.log(section, 'section');
    return (
        // <div className="gap-1">
        //     {section?.questions.map((item, questionIndex) => {
        //         const type = questionTypeMapping[item?.questionType] || questionTypeMapping['default'];

        //         // Find the specific finding in the findings array
        //         const fieldBaseName = `report.findings.${findingIndex}.questions.${questionIndex}`;

        //         return (
        //             <div key={questionIndex} className="mb-4">
        //                 <h3 className="font-semibold text-gray-800 mb-3">
        //                     {item?.questionText}
        //                 </h3>

        //                 {/* Hidden field for question text */}
        //                 <Field name={`${fieldBaseName}.question`}>
        //                     {({ field, form }) => {
        //                         if (!field.value) {
        //                             form.setFieldValue(field.name, item?.questionText);
        //                         }
        //                         return <input {...field} type="hidden" value={item?.questionText} />;
        //                     }}
        //                 </Field>

        //                 {item?.questionType === "Multiple Choice" ? (
        //                     <div className="flex gap-4">
        //                         {item?.options.map((option, optionIndex) => (
        //                             <label key={optionIndex} className="inline-flex items-center">
        //                                 <Field
        //                                     type="radio"
        //                                     name={`${fieldBaseName}.answer`}
        //                                     value={option}
        //                                     className="form-radio"
        //                                 />
        //                                 <span className="ml-2">{option}</span>
        //                             </label>
        //                         ))}
        //                     </div>
        //                 ) : item?.questionType === "File Upload" ? (
        //                     <label className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
        //                         <span>Upload Image</span>
        //                         <input
        //                             type="file"
        //                             className="sr-only"
        //                             accept="image/*"
        //                             onChange={(e) => handleFileChange(e, `${fieldBaseName}.answer`)}
        //                         />
        //                     </label>
        //                 ) : (
        //                     <Field
        //                         type={type}
        //                         name={`${fieldBaseName}.answer`}
        //                         placeholder="Enter your response"
        //                         className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                     />
        //                 )}
        //             </div>
        //         )
        //     })}
        // </div>
        <div className="gap-1">
            {section?.questions.map((item, questionIndex) => {
                const type = questionTypeMapping[item?.questionType] || questionTypeMapping['default'];

                // Find the specific finding in the findings array
                const fieldBaseName = `report.findings.${findingIndex}.questions.${questionIndex}`;

                return (
                    <div key={questionIndex} className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            {item?.questionText}
                        </h3>

                        {/* Hidden field for question text */}
                        <Field name={`${fieldBaseName}.question`}>
                            {({ field, form }) => {
                                if (!field.value) {
                                    form.setFieldValue(field.name, item?.questionText);
                                }
                                return <input {...field} type="hidden" value={item?.questionText} />;
                            }}
                        </Field>

                        {item?.questionType === "Multiple Choice" ? (
                            <div className="flex gap-4">
                                {item?.options.map((option, optionIndex) => (
                                    <label key={optionIndex} className="inline-flex items-center">
                                        <Field
                                            type="radio"
                                            name={`${fieldBaseName}.answer`}
                                            value={option}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">{option}</span>
                                    </label>
                                ))}
                            </div>
                        ) : item?.questionType === "File Upload" ? (
                            <label className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                                {/* <span>Upload Image</span> */}
                                <input
                                    type="file"
                                    // className="flex-1"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, `report.file_upload`)}
                                />

                            </label>
                        ) : (
                            <Field
                                type={type}
                                name={`${fieldBaseName}.answer`}
                                placeholder="Enter your response"
                                className="border p-2 w-full rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default QuestionsForFindings