import { Form, Formik } from "formik"
import BasicInformation from "./components/BasicInformation"
import CustomButton from "../../components/CustomButton"
import { basicFormSchema } from "../../schemas/validations"
import License from "./components/License"
import Experience from "./components/Experience"
import UploadProfile from "./components/UploadProfile"

const StepForm = ({ onSubmit, currentStep }) => {
    const initialValues = {
        firstName: 'sarah',
        lastName: '',
        phoneNumber: '',
        primaryLocation: '',
        ptLicenseNumber: '',
        npiNumber: '',
        graduationYear: '',
        ptSchool: '',
        licenseFile: null,
        resumeFile: null,
        profilePhoto: null,
        yearsOfExperience: '',
        preferredSettings: '',
        professionalBio: '',

    }

    const showStep = () => {
        switch (currentStep) {
            case 1:
                return <BasicInformation />
            case 2:
                return <License />
            case 3:
                return <Experience />
            case 4:
                return <UploadProfile />
            default:
                return null
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        // validationSchema={basicFormSchema}
        >
            {
                () => (
                    <>
                        <Form className="space-y-2 max-w-md mx-auto">
                            {showStep()}
                            <CustomButton
                                variant='orange'
                                size='lg'
                                type='submit'
                            >
                                Continue
                            </CustomButton>
                        </Form>

                    </>
                )
            }


        </Formik>
    )
}

<Formik

>
    {
        () => (
            <Form>

            </Form>
        )
    }
</Formik>

export default StepForm