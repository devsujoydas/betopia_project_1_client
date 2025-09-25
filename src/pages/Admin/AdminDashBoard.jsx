import React, { useEffect, useState } from "react";
import { CircleCheckBig, Clock, Users } from "lucide-react";
import api from "../../utils/api";
import AdminClientList from "./AdminClientList";

const icons = { Users, CircleCheckBig, Clock };

const AdminDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({ summary: {} });

  useEffect(() => {
    api.get("/dashboard").then((res) => setDashboardData(res.data));
  }, []);

  const dashboardCardData = [
    {
      icon: "Users",
      iconBg: "#4B1E2F33",
      iconColor: "#4B1E2F",
      title: "Total Clients",
      amount: dashboardData?.summary?.totalClients || 0,
    },
    {
      icon: "CircleCheckBig",
      iconBg: "#039B0633",
      iconColor: "#039B06",
      title: "Approved Clients",
      amount: dashboardData?.summary?.approvedClients || 0,
    },
    {
      icon: "Clock",
      iconBg: "#E0AB0B33",
      iconColor: "#E0AB0B",
      title: "Pending Decisions",
      amount: dashboardData?.summary?.pendingClients || 0,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">CreditFrist – Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {dashboardCardData.map((data, idx) => {
          const Icon = icons[data.icon];
          return (
            <div
              key={idx}
              className="bg-white flex items-center gap-3 border border-zinc-200 p-3 md:p-5 rounded-md shadow-lg"
            >
              <div
                className="flex items-center justify-center rounded-full w-10 h-10 md:w-12 md:h-12"
                style={{ backgroundColor: data.iconBg }}
              >
                <Icon
                  className="w-5 h-5 md:w-6 md:h-6"
                  color={data.iconColor}
                />
              </div>
              <div>
                <h1 className="text-lg text-gray-600">{data.title}</h1>
                <p
                  className="font-medium text-[1rem] md:text-xl mt-1"
                  style={{ color: data.iconColor }}
                >
                  {data.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <AdminClientList />
    </div>
  );
};

export default AdminDashBoard;
