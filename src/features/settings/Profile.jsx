import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateProfileMutation } from '../../api/apiSlice'
import ProfileAvatar from '../../assets/profile.png'
import CustomButton from '../../components/CustomButton'
import { formatDateForInput } from '../../utils/Helper'
import { updateUser } from '../auth/slices/authSlice'
import { toast } from 'react-toastify'

const Profile = () => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateProfile] = useUpdateProfileMutation()
    const dispatch = useDispatch()

    const { user, } = useSelector((state) => state.auth)

    // console.log(user?.data, 'user')


    const initialValues = {
        fullName: user?.data?.user?.fullName || '',
        phone: user?.data?.user?.phone || '',
        gender: user?.data?.user?.gender || '',
        dateOfBirth: formatDateForInput(user?.data?.user?.dateOfBirth),
        address: user?.data?.user?.fullName || '',
        city: user?.data?.user?.city || '',
        state: user?.data?.user?.state || '',
        zipCode: user?.data?.user?.zipCode || '',

    };
    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // Store the selected image for later use
            setFieldValue('image', file); // Update Formik's state
            setImagePreviewUrl(URL.createObjectURL(file)); // Set the image preview
        }
    };
    const handleClear = (resetForm) => {
        resetForm();
        setImagePreviewUrl(ProfileAvatar); // Reset the image preview as well
    };
    const handleSubmit = async (values) => {
        // console.log(values, 'values')
        try {
            const formData = new FormData();
            formData.append('fullName', values.fullName);
            formData.append('phone', values.phone);
            formData.append('gender', values.gender);
            formData.append('dateOfBirth', values.dateOfBirth);
            formData.append('address', values.address);
            formData.append('city', values.city);
            formData.append('state', values.state);
            formData.append('zipCode', values.zipCode);
            formData.append('image', selectedImage);
            const response = await updateProfile(formData).unwrap()
            // 
            dispatch(updateUser(response))
            toast.success('Profile Updated Successfully')


        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message)
        }
    }

    // console.log(user?.data?.user, 'user')
    return (
        <div className="">
            <h2 className="text-2xl font-semibold mb-6">Profile</h2>
            <div className="flex flex-col sm:flex-row items-center mb-6">
                <img
                    src={imagePreviewUrl || user?.data?.user?.image || ProfileAvatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-full"
                />
                <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                    <h3 className="text-xl font-semibold">{user?.data?.user?.fullName}</h3>
                    <p className="text-gray-500">{user?.data?.user?.email}</p>
                    {/* <p className="text-gray-500">18:27 PM (GMT+00:00)</p> */}
                </div>
            </div>

            <Formik
                initialValues={initialValues}
                // validationSchema={ProfileSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ resetForm, setFieldValue, isSubmitting }) => (
                    <>
                        <div className="inline-flex gap-4 justify-center sm:justify-start">
                            <label className="p-2 text-white text-center bg-[var(--defaultBlue)] rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer">
                                <span>Upload</span>
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setFieldValue)} // Handle file input change with Formik
                                />
                            </label>

                        </div>
                        <Form className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">


                            <div className="space-y-2">
                                <label className="text-gray-700">Full Name</label>
                                <Field
                                    name="fullName"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter First Name"
                                />
                                <ErrorMessage
                                    name="fullName"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* <div className="space-y-2">
                                <label className="text-gray-700">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter Last Name"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div> */}



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
                            <div className="space-y-2">
                                <label className="text-gray-700">Date of Birth</label>
                                <Field
                                    name="dateOfBirth"
                                    type="date"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                />
                                <ErrorMessage
                                    name="dateOfBirth"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-700">Gender</label>
                                <Field
                                    as="select"
                                    name="gender"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                >
                                    <option value="" label="Select Gender" />
                                    <option value="Male" label="Male" />
                                    <option value="Female" label="Female" />
                                    <option value="Other" label="Other" />
                                </Field>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>



                            <div className="space-y-2">
                                <label className="text-gray-700">address</label>
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


                            <div className="space-y-2">
                                <label className="text-gray-700">City</label>
                                <Field
                                    name="city"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    placeholder="Enter City"
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
                                    type="text"
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
                                    placeholder="Enter zipCode"
                                />
                                <ErrorMessage
                                    name="zipCode"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            <div> </div>
                            <div> </div>

                            <div className="flex justify-end my-5">
                                <CustomButton
                                    type="button"
                                    className="mr-4 px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                                    onClick={() => handleClear(resetForm)}
                                >
                                    Clear
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
                    </>
                )}
            </Formik>
        </div>
    )
}

export default Profile