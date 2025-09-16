
const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="text-center mb-2">
            <span className="text-gray-400 text-sm">{currentStep} / {totalSteps}</span>
        </div>
    )
}

export default StepIndicator