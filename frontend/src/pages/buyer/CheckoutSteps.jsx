import { LuCheck } from "react-icons/lu";

function CheckoutSteps({ currentStep }) {
    const steps = [
        { number: 1, label: "Order" },
        { number: 2, label: "Deliver" },
        { number: 3, label: "Payment" },
    ];

  return (
    <div className="flex justify-center items-center gap-4 mb-4 mt-5"> 
        {steps.map((step, index) => (
            <div key={step.number} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            currentStep === step.number 
                            ? "bg-green-600 text-white" 
                            : currentStep > step.number
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                        >   
                        {currentStep > step.number ? (
                            <LuCheck />
                        ) : (
                            step.number
                        )}
                    </div>
                    <span className="font-medium mt-1">
                        {step.label}
                    </span>
                </div>

                {index < steps.length - 1 && (
                    <div className="w-12 h-1 bg-gray-200 mx-2"/>
                )}
            </div>    
        ))}
    </div>
  )
}

export default CheckoutSteps;