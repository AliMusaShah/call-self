import { SiPolestar } from "react-icons/si";

const AiSuggestButton = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex justify-center items-center gap-1 cursor-pointer border bg-gray-100 text-[var(--defaultBlue)] p-1 border-[var(--defaultBlue)] rounded-md absolute right-1 top-1">
            <span><SiPolestar size={22} /></span>

            <p>AI Suggestions</p>
        </div>
    )
}

export default AiSuggestButton