// AdminClientList.jsx
import React, { useMemo, useState } from "react";
import { Eye, Funnel } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import ClientDetailsModal from "./ClientDetailsModal";

const TABS = ["All Clients", "Pending", "Approved", "Rejected"];

const fetchClients = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

const AdminClientList = () => {
  const [activeTab, setActiveTab] = useState("All Clients");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    minScore: "",
    maxScore: "",
    minIncome: "",
    status: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch once & cache
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });

  const clients = data?.users || [];
  const summary = data?.summary || {};

  const handleFilterChange = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const getTabCount = (tab) => {
    switch (tab) {
      case "All Clients":
        return summary.totalClients || 0;
      case "Pending":
        return summary.pendingClients || 0;
      case "Approved":
        return summary.approvedClients || 0;
      case "Rejected":
        return summary.rejectedClients || 0;
      default:
        return 0;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-[#039B06] bg-[#039B061A]";
      case "pending":
        return "text-[#E0AB0B] bg-[#E0AB0B1A]";
      case "rejected":
        return "text-[#BD0202] bg-[#BD02021A]";
      default:
        return "text-gray-600 bg-gray-200";
    }
  };

  const getScoreClass = (score) =>
    score >= 75
      ? "text-[#039B06]"
      : score >= 50
      ? "text-[#E0AB0B]"
      : "text-[#BD0202]";

  const getScoreText = (score) =>
    score >= 75 ? "High" : score >= 50 ? "Medium" : "Low";

  // Apply filters + tab locally
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const cityMatch = filters.city
        ? c?.contactInfo?.city
            ?.toLowerCase()
            .includes(filters.city.toLowerCase())
        : true;

      const score = c.financialInfo?.creditScore || 0;
      const scoreMatch =
        (filters.minScore ? score >= Number(filters.minScore) : true) &&
        (filters.maxScore ? score <= Number(filters.maxScore) : true);

      const income = c.financialInfo?.income || 0;
      const incomeMatch = filters.minIncome
        ? income >= Number(filters.minIncome)
        : true;

      const statusMatch = filters.status
        ? c.loanInfo?.loanStatus?.toLowerCase() ===
          filters.status.toLowerCase()
        : true;

      const tabMatch =
        activeTab === "All Clients"
          ? true
          : c.loanInfo?.loanStatus?.toLowerCase() ===
            activeTab.toLowerCase();

      return cityMatch && scoreMatch && incomeMatch && statusMatch && tabMatch;
    });
  }, [clients, filters, activeTab]);

  return (
    <div className="bg-white shadow-lg border border-zinc-200 rounded-md py-6 px-3 sm:px-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h1 className="text-primary font-medium text-xl">Client List</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 border border-zinc-200 px-3 py-1.5 rounded-sm hover:bg-zinc-200 transition-all"
        >
          <Funnel className="w-4" /> Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 border-b border-gray-200 mb-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          const count = getTabCount(tab);
          let chipClass = "px-2 py-0.5 text-xs font-semibold rounded-full";
          chipClass +=
            tab === "Approved"
              ? " text-[#039B06] bg-[#039B061A]"
              : tab === "Pending"
              ? " text-[#E0AB0B] bg-[#E0AB0B1A]"
              : tab === "Rejected"
              ? " text-[#BD0202] bg-[#BD02021A]"
              : " text-gray-700 bg-gray-300";

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer relative pb-2 font-medium mt-3 ${
                isActive
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab} <span className={chipClass}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center md:w-6xl gap-5 flex-wrap mb-6 mt-2 text-zinc-500">
          <div className="md:flex-1">
            <h1 className="font-medium text-sm text-black">City</h1>
            <input
              type="text"
              name="city"
              placeholder="Filter by City"
              value={filters.city}
              onChange={handleFilterChange}
              className="bg-[#F0F0F0] border border-gray-300 outline-none rounded-md px-3 py-2 mt-2 text-sm"
            />
          </div>
          <div className="md:flex-1">
            <h1 className="font-medium text-sm text-black">Min Score</h1>
            <input
              type="number"
              name="minScore"
              placeholder="Min Score"
              value={filters.minScore}
              onChange={handleFilterChange}
              className="bg-[#F0F0F0] border border-gray-300 outline-none rounded-md px-3 py-2 mt-2 text-sm"
            />
          </div>
          <div className="md:flex-1">
            <h1 className="font-medium text-sm text-black">Max Score</h1>
            <input
              type="number"
              name="maxScore"
              placeholder="Max Score"
              value={filters.maxScore}
              onChange={handleFilterChange}
              className="bg-[#F0F0F0] border border-gray-300 outline-none rounded-md px-3 py-2 mt-2 text-sm"
            />
          </div>
          <div className="md:flex-1">
            <h1 className="font-medium text-sm text-black">Min Income ($)</h1>
            <input
              type="number"
              name="minIncome"
              placeholder="Min Income"
              value={filters.minIncome}
              onChange={handleFilterChange}
              className="bg-[#F0F0F0] border border-gray-300 outline-none rounded-md px-3 py-2 mt-2 text-sm"
            />
          </div>
          <div className="md:flex-1">
            <h1 className="font-medium text-sm text-black">Status</h1>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-gray-300 bg-[#F0F0F0] w-full outline-none rounded-md px-3 py-2 mt-2 text-sm"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-5">
        <table className="w-full border-b border-zinc-200 rounded-md text-sm sm:text-base md:text-lg">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-center font-semibold px-3 py-2 sm:px-4 sm:py-5">
                ID
              </th>
              <th className="text-left font-semibold px-3 py-2 sm:px-8 sm:py-5">
                City
              </th>
              <th className="text-left font-semibold px-3 py-2 sm:px-4 sm:py-5">
                Credit Score
              </th>
              <th className="text-center font-semibold px-3 py-2 sm:px-4 sm:py-5">
                Amount Requested
              </th>
              <th className="text-left font-semibold px-3 py-2 sm:px-4 sm:py-5">
                Status
              </th>
              <th className="text-left font-semibold px-3 py-2 sm:px-4 sm:py-5">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="6" className="text-center text-red-500 py-6">
                  Failed to load clients.
                </td>
              </tr>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((c, idx) => (
                <tr key={c._id}>
                  <td className="px-3 py-2 sm:py-5 text-center">{idx + 1}</td>
                  <td className="px-3 sm:px-8 py-2 sm:py-5">
                    {c?.contactInfo?.city || "-"}
                  </td>
                  <td className="px-3 py-2 sm:py-5">
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-lg ${getScoreClass(
                          c.financialInfo?.creditScore
                        )}`}
                      >
                        {c.financialInfo?.creditScore || "-"}/100
                      </span>
                      <span className="mt-1 text-zinc-500">
                        {getScoreText(c.financialInfo?.creditScore)}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 sm:py-5 text-center">
                    $
                    {new Intl.NumberFormat("en-IN").format(
                      c.loanInfo?.amountRequested || 0
                    )}
                  </td>
                  <td className="px-3 py-2 sm:py-5">
                    <span
                      className={`w-fit font-medium text-xs px-2 py-0.5 rounded-full ${getStatusClass(
                        c.loanInfo?.loanStatus
                      )}`}
                    >
                      {c.loanInfo?.loanStatus || "Not Assigned"}
                    </span>
                  </td>
                  <td className="px-3 py-2 sm:py-5">
                    <button
                      onClick={() => {
                        setSelectedClient(c);
                        setIsOpen(true);
                      }}
                      className="text-primary cursor-pointer hover:underline text-sm"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No Clients Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <ClientDetailsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          info={selectedClient}
        />
      )}
    </div>
  );
};

export default AdminClientList;
