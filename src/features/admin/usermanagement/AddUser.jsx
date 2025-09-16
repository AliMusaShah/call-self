import React, { useState } from 'react'
import { Priority, role } from '../../../mock/data'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';
import { adduserValidationSchema, } from '../../../schemas/validations';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAddUserMutation, useGetAllZuperCustomersForDropdownQuery, useGetUserByIdQuery, useUpdateUserMutation } from '../../../api/apiSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CustomLoader from '../../../components/CustomLoader';

const AddUser = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [addUser] = useAddUserMutation()
    const { id } = useParams()
    const { data: userDetail, isLoading: detailLoader } = useGetUserByIdQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: !id
    })

    const { data: zuperCustomers, isLoading: customersLoader } = useGetAllZuperCustomersForDropdownQuery()
    const [updateUser] = useUpdateUserMutation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const initialValues = {
        fullName: userDetail?.data?.fullName || '',
        email: userDetail?.data?.email || '',
        role: userDetail?.data?.role || '',
        password: '',
        ...(userDetail?.data?.role === 'customer' && {
            customer_uid: userDetail?.data?.customer_uid || ''
        })

    };
    const handleCustomerChange = (e, setFieldValue, values) => {
        const selectedCustomerUid = e.target.value;

        if (values.role !== 'customer') {
            return;
        }
        const selectedCustomer = zuperCustomers?.data?.data?.find(
            customer => customer.customer_uid === selectedCustomerUid
        );

        const fullName = selectedCustomer.customer_first_name + selectedCustomer.customer_last_name
        setFieldValue('customer_uid', selectedCustomerUid);
        if (selectedCustomer) {
            setFieldValue('fullName', fullName || '');
            setFieldValue('email', selectedCustomer.customer_email || '');
        }
    }
    const handleRoleChange = (e, setFieldValue, values) => {
        const selectedRole = e.target.value;

        console.log(selectedRole, 'selectedRole')
        setFieldValue('role', selectedRole);

        // Use selectedRole instead of values.role since setFieldValue is async
        if (selectedRole === 'inspector') {
            // Also clear the name and email if they were auto-filled from customer selection
            setFieldValue('fullName', '');
            setFieldValue('email', '');
        }
    }
    const handleSubmit = async (values) => {
        // console.log(values, 'values')
        const payload = { ...values };
        if (values.role === 'inspector') {
            delete payload.customer_uid;
        }

        console.log(payload, 'final payload')
        try {
            if (id) {
                await updateUser({ id: id, payload }).unwrap()
                navigate(-1)
            } else {
                await addUser(payload).unwrap()
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || 'something went wrong')
        }
    }

    const isLoading = detailLoader || customersLoader
    // console.log(zuperCustomers?.data?.data, 'zuperCustomers')
    return (
        <>
            {isLoading ? <CustomLoader /> : (<div>
                <h1 className='text-2xl font-semibold my-2'>Add New User</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={adduserValidationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form className='space-y-5'>
                            {values?.role === 'customer' && <div className="space-y-2">
                                <label className="text-gray-700">Selct Customer</label>
                                <Field
                                    name="customer_uid"
                                    as="select"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    onChange={(e) => handleCustomerChange(e, setFieldValue, values)}
                                >
                                    <option value="" disabled>Select</option>
                                    {zuperCustomers?.data?.data.map((item, index) => <option
                                        key={index}
                                        value={item?.customer_uid}
                                        label={item?.customer_first_name}

                                    />)}
                                </Field>
                                <ErrorMessage
                                    name="customer_uid"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>}
                            <div className="space-y-2">
                                <label className="text-gray-700">Full Name</label>
                                <Field
                                    name="fullName"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                    placeholder="Enter Full Name "
                                    type=''
                                />
                                <ErrorMessage
                                    name="fullName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                />

                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Role</label>
                                <Field
                                    name="role"
                                    as="select"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    onChange={(e) => handleRoleChange(e, setFieldValue, values)}


                                >
                                    <option value="" disabled>Select</option>
                                    {role.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                </Field>
                                <ErrorMessage
                                    name="role"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <p className="text-lightBlue text-base mb-2">
                                    Password
                                </p>
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="border rounded-lg border-[#A2A1A833] w-full py-2 px-3 text-gray-700 pr-10 focus:outline-lightBlue"
                                    placeholder="********"
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute top-[2.75rem] right-3 flex items-center cursor-pointer"

                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                <ErrorMessage
                                    name="password"
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
                                    isLoading={isSubmitting}
                                >
                                    Save
                                </CustomButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>)}
        </>
    )
}

export default AddUser