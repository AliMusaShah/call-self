import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCustomerQuery, useGetCertificateByIdQuery, useUpdateCertificateMutation } from '../../../api/apiSlice';
import CustomButton from '../../../components/CustomButton';
import CustomLoader from '../../../components/CustomLoader';
import { certificateType, ratingType } from '../../../mock/data';
import { certificateValidationSchema, } from '../../../schemas/validations';

const EditCertificate = () => {
    const { data: customers, isLoading } = useGetAllCustomerQuery()
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: certificateDetail, isLoading: detailLoader } = useGetCertificateByIdQuery(id, {
        refetchOnMountOrArgChange: true,
    })
    const [UpdateCertifica] = useUpdateCertificateMutation()

    const initialValues = {
        customer_uid: certificateDetail?.data?.customer_uid || '',
        certificateType: certificateDetail?.data?.certificateType || '',
        ratingType: certificateDetail?.data?.ratingType || '',
        currentRating: certificateDetail?.data?.currentRating || '',
        expiredDate: certificateDetail?.data?.expiredDate ? new Date(certificateDetail?.data?.expiredDate).toISOString().split('T')[0] : '',
    };

    const handleSubmit = async (values) => {
        try {
            await UpdateCertifica({ id: id, payload: values }).unwrap()
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(certificateDetail?.data, 'certificateDetail')

    return (
        <>
            {isLoading || detailLoader ? <CustomLoader /> : (<div>
                <h1 className='text-2xl font-semibold my-2'>Add New Certificate</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={certificateValidationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ isSubmitting, dirty }) => (
                        <Form className='space-y-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                                <div className="space-y-2">
                                    <label className="text-gray-700">Select Customer</label>
                                    <Field
                                        name="customer_uid"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        {customers?.data?.data.map((item, index) => <option key={index} value={item?.customer_uid} label={item?.customer_first_name} />)}
                                    </Field>
                                    <ErrorMessage
                                        name="customer_uid"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Certificate Type</label>
                                    <Field
                                        name="certificateType"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    >
                                        <option value={certificateDetail?.data?.customer?.data?.customer_uid} >{certificateDetail?.data?.customer?.data?.customer_first_name} </option>
                                        {certificateType.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                    </Field>
                                    <ErrorMessage
                                        name="certificateType"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Rating Type</label>
                                    <Field
                                        name="ratingType"
                                        as="select"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400  text-gray-700"
                                    >
                                        <option value="" disabled>Select</option>
                                        {ratingType.map((item, index) => <option key={index} value={item?.value} label={item?.label} />)}
                                    </Field>
                                    <ErrorMessage
                                        name="ratingType"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Current Rating</label>
                                    <Field
                                        name="currentRating"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                        placeholder="Enter Discount Percentage "
                                        type='number'
                                    />
                                    <ErrorMessage
                                        name="currentRating"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-700">Expired Date</label>
                                    <Field
                                        name="expiredDate"
                                        className="w-full px-4 py-2 rounded-md border  border-gray-400 text-gray-700"
                                        placeholder="Enter Discount Percentage "
                                        type='date'
                                    />
                                    <ErrorMessage
                                        name="expiredDate"
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
                                    Cancel
                                </CustomButton>
                                <CustomButton
                                    type="submit"
                                    className="px-6 py-2 text-white bg-defaultGreen rounded-md"
                                    disabled={!dirty}
                                >
                                    {isSubmitting ? 'loading' : ' Update'}
                                </CustomButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>)}

        </>
    )
}

export default EditCertificate