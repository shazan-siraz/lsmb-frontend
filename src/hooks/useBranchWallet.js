import { useSelector } from "react-redux";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useGetSingleBranchQuery } from "../redux/features/branch/branchApi";
import { useGetSingleEmployeeQuery } from "../redux/features/employee/employeeApi";
import { useGetTotalLoanAmountWithoutPorcessFeesQuery } from "../redux/features/loan/loanApi";
import { useGetTotalLoanCollectionAmountQuery } from "../redux/features/loanCollection/loanCollectionApi";
import { useGetTotalDpsCollectionBalaceQuery } from "../redux/features/dpsCollection/dpsCollectionApi";
import { useGetTotalSavingWithdrawQuery } from "../redux/features/savingWithdraw/savingWithdraw";
import { useGetTotalSavingtxnAmountQuery } from "../redux/features/savingCollection/savingCollectionApi";
import { useGetTotalDpsWithdrawQuery } from "../redux/features/dpsWithdraw/dpsWithdrawApi";
import {
  useTotalAddMoneyBankTxnQuery,
  useTotalCashOutBankTxnQuery,
} from "../redux/features/bankTransaction/bankTransactionApi";
import { useTotalPartialIncomeQuery } from "../redux/features/partialIncome/partialIncomeApi";

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

  const { data: totalSavingTxnAmount, isLoading: totalSavingTxnAmountLoading } =
    useGetTotalSavingtxnAmountQuery(branchEmail);

  const {
    data: getTotalLoanAmountWithoutProcessFees,
    isLoading: getTotalLoanAmountWithoutProcessFeesLoading,
  } = useGetTotalLoanAmountWithoutPorcessFeesQuery(branchEmail);

  const {
    data: totalLoanCollectionAmountData,
    isLoading: totalLoanCollectionAmountLoading,
  } = useGetTotalLoanCollectionAmountQuery(branchEmail);

  const { data: totalDpsCollectionBalanceData } =
    useGetTotalDpsCollectionBalaceQuery(branchEmail);

  const { data: totalSavingWithdraw } =
    useGetTotalSavingWithdrawQuery(branchEmail);

  const { data: dpsWithdrawData, isLoading: dpsWithdrawLoading } =
    useGetTotalDpsWithdrawQuery(branchEmail);

  const { data: totalAddMoneyBankTxn, isLoading: totalAddMoneyBankTxnLoading } =
    useTotalAddMoneyBankTxnQuery(branchEmail);

  const { data: totalCashOutBankTxn, isLoading: totalCashOutBankTxnLoading } =
    useTotalCashOutBankTxnQuery(branchEmail);

  const { data: totalPartialIncomeData } =
    useTotalPartialIncomeQuery(branchEmail);

  const isLoading =
    singleBranchQueryLoading ||
    singleEmployeeLoading ||
    totalSavingTxnAmountLoading ||
    totalLoanCollectionAmountLoading ||
    getTotalLoanAmountWithoutProcessFeesLoading ||
    dpsWithdrawLoading ||
    totalAddMoneyBankTxnLoading ||
    totalCashOutBankTxnLoading;

  const addedBranchWallet =
    totalSavingTxnAmount?.data +
    totalLoanCollectionAmountData?.data +
    totalDpsCollectionBalanceData?.data +
    totalAddMoneyBankTxn?.data +
    totalPartialIncomeData?.data;

  const subtractBranchWallet =
    getTotalLoanAmountWithoutProcessFees?.data +
    totalSavingWithdraw?.data +
    dpsWithdrawData?.data +
    totalCashOutBankTxn?.data;

  const branchWallet = addedBranchWallet - subtractBranchWallet;

  return { branchWallet, isLoading };
};
