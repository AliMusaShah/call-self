import React from 'react'
import { allowableFileTypes } from '../../../mock/data';
import { Field } from 'formik';

const FileUploadField = ({ question, name, values, setFieldValue, index, questionIndex }) => {
    if (question?.questionType !== 'File Upload') {
        return null;
    }
    const currentFileTypes = values?.sections?.[index]?.questions?.[questionIndex]?.allowedFileTypes || [];

    const handleCheckboxChange = (fileType, isChecked) => {
        let updatedFileTypes;

        if (isChecked) {
            // Add to array if checked
            updatedFileTypes = [...currentFileTypes, fileType];
        } else {
            // Remove from array if unchecked
            updatedFileTypes = currentFileTypes.filter(type => type !== fileType);
        }

        setFieldValue(name, updatedFileTypes);
    };
    return (
        <div className="w-3/4">
            <label className="text-gray-700 text-lg font-semibold">Allowable File Types</label>
            <div className='flex gap-3'>
                {allowableFileTypes.map((fileType, index) => (
                    <>
                        <label className="text-gray-700">{fileType}</label>

                        <Field
                            key={index}
                            type="checkbox"
                            name={name}
                            checked={currentFileTypes.includes(fileType)}
                            onChange={(e) => handleCheckboxChange(fileType, e.target.checked)}
                            className=" border-gray-400 text-gray-700"
                        />
                    </>
                ))}
            </div>

        </div>
    )
}

export default FileUploadField