import { Field } from 'formik'
import React from 'react'

const BeforeScopeOfWork = ({ data }) => {
    // console.log(data, 'data in BeforeScopeOfWork')
    return (
        // <FieldArray name="report.ScopeOfWork">
        <div className='p-1 '>
            <h2 className="text-xl font-semibold text-gray-900 mt-5">Scope of Work</h2>

            <div className="bg-gray-50 rounded-lg p- space-y-4">
                {data?.length > 0 && (
                    data?.map((sow, index) => (
                        <div key={index} className="flex items-start justify-between gap-6 py-2 border-b border-gray-400">
                            {/* Displaying the text */}
                            <p className="text-gray-800 text-sm flex-1 leading-relaxed">{sow?.text}</p>

                            {/* Checkbox */}
                            <div className='flex-shrink-0 mt-0.5'>
                                <Field
                                    checked={sow?.isChecked}
                                    type="checkbox"
                                    className="w-5 h-5 text-blue-500 bg-white border-2 border-gray-300 rounded-sm "
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default BeforeScopeOfWork