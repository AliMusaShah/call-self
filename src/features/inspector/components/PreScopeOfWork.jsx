import { Field, FieldArray } from 'formik'
import React from 'react'

const PreScopeOfWork = ({ values }) => {
    return (
        <FieldArray name="report.selectedScope">
            {() => (
                <div className=' mx-auto p-8 '>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Scope of Work</h2>

                    <div className="bg-gray-50 rounded-lg p- space-y-4">
                        {values?.report?.selectedScope?.length > 0 && (
                            values?.report?.selectedScope?.map((sow, index) => (
                                <div key={index} className="flex items-start justify-between gap-6 py-2 border-b border-gray-400">
                                    {/* Displaying the text */}
                                    <p className="text-gray-800 text-sm flex-1 leading-relaxed">{sow?.text}</p>

                                    {/* Checkbox */}
                                    <div className='flex-shrink-0 mt-0.5'>
                                        <Field
                                            name={`report.selectedScope.${index}.isChecked`}
                                            type="checkbox"
                                            className="w-5 h-5 text-blue-500 bg-white border-2 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 cursor-pointer hover:border-blue-400 transition-colors"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </FieldArray>
    )
}

export default PreScopeOfWork