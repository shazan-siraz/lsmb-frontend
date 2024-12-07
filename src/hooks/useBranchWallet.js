import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetSingleBranchQuery } from "../redux/features/branch/branchApi";
import { useGetSingleEmployeeQuery } from "../redux/features/employee/employeeApi";
import { useGetTotalLoanAmountWithoutPorcessFeesQuery } from "../redux/features/loan/loanApi";
import { useGetTotalLoanCollectionAmountQuery } from "../redux/features/loanCollection/loanCollectionApi";
import { useGetTotalMemberAccountBalaceAndProcessFeesQuery } from "../redux/features/membership/membershipApi";

export const useBranchWallet = () => {
  const { email, role } = useSelector(useCurrentUser);

  const { data: singleBranchData, isLoading: singleBranchQueryLoading } =
    useGetSingleBranchQuery(email);
  const { data: singleEmployeeData, isLoading: singleEmployeeLoading } =
    useGetSingleEmployeeQuery(email);

  // Conditionally use the data based on the role
  let data;
  if (role === "branch") {
    data = singleBranchData;
  } else if (
    role === "manager" ||
    role === "accountant" ||
    role === "fieldOfficer"
  ) {
    data = singleEmployeeData;
  }

  const branchEmail = data?.data?.branchEmail;

  // const { data: totalSavingTxnAmount, isLoading: totalSavingTxnAmountLoading } =
  //   useGetTotalSavingtxnAmountQuery(branchEmail);

  const {
    data: getTotalLoamAmountWithoutProcessFees,
    isLoading: getTotalLoamAmountWithoutProcessFeesLoading,
  } = useGetTotalLoanAmountWithoutPorcessFeesQuery(branchEmail);

  const {
    data: totalLoanCollectionAmountData,
    isLoading: totalLoanCollectionAmountLoading,
  } = useGetTotalLoanCollectionAmountQuery(branchEmail);

  const {
    data: TotalMemberAccountBalaceAndProcessFees,
    isLoading: TotalMemberAccountBalaceAndProcessFeesLoading,
  } = useGetTotalMemberAccountBalaceAndProcessFeesQuery(branchEmail);

  // const { data: totalSavingWithdraw, isLoading: totalSavingWithdrawLoading } =
  //   useGetTotalSavingWithdrawQuery(branchEmail);

  const isLoading =
    singleBranchQueryLoading ||
    singleEmployeeLoading ||
    totalLoanCollectionAmountLoading ||
    getTotalLoamAmountWithoutProcessFeesLoading ||
    TotalMemberAccountBalaceAndProcessFeesLoading;

  const branchWallet =
    totalLoanCollectionAmountData?.data +
    TotalMemberAccountBalaceAndProcessFees?.data -
    getTotalLoamAmountWithoutProcessFees?.data;

  return { branchWallet, isLoading };
};
