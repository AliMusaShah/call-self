import { Field } from 'formik'
import FormErrorMessage from '../../../components/FormErrorMessage'

const BasicInformation = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                    </label>
                    <Field
                        type="text"
                        name='firstName'
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                        placeholder="Sarah"
                    />
                    <FormErrorMessage name='firstName' />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                    </label>
                    <Field
                        type="text"
                        name='lastName'
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                        placeholder="Sarah"
                    />
                    <FormErrorMessage name='lastName' />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                </label>
                <Field
                    type="tel"
                    name='phoneNumber'
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Sarah"

                />
                <FormErrorMessage name='phoneNumber' />
            </div>

            {/* Primary Location */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Location
                </label>
                <Field
                    type="text"
                    name='primaryLocation'
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="Location"


                />
                <FormErrorMessage name='primaryLocation' />

            </div>
        </>
    )
}

export default BasicInformation