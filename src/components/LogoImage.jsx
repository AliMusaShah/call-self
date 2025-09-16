import Logo from '../assets/images/logo.png';

const LogoImage = () => {
    return (
        <div className="flex items-center justify-center mb-8">
            <img
                src={Logo}
                width={250}
                height={500}
                alt="Picture of the Logo"
            />
        </div>
    )
}

export default LogoImage