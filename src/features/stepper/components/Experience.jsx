import { Field } from 'formik'
import React from 'react'
import FormErrorMessage from '../../../components/FormErrorMessage'
import { preferredSettings } from '../../../mock/data'

const Experience = () => {

    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                </label>
                <Field
                    type="number"
                    name="yearsOfExperience"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="2018"
                />
                <FormErrorMessage name="yearsOfExperience" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                </label>
                <Field
                    as='select'
                    name="preferredSettings"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"

                >
                    {preferredSettings.map((item, index) => (<option key={index} value={item}>{item}</option>))}

                </Field>
                <FormErrorMessage name="preferredSettings" />
            </div>
            <div>
                <label htmlFor="professionalBio" className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio (Optional)
                </label>
                <Field
                    as="textarea"
                    id="professionalBio"
                    name="professionalBio"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    placeholder="Tell us about your experience and specialties..."
                />
                <FormErrorMessage name="preferredSettings" />
            </div>
        </>
    )
}

export default Experience