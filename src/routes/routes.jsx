import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../components/layout/MainLayout";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import CreateAdmin from "../pages/CreateAdmin/CreateAdmin";
import CreateSuperAdmin from "../pages/CreateSuperAdmin/CreateSuperAdmin";
import SuperAdminList from "../pages/CreateSuperAdmin/SuperAdminList";
import AdminList from "../pages/CreateAdmin/AdminList";
import BranchCreate from "../pages/BranchCreate/BranchCreate";
import BranchList from "../pages/BranchCreate/BranchList";
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
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Register from "../pages/Register/Register";
import CreateSubscriber from "../pages/Subscriber/CreateSubscriber";
import SubscriberList from "../pages/Subscriber/SubscriberList";
import Sms from "../pages/SMS/Sms";
import AddedAddVideoTutorial from "../pages/AdVideoTutorial/AddedAdVideoTutorial";
import AddVideoTutorialList from "../pages/AdVideoTutorial/AddVideoTutorialList";
import AddedSoftwareUsers from "../pages/SoftwareUsers/AddedSoftwareUsers";
import SoftwareUsersList from "../pages/SoftwareUsers/SoftwareUsersList";
import TinyMCEEditor from "../pages/TextEditor/TinyMCEEditor";
import ArticleList from "../pages/TextEditor/ArticleList";
import Article from "../pages/Article/Article";
import SingleArticle from "../pages/Article/SingleArticle";
import RegisteredUserList from "../pages/Register/RegisteredUserList";
import Profile from "../pages/Profile/Profile";
import BranchDetails from "../pages/BranchCreate/BranchDetails";
import FindSavingMember from "../pages/SavingCollection/FindSavingMember";
import SavingTransaction from "../pages/SavingCollection/SavingTransaction";
import FindLoanMember from "../pages/LoanTransaction/FindLoanMember";
import LoanTransaction from "../pages/LoanTransaction/LoanTransaction";
import PackageCreate from "../pages/Package/PackageCreate";
import Packages from "../pages/Package/Packages";
import FindDpsAccount from "../pages/DpsCollection/FindDpsAccount";
import DpsCollection from "../pages/DpsCollection/CreateDpsCollection";
import UpdateMember from "../pages/Membership/UpdateMember";
import TodayTransaction from "../pages/TodayTransaction/TodayTransaction";

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
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "article",
    element: <Article></Article>,
  },
  {
    path: "article/:id",
    element: <SingleArticle></SingleArticle>,
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
        element: <SuperAdminList></SuperAdminList>,
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
        path: "package-create",
        element: <PackageCreate></PackageCreate>,
      },
      {
        path: "packages",
        element: <Packages></Packages>,
      },
      {
        path: "branch-create",
        element: <BranchCreate></BranchCreate>,
      },
      {
        path: "branch-list",
        element: <BranchList></BranchList>,
      },
      {
        path: "branch-details",
        element: <BranchDetails></BranchDetails>
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
        path: "updateMembership/:id",
        element: <UpdateMember></UpdateMember>,
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
        path: "changePassword",
        element: <ChangePassword></ChangePassword>,
      },
      {
        path: "create-subscriber",
        element: <CreateSubscriber></CreateSubscriber>,
      },
      {
        path: "subscriberList",
        element: <SubscriberList></SubscriberList>,
      },
      {
        path: "sms",
        element: <Sms></Sms>,
      },
      {
        path: "added-addvideotutorial",
        element: <AddedAddVideoTutorial></AddedAddVideoTutorial>,
      },
      {
        path: "addvideotutorial-list",
        element: <AddVideoTutorialList></AddVideoTutorialList>,
      },
      {
        path: "added-softwareUsers",
        element: <AddedSoftwareUsers></AddedSoftwareUsers>,
      },
      {
        path: "softwareUsersList",
        element: <SoftwareUsersList></SoftwareUsersList>,
      },
      {
        path: "tinymceEditor",
        element: <TinyMCEEditor></TinyMCEEditor>,
      },
      {
        path: "article-list",
        element: <ArticleList></ArticleList>,
      },
      {
        path: "registeredUser-list",
        element: <RegisteredUserList></RegisteredUserList>,
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: "saving-transaction",
        element: <FindSavingMember></FindSavingMember>
      },
      {
        path: "saving-transaction/:id",
        element: <SavingTransaction></SavingTransaction>
      },
      {
        path: "loan-transaction",
        element: <FindLoanMember></FindLoanMember>
      },
      {
        path: "loan-transaction/:id",
        element: <LoanTransaction></LoanTransaction>
      },
      {
        path: "dps-collection",
        element: <FindDpsAccount></FindDpsAccount>
      },
      {
        path: "dps-collection/:id",
        element: <DpsCollection></DpsCollection>
      },
      {
        path: "today-collection",
        element: <TodayTransaction></TodayTransaction>
      },
    ],
  },
]);

export default router;
