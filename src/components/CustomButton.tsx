import { CustomButtonProps } from "@/types";
import Link from "next/link";


const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    onClick,
    type = "button",
    variant = "default",
    size = "sm",
    disabled = false,
    to = null,
    className = "",
    isLoading = false,
}) => {
    const baseStyles = `rounded focus:outline-none transition duration-200 ease-in-out cursor-pointer ${className}`;
    const sizeClasses = {
        sm: ' py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: ' text-lg w-full',
    };

    const variantClasses = {
        normal: 'text-white border border-white rounded-xl p-2 ',
        default: 'bg-[var(--defaultOrange)] text-white',

    };

    const buttonClasses = ` ${baseStyles} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'
        }`;

    if (to === '-1') {
        // Back button functionality
        return (
            <button
                className={`flex items-center gap-2 ${buttonClasses}`}
                disabled={disabled}
            >
                {/* <img src={backIcon} alt="back-icon" className="w-[8px] h-[17px]" /> */}
                {/* <MdOutlineKeyboardBackspace color='white' size={22} /> */}
                <span>{children}</span>
            </button>
        );
    } else if (to) {
        // Link button functionality
        return (
            <Link href={to} className={buttonClasses}>
                {children}
            </Link>
        );
    } else {
        // Regular button functionality
        return (
            <button type={type} onClick={onClick} className={buttonClasses} disabled={disabled}>
                {/* {children} */}
                {isLoading ?
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div> : children}
            </button>
        );
    }
};



export default CustomButton;
