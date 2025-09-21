import { ChartColumn, CreditCard, DollarSign } from "lucide-react";
import { useAuth } from "../../AuthProvider/AuthProvider";

const icons = {
  DollarSign,
  CreditCard,
  ChartColumn,
};

const FinancialSummary = () => {
  const { user } = useAuth();


  const financialDatas = [
    {
      icon: "DollarSign",
      iconBg: "#039B0633",
      iconColor: "#039B06",
      title: "Annual Income",
      amount: `FCFA ${user?.financialInfo?.annualIncome}`,
    },
    {
      icon: "CreditCard",
      iconBg: "#4B1E2F33",
      iconColor: "#4B1E2F",
      title: "Value of Land ownership",
      amount: `FCFA ${user?.financialInfo?.landValue}`,
    },
    {
      icon: "ChartColumn",
      iconBg: "#E0AB0B33",
      iconColor: "#E0AB0B",
      title: "Debt-to-Income Ratio",
      amount: "17/17",
    },
  ];

  return (
    <div className="border border-zinc-200 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="flex items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-medium text-[18px]">Financial Summary</h3>
      </div>

      <div className="md:m-6 m-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {financialDatas.map((data, idx) => {
          const Icon = icons[data.icon];
          return (
            <div
              key={idx}
              className="bg-[#F9FAFB] flex items-center gap-3 border border-zinc-200 p-3 md:p-5 rounded-xl"
            >
              <div
                  className="flex items-center justify-center rounded-full w-10 h-10 md:w-13 md:h-13"
                  style={{ backgroundColor: data.iconBg }}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6"
                    color={data.iconColor}
                  />
                </div>
              <div>
                <h1 className="text-sm text-gray-600">{data.title}</h1>
                <p className="font-medium text-sm md:text-xl">{data.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinancialSummary;
