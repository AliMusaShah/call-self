import { Field } from "formik"
import FormErrorMessage from "../../../components/FormErrorMessage"
import FileUpload from "../../../components/FileUpload"

const License = () => {
    return (
        <>
            {/* PT License Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    PT License Number
                </label>
                <Field
                    type="text"
                    name="ptLicenseNumber"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="PT123456789"
                />
                <FormErrorMessage name="ptLicenseNumber" />
            </div>

            {/* NPI Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    NPI Number
                </label>
                <Field
                    type="text"
                    name="npiNumber"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="1234567890"
                />
                <FormErrorMessage name="npiNumber" />
            </div>

            {/* Graduation Year */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                </label>
                <Field
                    type="number"
                    name="graduationYear"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="2018"
                />
                <FormErrorMessage name="graduationYear" />
            </div>

            {/* PT School */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    PT School
                </label>
                <Field
                    type="text"
                    name="ptSchool"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="NYU School of Medicine - Physical Therapy Program"
                />
                <FormErrorMessage name="ptSchool" />
            </div>

            {/* Upload License */}
            <FileUpload
                name="licenseFile"
                label="Upload License"
            />

            {/* Upload Resume */}
            <FileUpload
                name="resumeFile"
                label="Upload Resume"
            />
        </>
    )
}

export default License