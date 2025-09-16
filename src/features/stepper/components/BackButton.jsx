
const BackButton = ({ handleBack }) => {
    return (
        <button
            onClick={handleBack}
            className="absolute top-6 left-6 flex items-center text-[var(--defaultOrange)] transition-colors cursor-pointer"
        >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
        </button>
    )
}

export default BackButton