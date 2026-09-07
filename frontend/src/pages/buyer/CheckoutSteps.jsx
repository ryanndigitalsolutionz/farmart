import { LuArrowLeft, LuCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function CheckoutSteps({ currentStep, onStepChange }) {
    const navigate = useNavigate();

    const steps = [
        { number: 1, label: "Order" },
        { number: 2, label: "Deliver" },
        { number: 3, label: "Payment" },
    ];

    const handleStepClick = (stepNumber) => {
        if (stepNumber <= currentStep) {
            onStepChange(stepNumber);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mb-6 mt-5">
            <div className="flex justify-center items-center gap-4">
                {steps.map((step, index) => {
                    const isCurrent = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    const isClickable = step.number <= currentStep;

                    return (
                        <div
                            key={step.number}
                            className="flex items-center gap-2"
                        >
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        isClickable &&
                                        handleStepClick(step.number)
                                    }
                                    disabled={!isClickable}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-0 transition-all duration-200 ${
                                        isCurrent
                                            ? "bg-green-600 text-white"
                                            : isCompleted
                                            ? "bg-green-600 text-white cursor-pointer hover:bg-green-700"
                                            : "bg-gray-200 text-gray-400 cursor-default"
                                    }`}
                                    aria-label={`Go to ${step.label}`}
                                    title={
                                        isClickable
                                            ? `Go to ${step.label}`
                                            : `${step.label} is not available yet`
                                    }
                                >
                                    {isCompleted ? (
                                        <LuCheck />
                                    ) : (
                                        step.number
                                    )}
                                </button>

                                <span
                                    className={`font-medium mt-1 ${
                                        isClickable
                                            ? "text-[var(--farm-text)]"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`w-12 h-1 mx-2 ${
                                        currentStep > step.number
                                            ? "bg-green-600"
                                            : "bg-gray-200"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() => navigate("/buyer/marketplace")}
                className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--farm-muted)] hover:text-[var(--farm-green-dark)] transition-colors duration-200"
            >
                <LuArrowLeft size={15} />
                Back to Marketplace
            </button>
        </div>
    );
}

export default CheckoutSteps;
