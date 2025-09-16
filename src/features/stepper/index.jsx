import { useState } from 'react';
import LogoImage from '../../components/LogoImage';
import BackButton from './components/BackButton';
import StepIndicator from './components/StepIndicator';
import Title from '../../components/Title';
import StepForm from './StepForm';
import { stepContent } from '../../mock/data';
const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const handleContinue = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = (values) => {
        console.log(values, 'form values')
        handleContinue()
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    return (
        <div className="min-h-screen defaultGradient flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full h-full p-2 relative">
                <BackButton handleBack={handleBack} />
                <LogoImage />
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
                <Title
                    heading={stepContent[currentStep].heading}
                    description={stepContent[currentStep].description}
                />
                <StepForm onSubmit={handleSubmit} currentStep={currentStep} />
            </div>
        </div>
    )
}

export default Stepper