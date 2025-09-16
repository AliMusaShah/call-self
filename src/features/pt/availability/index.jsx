import { Field, Form, Formik } from "formik"
import CustomButton from "../../../components/CustomButton"
import TitleComponent from "../../../components/dashboard/shift/TitleComponnet"
import { AddAvailabilitySchema } from "../../../schemas/validations";
import FormErrorMessage from "../../../components/FormErrorMessage";

const AddAvailability = () => {

    const initialValues = {
        startTime: '',
        endTime: '',
        date: '',
        repeat: '',
        note: ''
    };
    const onSubmit = (values) => {
        console.log('Form submitted:', values);
    };
    return (
        <>
            <div className='flex items-center '>
                <CustomButton
                    to={'-1'}
                >
                </CustomButton>
                <TitleComponent title="Add Availability" />
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={AddAvailabilitySchema}
            >
                {
                    () => (
                        <>
                            <Form className="space-y-6 bg-white p-6 rounded-lg shadow-md mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Start Time</label>
                                        <Field
                                            name="startTime"
                                            label="Start Time"
                                            type='time'
                                            placeholder="Select start time"
                                            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none "
                                        />
                                        <FormErrorMessage name='startTime' />
                                    </div>
                                    <div>
                                        <label>End Time</label>
                                        <Field
                                            name="endTime"
                                            label="End Time"
                                            type='time'
                                            placeholder="Select End time"
                                            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none "
                                        />
                                        <FormErrorMessage name='endTime' />
                                    </div>


                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Date</label>
                                        <Field
                                            name="date"
                                            type="date"
                                            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none "
                                        />
                                        <FormErrorMessage name='date' />

                                    </div>
                                    <div>
                                        <label>Repeat</label>
                                        <Field
                                            name="repeat"
                                            className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none "
                                        />
                                        <FormErrorMessage name='repeat' />

                                    </div>


                                </div>
                                <div>
                                    <label>Notes</label>
                                    <Field
                                        name="note"
                                        type="note"
                                        as="textarea"
                                        rows={4}
                                        placeholder="Add any additional notes here..."
                                        className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none "
                                    />
                                    <FormErrorMessage name='note' />

                                </div>
                                <div className="flex gap-3">

                                    <CustomButton
                                        variant="normal"
                                        size="lg"
                                        type="button"
                                    >
                                        Cancel
                                    </CustomButton>
                                    <CustomButton
                                        variant="orange"
                                        size="lg"
                                        type="submit"
                                    >
                                        Cancel
                                    </CustomButton>
                                </div>
                            </Form>
                        </>
                    )
                }
            </Formik>
        </>
    )
}

export default AddAvailability