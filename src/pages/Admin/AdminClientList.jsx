// AdminClientList.jsx
import React, { useEffect, useState } from "react";
import { Eye, Funnel } from "lucide-react";
import api from "../../utils/api";

const TABS = ["All Clients", "Pending", "Approved", "Rejected"];

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
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({});

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (activeTab !== "All Clients") params.status = activeTab.toLowerCase();
      const res = await api.get("/dashboard", { params });
      setClients(res.data.users || []);
      setSummary(res.data.summary || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [activeTab, filters]);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

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

  return (
    <div className="bg-white shadow-lg border border-zinc-200 rounded-md py-6 px-3 sm:px-5">
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
              className={`relative pb-2 font-medium mt-3 ${
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
              className="border border-gray-300 bg-[#F0F0F0] w-full outline-none rounded-md px-3 py-2  mt-2 text-sm"
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
      <div className="overflow-x-auto">
        <table className="w-full border-b border-zinc-200 rounded-md text-sm sm:text-base md:text-lg">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-center font-semibold px-3 py-2 sm:px-4 sm:py-5">
                ID
              </th>
              <th className="text-left font-semibold px-3 py-2 sm:px-4 sm:py-5">
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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  Loading...
                </td>
              </tr>
            ) : clients.length > 0 ? (
              clients.map((c, idx) => (
                <tr key={c._id}>
                  <td className="px-3 py-2 sm:py-5 text-center">{idx + 1}</td>
                  <td className="px-3 py-2 sm:py-5">
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
                    <button className="text-primary hover:underline text-sm">
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
    </div>
  );
};

export default AdminClientList;
