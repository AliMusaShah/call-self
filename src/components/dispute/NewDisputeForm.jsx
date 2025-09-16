import { Field, Form, Formik } from "formik"
import FormErrorMessage from "../FormErrorMessage"
import CustomButton from "../CustomButton"
import FileUpload from "../FileUpload"
import CustomCardHeader from "../CustomCardHeader"

const NewDisputeForm = () => {

    const initialValues = {
        shift: '',
        issueType: '',
        disputeTitle: '',
        description: ''
    }

    const handleSubmit = (values) => {
        console.log(values, 'values')
    }
    return (
        <>
            <div className="w-2/3  bg-white p-3">
                <CustomCardHeader title={'Recent Feedback'} text={`Latest reviews from clinics`} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                // validationSchema={loginSchema}

                >

                    {
                        () => (

                            <Form className="space-y-3">

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Shift</label>
                                    <Field
                                        as='select'
                                        name='shift'
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"

                                    >
                                        <option selected disabled>Choose the shift related to your dispute</option>
                                    </Field>
                                    <FormErrorMessage name="shift" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                                    <Field
                                        as='select'
                                        name='issueType'
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"

                                    >
                                        <option>Choose the shift related to your dispute</option>
                                    </Field>
                                    <FormErrorMessage name="issueType" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Title</label>
                                    <Field

                                        name='disputeTitle'
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"

                                    />

                                    <FormErrorMessage name="disputeTitle" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <Field
                                        name='description'
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    />
                                    <FormErrorMessage name="description" />
                                </div>
                                <FileUpload label={'Supporting Documents'} name={'documents'} />
                                {/* Continue Button */}
                                <CustomButton size='lg' variant='orange' type="submit"
                                    className=""
                                >    Submit Dispute
                                </CustomButton>
                            </Form>
                        )
                    }
                </Formik>
            </div>

        </>
    )
}

export default NewDisputeForm