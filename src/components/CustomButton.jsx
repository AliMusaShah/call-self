import { Link, useNavigate } from 'react-router-dom';
import backIcon from "../assets/backicon.png";

const CustomButton = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'sm',
    disabled = false,
    to = null, // if `to` is provided, it behaves like a LinkButton
    className = '',
    isLoading = false
}) => {
    const navigate = useNavigate();
    const baseStyles = `rounded focus:outline-none transition duration-200 ease-in-out ${className}`;
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 my-3 text-lg w-full',
    };

    const variantClasses = {
        normal: 'text-[var(--defaultBlue)] ',
        cross: 'text-black ',
        primary: 'bg-[var(--defaultBlue)] text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        edit: 'bg-[#0D0D0CCC] text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        green: 'bg-[#27AE60] text-white hover:bg-gray'
    };

    const buttonClasses = ` ${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'
        }`;

    if (to === '-1') {
        // Back button functionality
        return (
            <button
                onClick={() => navigate(-1)}
                className={`flex items-center gap-2 ${buttonClasses}`}
                disabled={disabled}
            >
                <img src={backIcon} alt="back-icon" className="w-[8px] h-[17px]" />
                <span>{children}</span>
            </button>
        );
    } else if (to) {
        // Link button functionality
        return (
            <Link to={to} className={buttonClasses}>
                {children}
            </Link>
        );
    } else {
        // Regular button functionality
        return (
            <button type={type} onClick={onClick} className={buttonClasses} disabled={disabled}>
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : children}
            </button>
        );
    }
};



export default CustomButton;
