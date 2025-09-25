/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Gift,
  Mail,
  Phone,
  X,
} from "lucide-react";
import ProgressBar from "../../hooks/ProgressBar";
import MiniProgressBar from "../../hooks/MiniProgressBar";

export default function ClientDetailsModal({ isOpen, onClose, info }) {
  const [decision, setDecision] = useState(null);
  const [approveForm, setApproveForm] = useState({
    loanAmount: "",
    interestRate: "",
    termMonth: "",
    notes: "",
  });
  const [rejectForm, setRejectForm] = useState({
    rejectReason: "",
    notes: "",
  });

  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApproveSubmit = () => {
    console.log("✅ Approved loan:", approveForm);
    alert("Loan approved!");
    setDecision(null);
    setApproveForm({ loanAmount: "", interestRate: "", termMonth: "", notes: "" });
    onClose();
  };

  const handleRejectSubmit = () => {
    console.log("❌ Loan rejected:", rejectForm);
    alert("Loan rejected!");
    setDecision(null);
    setRejectForm({ rejectReason: "", notes: "" });
    onClose();
  };

  return (
    <div className="fixed animate-fadein inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative"
      >
        {/* Top Banner */}
        <div className="flex justify-between items-center rounded-t-lg p-6 bg-[#F5F5F5] border-b">
          <h3 className="font-semibold text-lg">Client Details</h3>
          <button
            onClick={() => setDecision(null)}
            className="text-sm hover:underline transition-all cursor-pointer flex items-center gap-2"
          >
            <Download/> Export
          </button>
        </div>

        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button> */}

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Credit Passport */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Credit Passport</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <img
                  src={info?.personalInfo?.profilePhotoUrl || "/default.jpg"}
                  alt="User"
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-700">
                    {info?.firstName} {info?.lastName}
                  </p>
                  <div className="flex items-center gap-2 my-1">
                    <Mail size={16} />
                    <p className="text-sm text-gray-600">{info?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <p className="text-sm text-gray-600">{info?.phone}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <p>
                      <strong>DOB:</strong>{" "}
                      {info?.dateOfBirth
                        ? new Date(info.dateOfBirth).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p>
                      <strong>Location:</strong> {info?.contact?.state}
                    </p>
                  </div>
                  <p>
                    <strong>Gender:</strong> {info?.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Info */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Financial Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  <p>
                    <strong>Annual Income:</strong> {info?.annualInfo?.annualIncome}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={16} />
                  <p>
                    <strong>Existing Loans:</strong>{" "}
                    {info?.financialInfo?.existingLoan > 0 ? "YES" : "NO"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Gift size={16} />
                  <p>
                    <strong>Land Value:</strong> {info?.financialInfo?.landOwned}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard size={16} />
                  <p>
                    <strong>Debt:</strong> {info?.totalDebt}
                  </p>
                </div>
              </div>
            </div>

            {/* Decision Section */}
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Decision</h2>
              <div className="flex gap-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-md ${
                    decision === "approve"
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                  onClick={() => setDecision("approve")}
                >
                  ✓ Approve
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    decision === "reject"
                      ? "bg-red-600 text-white"
                      : "bg-red-100 text-red-600 hover:bg-red-200"
                  }`}
                  onClick={() => setDecision("reject")}
                >
                  ✕ Reject
                </button>
              </div>

              {/* Approve Form */}
              {decision === "approve" && (
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Loan Amount"
                    value={approveForm.loanAmount}
                    onChange={(e) =>
                      setApproveForm({ ...approveForm, loanAmount: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Interest Rate (%)"
                    value={approveForm.interestRate}
                    onChange={(e) =>
                      setApproveForm({ ...approveForm, interestRate: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <select
                    value={approveForm.termMonth}
                    onChange={(e) =>
                      setApproveForm({ ...approveForm, termMonth: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Term (months)</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="12">12</option>
                  </select>
                  <textarea
                    placeholder="Notes..."
                    value={approveForm.notes}
                    onChange={(e) =>
                      setApproveForm({ ...approveForm, notes: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}

              {/* Reject Form */}
              {decision === "reject" && (
                <textarea
                  placeholder="Reason for rejection..."
                  value={rejectForm.rejectReason}
                  onChange={(e) =>
                    setRejectForm({ ...rejectForm, rejectReason: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              )}

              {/* Submit button */}
              {decision && (
                <button
                  onClick={
                    decision === "approve"
                      ? handleApproveSubmit
                      : handleRejectSubmit
                  }
                  className="mt-4 px-4 py-2 bg-[#4B1E2F] text-white rounded-md"
                >
                  Submit Decision
                </button>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-gray-100 p-4 rounded-md">
              <MiniProgressBar value={info.financialInfo.creditScore}/>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <MiniProgressBar value={info.financialInfo.creditScore}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
