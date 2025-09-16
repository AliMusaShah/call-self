
import CustomButton from '../components/CustomButton';
import GoogleButton from '../components/GoogleButton';
import LogoImage from '../components/LogoImage';
import OrDivider from '../components/OrDivider';
import AuthSideBanner from '../features/auth/components/AuthSideBanner';
import TermsText from '../features/auth/components/TermsText';
const AuthLayout = ({ children }) => {
    return (
        <div className="grid grid-cols-12 gap-2 h-full">
            <div className='col-span-5'>
                <AuthSideBanner />
            </div>
            <div className='col-span-7 flex justify-center items-center'>
                <div className="min-h-screen  p-4 flex justify-center items-center w-full max-w-xl ">
                    <div className=" bg-white rounded-2xl shadow-lg p-8 space-y-4 w-full">
                        {/* Logo */}
                        <LogoImage />
                        {children}
                        <OrDivider />
                        <GoogleButton />
                        <TermsText />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AuthLayout