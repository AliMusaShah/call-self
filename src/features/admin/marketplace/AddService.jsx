import React from 'react'
import { Priority } from '../../../mock/data'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';
import { serviceValidationSchema } from '../../../schemas/validations';
import { useAddMarketPlaceServiceMutation, useGetMasterPlaceByIdQuery, useUpdateMarketPlaceMutation } from '../../../api/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomLoader from '../../../components/CustomLoader';

const AddService = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const serviceId = state?.serviceId || state;
    const [addMarketPlaceService,] = useAddMarketPlaceServiceMutation()
    const { data: serviceDetail, isLoading, isFetching } = useGetMasterPlaceByIdQuery(serviceId, {
        skip: !serviceId,
        refetchOnMountOrArgChange: true,
    })
    const [updateMarketPlace] = useUpdateMarketPlaceMutation()
    const marketPlaces = serviceDetail?.data?.marketPlaces;


    // console.log(marketPlaces, 'marketPlaces')

    const initialValues = {
        serviceName: marketPlaces?.serviceName || '',
        category: marketPlaces?.category || '',
        status: marketPlaces?.status || '',
        basePrice: marketPlaces?.basePrice || '',
        discountType: marketPlaces?.discountType || '',
        discountPercentage: marketPlaces?.discountPercentage || '',
        taxClass: marketPlaces?.taxClass || '',
        VATAmount: marketPlaces?.VATAmount || '',
        description: marketPlaces?.description || '',


    };

    const handleSubmit = async (values) => {
        try {
            if (serviceId) {
                await updateMarketPlace({ id: serviceId, payload: values }).unwrap()
                navigate(-1)
            } else {
                await addMarketPlaceService(values).unwrap()
                navigate(-1)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || 'something went wrong')
        }
    }
    return (
        <>
            {isLoading || isFetching ? <CustomLoader /> : (
                <>
                    <h1 className='text-2xl font-semibold my-2'>Add New Service</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={serviceValidationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ isSubmitting }) => (
                            <Form className='space-y-5'>
                                <div className="">
                                    <label className="text-gray-700">Service Name</label>
                                    <Field
                                        name="serviceName"
                                        type='text'
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        placeholder="Enter Service Name"
                                    />
                                    <ErrorMessage
                                        name="serviceName"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                                    <div className="space-y-2">
                                        <label className="text-gray-700">category</label>

                                        <Field
                                            name="category"
                                            as="select"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                            placeholder="Select Inspector">
                                            <option value="" label="Select Inspector" />
                                            <option value="Inspector 1" label="Inspector 1" />
                                            <option value="Inspector 2" label="Inspector 2" />

                                        </Field>
                                        <ErrorMessage
                                            name="category"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-700">status</label>

                                        <Field
                                            name="status"
                                            as="select"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        >
                                            {Priority.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                        </Field>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>





                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Base Price</label>
                                    <Field
                                        name="basePrice"
                                        type="number"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    />
                                    <ErrorMessage
                                        name="basePrice"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                                    <div className="space-y-2">
                                        <label className="text-gray-700">Discount Type</label>
                                        <Field
                                            name="discountType"
                                            as="select"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        >
                                            {Priority.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                        </Field>
                                        <ErrorMessage
                                            name="discountType"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-700">Discount Percentage (%)</label>
                                        <Field
                                            name="discountPercentage"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                            placeholder="Enter Discount Percentage "
                                            type='number'
                                        />
                                        <ErrorMessage
                                            name="discountPercentage"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-700">Tax Class</label>
                                        <Field
                                            name="taxClass"
                                            as="select"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        >
                                            {Priority.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                        </Field>
                                        <ErrorMessage
                                            name="taxClass"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-gray-700">VAT Amount (%)</label>
                                        <Field
                                            name="VATAmount"
                                            className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                            placeholder="Enter Discount Percentage "
                                            type='number'
                                        />
                                        <ErrorMessage
                                            name="VATAmount"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">description</label>
                                    <Field
                                        name="description"
                                        as='textarea'
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                        placeholder="Enter description"
                                    />
                                    <ErrorMessage
                                        name="description"
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
                                    >
                                        {isSubmitting ? 'loading' : 'Save'}
                                    </CustomButton>
                                </div>
                            </Form>

                        )}
                    </Formik>
                </>
            )}

        </>
    )
}

export default AddService