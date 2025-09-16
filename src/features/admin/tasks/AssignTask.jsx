import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import CustomButton from '../../../components/CustomButton';
import { assignTaskSchema } from '../../../schemas/validations';
import { Priority } from '../../../mock/data';
import CustomLoader from '../../../components/CustomLoader';
import { useAddAssignTaskMutation, useGetAllInspectionFormForDropDownQuery, useGetAllInspectionFormQuery, useGetAllInspectorsQuery } from '../../../api/apiSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AssignTask = () => {
    const { data: allInspectionForm, isLoading: formLoader } = useGetAllInspectionFormForDropDownQuery()
    const { data: allInspectors, isLoading: inspectorsLoader } = useGetAllInspectorsQuery()
    const [addAssignTask, { isLoading }] = useAddAssignTaskMutation()
    const navigate = useNavigate()
    const { state } = useLocation()
    const initialValues = {
        inspectorId: '',
        job_uid: state?.jobId,
        formId: '',
        priority: '',
        inspectionDate: '',
        notes: '',

    };
    // console.log(state, 'state ')

    const handleSubmit = async (values) => {
        // console.log(values, 'values')
        try {
            await addAssignTask(values).unwrap()
            toast.success("task has been assigned Successfully")
            navigate(-1)
        } catch (error) {
            // console.log(error?.data?.message)
            toast.error(error?.data?.message || "task assigned failed")

        }
    }
    return (
        <>
            {formLoader || inspectorsLoader ? <CustomLoader /> : (<div>
                <h1 className='text-2xl font-semibold'>Assign Task</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={assignTaskSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (


                        <Form  >




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                                <div className="space-y-2">
                                    <label className="text-gray-700">Select Inspector</label>

                                    <Field
                                        name="inspectorId"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                        placeholder="Select Inspector">
                                        <option value="" label="Select Inspector" />

                                        {allInspectors?.data?.users?.map((inspector, index) => (<option key={index} value={inspector?._id} label={inspector?.fullName} />))}


                                    </Field>
                                    <ErrorMessage
                                        name="inspectorId"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Priority</label>

                                    <Field
                                        name="priority"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        placeholder="Priority"
                                    >
                                        {Priority.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}


                                    </Field>
                                    <ErrorMessage
                                        name="priority"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-700">Form</label>

                                    <Field
                                        name="formId"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                    >
                                        <option value="" label="Select Form" />
                                        {allInspectionForm?.data?.map((form, index) => (<option key={index} value={form?._id} label={form?.title} />))}

                                    </Field>
                                    <ErrorMessage
                                        name="formId"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-gray-700">Inspection Date & Time</label>
                                    <Field
                                        name="inspectionDate"
                                        type="date"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    />
                                    <ErrorMessage
                                        name="inspectionDate"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>

                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Notes</label>
                                <Field
                                    name="notes"
                                    as='textarea'
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter notes"
                                />
                                <ErrorMessage
                                    name="notes"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>


                            <div className="flex justify-end my-5">
                                <CustomButton
                                    type="button"
                                    className="mr-4 px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                                >
                                    Cancel
                                </CustomButton>
                                <CustomButton
                                    type="submit"
                                    className="px-6 py-2 text-white bg-defaultGreen rounded-md"
                                    isLoading={isLoading}
                                >
                                    Save
                                </CustomButton>
                            </div>
                        </Form>

                    )}
                </Formik>
            </div>)
            }
        </>
    )
}

export default AssignTask