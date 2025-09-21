import { ChartColumn, Eye, FileText } from "lucide-react";
import { useAuth } from "../../AuthProvider/AuthProvider";

const icons = {
  ChartColumn,
  FileText,
  Eye,
};

const getDaysAgo = (createdAt) => {
  if (!createdAt) return "";

  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffTime = now - createdDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const RecentActivity = () => {
  const { user } = useAuth();

  const recentActivityData = [
    {
      icon: "ChartColumn",
      iconBg: "#E0AB0B33",
      iconColor: "#E0AB0B",
      title: "Credit score calculated",
    },
    {
      icon: "FileText",
      iconBg: "#441B2B33",
      iconColor: "#4B1E2F",
      title: "Profile information submitted",
    },
    {
      icon: "Eye",
      iconBg: "#28282833",
      iconColor: "#282828",
      title: "Account created",
    },
  ];

  return (
    <div className="border border-zinc-200 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="flex items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-medium text-[18px]">Recent Activity</h3>
      </div>

      <div className="md:m-6 m-5 grid gap-5">
        {recentActivityData.map((data, idx) => {
          const Icon = icons[data.icon];
          return (
            <div
              key={idx}
              className="bg-[#F9FAFB] flex items-center justify-between gap-3 border border-zinc-200 p-3 md:p-5 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full w-10 h-10 md:w-13 md:h-13"
                  style={{ backgroundColor: data.iconBg }}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6"
                    color={data.iconColor}
                  />
                </div>
                <h1 className="font-medium text-sm md:text-lg">{data.title}</h1>
              </div>

              <p className="text-zinc-500 text-xs md:text-sm">
                {getDaysAgo(user?.createdAt)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
