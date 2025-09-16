import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomButton from "../../../components/CustomButton";
import { signUpSchema } from "../../../schemas/validations";

// import BackGroundImage from "../../../assets/backGroundImage.png"
import { useState } from "react";
import { useSignUpMutation } from "../../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [signUp, { isLoading }] = useSignUpMutation()
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (values) => {
        try {
            await signUp(values).unwrap();
            toast.success("Sign up successful!");
            navigate('/')
        } catch (error) {
            // console.error("Login failed:", error?.data?.data?.email || "An error occurred");
            toast.error(error?.data?.data?.email[0] || error?.data?.message || "An error occurred during sign up");

        }
    }

    return (
        <div className="">
            <div className={`pl-2 pt-2 pb-2 h-screen bg-[url('/backGroundImage.png')] bg-cover `}
            >
                <div className="">
                    <div className="h-screen flex justify-center items-center">
                        <div className="form w-[745px] p-14 bg-transparent border border-gray-200 rounded-lg shadow-md backdrop-blur-sm">
                            <div className="pb-8">
                                <h1 className="text-4xl font-[600] text-white">Sign Up</h1>
                                <p className="text-base font-normal text-white pt-2">
                                    Please enter your details.
                                </p>
                            </div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={signUpSchema}
                                onSubmit={handleSubmit}
                            >
                                {() => (
                                    <Form>
                                        <div className="mb-4">
                                            <p className="text-[var(--defaultDefaultGray)] text-base mb-2">
                                                Email
                                            </p>
                                            <Field
                                                name="email"
                                                type="email"
                                                className="border rounded-lg border-[#E9EAEB] w-full py-2 px-3 text-white bg-transparent focus:outline-transparent "
                                                placeholder="john@example.com"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <p className="text-[var(--defaultDefaultGray)] text-base mb-2">
                                                Name
                                            </p>
                                            <Field
                                                name="name"
                                                type="name"
                                                className="border rounded-lg border-[#E9EAEB] w-full py-2 px-3 text-white bg-transparent focus:outline-transparent "
                                                placeholder="Enter Name"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        <div className="mb-4 relative">
                                            <p className="text-[var(--defaultDefaultGray)] text-base mb-2">
                                                Password
                                            </p>
                                            <Field
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="border rounded-lg border-[#E9EAEB] w-full py-2 px-3 text-white pr-10 focus:outline-transparent placeholder:text-[#9EA2AD]"
                                                placeholder="********"
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                className="absolute top-[2.75rem] right-3 flex items-center cursor-pointer"

                                            >
                                                {showPassword ? <FaEyeSlash color="#ffff" /> : <FaEye color="#ffff" />}
                                            </span>
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* <div className="flex justify-end">


                                        </div> */}


                                        <CustomButton
                                            type="submit"
                                            size='lg'

                                        >
                                            {isLoading ? "loading" : "Sign Up"}
                                        </CustomButton>

                                    </Form>
                                )}
                            </Formik>

                            <CustomButton to={'/'} variant='normal' >
                                <span className='text-[var(--defaultDefaultGray)] mx-2'>Already have an account?</span >log In
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp