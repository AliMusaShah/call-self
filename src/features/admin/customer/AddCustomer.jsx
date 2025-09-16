import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { addCustomerSchema } from '../../../schemas/validations';

const AddCustomer = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const initialValues = {
        customerName: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    };

    const handleSubmit = (values) => {
        console.log(values, 'values')
    }
    return (
        <div>
            <h1 className='text-2xl font-semibold'>Add Customer</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={addCustomerSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {() => (


                    <Form
                    // className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2"
                    >


                        <div className="space-y-2">
                            <label className="text-gray-700">Customer Name</label>
                            <Field
                                name="customerName"
                                type="text"
                                className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                placeholder="Enter First Name"
                            />
                            <ErrorMessage
                                name="customerName"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
                            <div className="space-y-2">
                                <label className="text-gray-700">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>



                            <div className="space-y-2">
                                <label className="text-gray-700">Phone</label>
                                <Field
                                    name="phone"
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter Phone Number"
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>


                            <div className="space-y-2 relative">
                                <label className="text-gray-700">Password</label>
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 top-3 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="h-5 w-5" />
                                    ) : (
                                        <AiOutlineEye className="h-5 w-5" />
                                    )}
                                </button>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-gray-700">Address</label>
                            <Field
                                name="address"
                                type="text"
                                className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                placeholder="Enter address"
                            />
                            <ErrorMessage
                                name="address"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
                            <div className="space-y-2">
                                <label className="text-gray-700">City</label>
                                <Field
                                    name="city"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="city"
                                />
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>



                            <div className="space-y-2">
                                <label className="text-gray-700">State</label>
                                <Field
                                    name="state"
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter state"
                                />
                                <ErrorMessage
                                    name="state"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>


                            <div className="space-y-2">
                                <label className="text-gray-700">Zip Code</label>
                                <Field
                                    name="zipCode"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter Zip Code"
                                />
                                <ErrorMessage
                                    name="zipCode"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end my-5">
                            <CustomButton
                                type="button"
                                className="mr-4 px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Clear
                            </CustomButton>
                            <CustomButton
                                type="submit"
                                className="px-6 py-2 text-white bg-defaultGreen rounded-md"
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

export default AddCustomer