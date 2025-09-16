import { useFormikContext } from "formik"
import FormErrorMessage from "./FormErrorMessage"
import { GrUpload } from "react-icons/gr";
import CustomButton from "./CustomButton";



const FileUpload = ({ name, label, }) => {

    const { setFieldValue, values, } = useFormikContext()

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setFieldValue(name, file)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        setFieldValue(name, file)
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                <span className="text-red-500">*</span>
            </label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById(name).click()}
            >
                <div className="flex flex-col items-center gap-3">
                    <p className=" text-gray-500">
                        Upload screenshots, emails, or other supporting documents
                    </p>
                    {/* <GrUpload color="#7A3FFD" size={20} /> */}
                    <CustomButton variant="normal" size="md" type="button" className="font-bold">
                        Choose Files
                    </CustomButton>
                    <p className="text-sm text-gray-600 mb-1">
                        {values[name] ? values[name].name : 'Click to upload or drag and drop'}
                    </p>

                </div>
            </div>
            <input
                id={name}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
            />
            <FormErrorMessage name={name} />
        </div>
    )
}

export default FileUpload