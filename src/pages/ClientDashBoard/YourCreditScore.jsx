import { useAuth } from "../../AuthProvider/AuthProvider";
import ProgressBar from "../../hooks/ProgressBar"; 

// Sub-component: progress bar for each factor
const ProgressBar2 = ({ value, max, color }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

const YourCreditScore = () => {
  const { user } = useAuth();

  // Factors dynamically calculated from user financial info
  const factors = [
    {
      label: "Annual Income (FCFA)",
      value: user?.financialInfo?.annualIncome || 0,
      max: 100000, // Maximum expected value for scaling
      color: "#16A34A",
    },
    {
      label: "Electricity Bill (FCFA)",
      value: user?.financialInfo?.electricityBill || 0,
      max: 10000, // Scale appropriately
      color: "#2563EB",
    },
    {
      label: "Mobile Money Balance (FCFA)",
      value: user?.financialInfo?.mobileMoneyBalance || 0,
      max: 50000, // Scale appropriately
      color: "#4B1E2F",
    },
  ].map(factor => {
    // Convert actual value to 0-30 points scale for UI
    const points = Math.min(Math.round((factor.value / factor.max) * 30), 30);
    return { ...factor, value: points };
  });

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-medium md:text-[18px]">Your Credit Score</h3>
        <p className="md:text-sm text-xs text-zinc-600">Updated today</p>
      </div>

      {/* Body */}
      <div className="p-5 md:p-10">
        {/* Score Section */}
        <ProgressBar value={user?.financialInfo?.creditScore || 0} />
        <p className="text-center my-6 md:my-14 md:text-[16px] text-xs">
          Your credit score is in the excellent range. This indicates excellent
          creditworthiness.
        </p>
        <hr className="mb-6 md:mb-14 text-zinc-200" />

        {/* Factors */}
        <div className="text-primary">
          <h1 className="text-center md:text-xl font-medium mb-5 md:mb-10">
            Factors affecting your score
          </h1>

          <div className="space-y-6">
            {factors.map((factor, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <p className="md:text-sm text-xs font-medium text-gray-700">
                    {factor.label}
                  </p>
                  <p className="md:text-sm text-xs font-semibold text-gray-900">
                    {factor.value}/{30}
                  </p>
                </div>
                <ProgressBar2
                  value={factor.value}
                  max={30} // Scale for UI
                  color={factor.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCreditScore;
