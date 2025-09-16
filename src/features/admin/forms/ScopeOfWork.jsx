import { Field, FieldArray } from 'formik'
import React from 'react'
import { FiTrash } from 'react-icons/fi'
import CustomButton from '../../../components/CustomButton'

const ScopeOfWork = ({ values }) => {
    return (
        <FieldArray name="ScopeOfWork">
            {({ remove: removeSOW, push: addSOW }) => (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Scope of Work</h2>
                    {values.ScopeOfWork.length > 0 && (
                        values.ScopeOfWork.map((work, index) => (
                            <div key={index} className=" flex items-center mb-2 gap-2">
                                <div className='w-full'>
                                    <label>{`SOW  ${index + 1}`}</label>
                                    <Field name={`ScopeOfWork.${index}.text`}
                                        type="text"
                                        className="px-4 py-2  rounded-md border w-full border-gray-400 text-gray-700"
                                        placeholder="Enter Scope Of Work"
                                    />
                                </div>
                                {values.ScopeOfWork.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSOW(index)}
                                        className="mt-4 bg-red-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-red-600"
                                    >
                                        <FiTrash />
                                    </button>
                                )}
                            </div>
                        ))
                    )}

                    <CustomButton
                        size='md'
                        type="button"
                        onClick={() => addSOW({ text: '' })}
                    >
                        + Add Scope of Work
                    </CustomButton>
                </div>
            )}
        </FieldArray>
    )
}

export default ScopeOfWork