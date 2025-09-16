import { Formik, Field, Form, ErrorMessage } from 'formik';
import CustomButton from '../../../components/CustomButton'
// import { forgotPasswordSchema } from '../../../validations/validationSchema';
import SideBanner from '../../../assets/sideBanner.png';
import CustomImage from '../../../components/CustomImage';
import { useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '../../../api/apiSlice';
// import { useForgetPasswordMutation } from '../../../api/apiSlice';


const ForgetPasswordPage = () => {
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            await forgetPassword(values).unwrap()
            navigate('/verify-otp', { state: { email: values?.email } })
        } catch (error) {
            console.log(error, 'error')
            // toast.error(error?.data?.message || 'OTP sent successfully!');
        }

    };

    return (
        <div className="pl-2 pt-2 pb-2 h-screen">
            <div className="grid grid-cols-12 gap-2 h-full">
                <div className="col-span-6 h-full overflow-hidden">
                    <CustomImage src={SideBanner} />

                </div>
                <div className="col-span-6 flex justify-center items-center">
                    <div className="form w-[445px]">
                        <CustomButton to='-1' variant='normal'>
                            Back
                        </CustomButton>
                        <h1 className="text-3xl font-[600]">
                            Forgot Password
                        </h1>
                        <p className="text-base font-normal text-[#A2A1A8] py-2 my-2">
                            Enter your registered email address. We’ll send you a code to reset your password.
                        </p>
                        <Formik
                            // validationSchema={forgotPasswordSchema}
                            initialValues={{ email: '' }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="mb-4">
                                    <p className="text-defaultGreen  text-base mb-2">
                                        Email
                                    </p>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="border rounded-lg border-[#A2A1A833] w-full py-2 px-3 text-gray-700 focus:outline-lightBlue"
                                        placeholder="john@example.com"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div>
                                    <CustomButton
                                        type='submit'
                                        size='lg'
                                        isLoading={isLoading}

                                    >
                                        Sent Otp
                                    </CustomButton>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
