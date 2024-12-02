import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetSingleBranchQuery } from "../redux/features/branch/branchApi";
import { useGetSingleEmployeeQuery } from "../redux/features/employee/employeeApi";
import { useGetTotalSavingtxnAmountQuery } from "../redux/features/savingCollection/savingCollectionApi";
import { useGetTotalLoanAmountWithoutPorcessFeesQuery } from "../redux/features/loan/loanApi";
import { useGetTotalLoanCollectionAmountQuery } from "../redux/features/loanCollection/loanCollectionApi";
import { useGetTotalShareAmountAndProcessFeesQuery } from "../redux/features/membership/membershipApi";
import { useGetTotalSavingWithdrawQuery } from "../redux/features/savingWithdraw/savingWithdraw";

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
  } else if (role === "manager") {
    data = singleEmployeeData;
  }

  const branchEmail = data?.data?.branchEmail;

  const { data: totalSavingTxnAmount, isLoading: totalSavingTxnAmountLoading } =
    useGetTotalSavingtxnAmountQuery(branchEmail);

  const {
    data: getTotalLoamAmountWithoutProcessFees,
    isLoading: getTotalLoamAmountWithoutProcessFeesLoading,
  } = useGetTotalLoanAmountWithoutPorcessFeesQuery(branchEmail);

  const {
    data: totalLoanCollectionAmountData,
    isLoading: totalLoanCollectionAmountLoading,
  } = useGetTotalLoanCollectionAmountQuery(branchEmail);

  const {
    data: TotalShareAmountAndadmissionFees,
    isLoading: TotalShareAmountAndadmissionFeesLoading,
  } = useGetTotalShareAmountAndProcessFeesQuery(branchEmail);

  const { data: totalSavingWithdraw, isLoading: totalSavingWithdrawLoading } =
    useGetTotalSavingWithdrawQuery(branchEmail);


  const isLoading =
    singleBranchQueryLoading ||
    singleEmployeeLoading ||
    totalSavingTxnAmountLoading ||
    totalLoanCollectionAmountLoading ||
    getTotalLoamAmountWithoutProcessFeesLoading ||
    TotalShareAmountAndadmissionFeesLoading ||
    totalSavingWithdrawLoading;

  const branchWallet =
    totalSavingTxnAmount?.data +
    totalLoanCollectionAmountData?.data +
    (TotalShareAmountAndadmissionFees?.data -
      getTotalLoamAmountWithoutProcessFees?.data -
      totalSavingWithdraw?.data);

  return { branchWallet, isLoading };
};
