import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../components/layout/MainLayout";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import RegisterPackage from "../pages/RegisterPackage/RegisterPackage";
import CreateAdmin from "../pages/CreateAdmin/CreateAdmin";
import CreateSuperAdmin from "../pages/CreateSuperAdmin/CreateSuperAdmin";
import SuperAdminList from "../pages/CreateSuperAdmin/SuperAdminList";
import AdminList from "../pages/CreateAdmin/AdminList";
import PackageList from "../pages/RegisterPackage/PackageList";
import BranchCreate from "../pages/BranchCreate/BranchCreate";
import BranchList from "../pages/BranchCreate/BranchList";
import BranchDetails from "../pages/BranchCreate/BranchDetails";
import Login from "../pages/Login/Login";
import LoanRequest from "../pages/Loan/LoanRequest";
import ActiveLoan from "../pages/Loan/ActiveLoan";
import OverdueLoan from "../pages/Loan/OverdueLoan";
import CompletedLoan from "../pages/Loan/CompletedLoan";
import Dashboard from "../pages/Dashboard/Dashboard";
import Membership from "../pages/Membership/Membership";
import DpsCreate from "../pages/Dps/DpsCreate";
import FdrCreate from "../pages/Fdr/FdrCreate";
import ExpenseCreate from "../pages/Expense/ExpenseCreate";
import EmployeeList from "../pages/Employee/EmployeeList";
import AddNewEmployee from "../pages/Employee/AddNewEmployee";
import GroupLIst from "../pages/Group-List/GroupLIst";
import AllMembers from "../pages/Membership/AllMembers";
import SingleMember from "../pages/Membership/SingleMember";
import CreateLoan from "../pages/Loan/CreateLoan";
import ActiveDps from "../pages/Dps/ActiveDps";
import MaturityDps from "../pages/Dps/MaturityDps";
import ActiveFdr from "../pages/Fdr/ActiveFdr";
import MaturityFdr from "../pages/Fdr/MaturityFdr";
import SavingsAccount from "../pages/Savings/SavingsAccount";
import SavingsStatement from "../pages/Savings/SavingsStatement";
import SavingsReport from "../pages/Savings/SavingsReport";
import SavingsTransaction from "../pages/Savings/SavingTransaction";
import SavingsTransactionCheck from "../pages/Savings/SavingTransactionCheck";
import PendingWithdraw from "../pages/Withdraw/PendingWithdraw";
import Withdraw from "../pages/Withdraw/Withdraw";
import AllWithdraw from "../pages/Withdraw/AllWithdraw";
import WithdrawReport from "../pages/Withdraw/WithdrawReport";
import WithdrawStatement from "../pages/Withdraw/WithdrawStatement";
import SavingWithdraw from "../pages/Withdraw/SavingWithdraw";
import FdrWithdraw from "../pages/Withdraw/FdrWithdraw";
import DpsWithdraw from "../pages/Withdraw/DpsWithdraw";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import SuperAdminProfile from "../pages/Profile/SuperAdminProfile/SuperAdminProfile"
import AdminProfile from "../pages/Profile/AdminProfile/AdminProfile"
import BranchProfile from "../pages/Profile/BranchProfile/BranchProfilePage"
import ChangePassword from "../pages/ChangePassword/ChangePassword"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout></MainLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "dashboard-home",
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "superAdmin-create",
        element: <CreateSuperAdmin></CreateSuperAdmin>,
      },
      {
        path: "superAdmin-list",
        element: <SuperAdminList></SuperAdminList>
      },
      {
        path: "admin-create",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        path: "admin-list",
        element: <AdminList></AdminList>,
      },
      {
        path: "registerPackage-create",
        element: <RegisterPackage></RegisterPackage>,
      },
      {
        path: "registerPackage-list",
        element: <PackageList></PackageList>,
      },
      {
        path: "branch-create",
        element: <BranchCreate></BranchCreate>,
      },
      {
        path: "branch-list/",
        element: <BranchList></BranchList>,
      },
      {
        path: "branch-details/:email",
        element: <BranchDetails></BranchDetails>,
      },
      {
        path: "loan-create",
        element: <CreateLoan></CreateLoan>,
      },
      {
        path: "loan-request",
        element: <LoanRequest></LoanRequest>,
      },
      {
        path: "active-loan",
        element: <ActiveLoan></ActiveLoan>,
      },
      {
        path: "overdue-loan",
        element: <OverdueLoan></OverdueLoan>,
      },
      {
        path: "completed-loan",
        element: <CompletedLoan></CompletedLoan>,
      },
      {
        path: "active-dps",
        element: <ActiveDps></ActiveDps>,
      },
      {
        path: "maturity-dps",
        element: <MaturityDps></MaturityDps>,
      },
      {
        path: "membership-create",
        element: <Membership></Membership>,
      },
      {
        path: "dps-create",
        element: <DpsCreate></DpsCreate>,
      },
      {
        path: "fdr-create",
        element: <FdrCreate></FdrCreate>,
      },
      {
        path: "active-fdr",
        element: <ActiveFdr></ActiveFdr>,
      },
      {
        path: "maturity-fdr",
        element: <MaturityFdr></MaturityFdr>,
      },
      {
        path: "expense-create",
        element: <ExpenseCreate></ExpenseCreate>,
      },
      {
        path: "employee-list",
        element: <EmployeeList></EmployeeList>,
      },
      {
        path: "addnew-employee",
        element: <AddNewEmployee></AddNewEmployee>,
      },
      {
        path: "group-list",
        element: <GroupLIst></GroupLIst>,
      },
      {
        path: "all-members",
        element: <AllMembers></AllMembers>,
      },
      {
        path: "single-member/:id",
        element: <SingleMember></SingleMember>,
      },
      {
        path: "savings-account",
        element: <SavingsAccount></SavingsAccount>,
      },
      {
        path: "savings-report",
        element: <SavingsReport></SavingsReport>,
      },
      {
        path: "savings-statement",
        element: <SavingsStatement></SavingsStatement>,
      },
      {
        path: "savings-transaction",
        element: <SavingsTransaction></SavingsTransaction>,
      },
      {
        path: "saving-transaction-check/:id",
        element: <SavingsTransactionCheck></SavingsTransactionCheck>,
      },
      {
        path: "pending-withdraw",
        element: <PendingWithdraw></PendingWithdraw>,
      },
      {
        path: "withdraw",
        element: <Withdraw></Withdraw>,
      },
      {
        path: "all-withdraw",
        element: <AllWithdraw></AllWithdraw>,
      },
      {
        path: "withdraw-report",
        element: <WithdrawReport></WithdrawReport>,
      },
      {
        path: "withdraw-statement",
        element: <WithdrawStatement></WithdrawStatement>,
      },
      {
        path: "withdraw/savings/:id",
        element: <SavingWithdraw></SavingWithdraw>,
      },
      {
        path: "withdraw/fdr/:id",
        element: <FdrWithdraw></FdrWithdraw>,
      },
      {
        path: "withdraw/dps/:id",
        element: <DpsWithdraw></DpsWithdraw>,
      },
      {
        path: "superAdmin-profile",
        element: <SuperAdminProfile></SuperAdminProfile>
      },
      {
        path: "admin-profile",
        element: <AdminProfile></AdminProfile>
      },
      {
        path: "branch-profile",
        element: <BranchProfile></BranchProfile>
      },
      {
        path: "changePassword",
        element: <ChangePassword></ChangePassword>
      },
    ],
  },
]);

export default router;
