import { ErrorMessage } from "formik"

const FormErrorMessage = ({ name }) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className="text-red-500 text-sm"
        />
    )
}

export default FormErrorMessage