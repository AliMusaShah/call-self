import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CustomButton from '../../components/CustomButton';
import { useUpdatePasswordMutation } from '../../api/apiSlice';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updatePassword] = useUpdatePasswordMutation()
    const initialValues = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };

    const handleSubmit = async (values) => {
        // console.log(values, 'values')
        try {
            await updatePassword(values).unwrap()
            toast.success('password updated successfullly')
        } catch (error) {
            // console.log(error?.data?.message)
            toast.error(error?.data?.message || 'An error occurred while updating the password')

        }
    }
    return (
        <div className="max-w-lg ">
            <h3 className="text-xl font-semibold mb-4">Update Password</h3>
            <Formik
                initialValues={initialValues}
                // validationSchema={PasswordUpdateSchema}
                onSubmit={handleSubmit}
            >
                {({ resetForm, isSubmitting }) => (
                    <Form className="space-y-4">
                        <div className="relative">
                            <label className="text-gray-700">Old Password</label>
                            <Field
                                name="currentPassword"
                                type={showOldPassword ? 'text' : 'password'}

                                className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                placeholder="Enter Old Password"
                            />
                            <ErrorMessage
                                name="currentPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <span
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute top-9 right-3 flex items-center cursor-pointer"
                            >
                                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative">
                            <label className="text-gray-700">New Password</label>
                            <Field
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                placeholder="Enter New Password"
                            />
                            <ErrorMessage
                                name="newPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <span
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute top-9 right-3 flex items-center cursor-pointer"
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative">
                            <label className="text-gray-700">Confirm Password</label>
                            <Field
                                name="confirmNewPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                placeholder="Enter Confirm Password"
                            />
                            <ErrorMessage
                                name="confirmNewPassword"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute top-9 right-3 flex items-center cursor-pointer"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <CustomButton
                                type="button"
                                className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                                onClick={() => resetForm()}
                            >
                                Cancel
                            </CustomButton>
                            <CustomButton
                                type="submit"
                                className="px-6 py-2 bg-defaultGreen  text-white rounded-md hover:bg-teal-600"
                                isLoading={isSubmitting}
                            >
                                Save
                            </CustomButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UpdatePassword