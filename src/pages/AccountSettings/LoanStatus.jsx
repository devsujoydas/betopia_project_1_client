import React from "react";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";

const LoanStatus = () => {
  const { user } = useAuth();
  const loanStatus = user?.loanInfo?.loanStatus; 
  // const loanStatus = "approved"; 

  const approvedDetails = user?.loanInfo?.approvedDetails;
  const rejectionDetails = user?.loanInfo?.rejectionDetails;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-5 sm:p-10 flex flex-col gap-10"
    >
      {/* No Loan */}
      {(!loanStatus || loanStatus === "none") && (
        <div className="flex flex-col items-center gap-6 text-center">
          <h3 className="font-medium text-2xl sm:text-3xl text-zinc-500">
            You currently have no active loan.
          </h3>
          <img
            className="w-full max-w-md sm:max-w-sm md:max-w-md rounded-lg "
            src="https://img.freepik.com/premium-vector/loan-disbursement-flat-modern-design-illustration_566886-273.jpg?w=1480"
            alt="No Loan"
          />
          <p className="text-gray-600 text-base sm:text-lg">
            Apply for a new loan to get started.
          </p>
          <button className="btn-primary">
            Apply for Loan
          </button>
        </div>
      )}

      {/* Pending */}
      {loanStatus === "pending" && (
        <div className="flex flex-col items-center text-center gap-6">
          <h3 className="font-medium text-2xl sm:text-3xl text-zinc-500">
            Your loan has not yet been approved. Please wait for further
            updates.
          </h3>
          <img
            className="w-full max-w-md sm:max-w-sm md:max-w-md rounded-lg "
            src="https://img.freepik.com/premium-vector/loan-agreement-concept-illustration_86047-475.jpg?w=1480"
            alt="Loan Pending"
          />
        </div>
      )}

      {/* Approved */}
      {loanStatus === "approved" && approvedDetails && (
        <div>
          <div className="flex flex-col items-center gap-6">
            <h3 className="font-medium text-2xl sm:text-3xl text-zinc-500">
              Your loan has been approved
            </h3>
            <img
              className="w-full max-w-sm sm:max-w-sm md:max-w-sm rounded-lg "
              src="https://img.freepik.com/premium-vector/loan-agreement-concept-illustration_86047-473.jpg?w=1480"
              alt="Loan Approved"
            />
          </div>
          <div className="grid  gap-4 sm:gap-6  w-full text-left">
            <div>
              <h4 className="font-semibold text-lg sm:text-xl">Loan Amount</h4>
              <p className="text-base sm:text-lg mt-1">
                ${approvedDetails.loanAmount}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg sm:text-xl">
                Interest Rate
              </h4>
              <p className="text-base sm:text-lg mt-1">
                {approvedDetails.interestRate}%
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg sm:text-xl">
                Term (months)
              </h4>
              <p className="text-base sm:text-lg mt-1">
                {approvedDetails.terms} Month
              </p>
            </div>
            {approvedDetails.note && (
              <p className="text-gray-600 font-semibold text-lg sm:text-xl  mt-2">
                ** Note: {approvedDetails.note}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Rejected */}
      {loanStatus === "rejected" && rejectionDetails && (
        <div className="flex flex-col items-center text-center gap-4">
          <h3 className="font-medium text-2xl sm:text-3xl text-red-500">
            Your loan application has been rejected
          </h3>
          
          <img
            className="w-full max-w-sm sm:max-w-sm md:max-w-sm rounded-lg "
            src="https://img.freepik.com/premium-vector/loan-rejected-illustration_108061-2200.jpg?w=1480"
            alt="Loan Rejected"
          />
          {rejectionDetails.note && (
            <p className="text-base sm:text-lg text-gray-700">
              <span className="font-semibold text-black">**Note: </span>{rejectionDetails.note}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default LoanStatus;
