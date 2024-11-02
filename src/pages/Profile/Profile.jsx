import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import BranchProfilePage from "./BranchProfile/BranchProfilePage";
import SuperAdminProfile from "./SuperAdminProfile/SuperAdminProfile";
import AdminProfile from "./AdminProfile/AdminProfile";

const Profile = () => {
  const { role } = useSelector(useCurrentUser);

  if (role === "superAdmin") {
    return <SuperAdminProfile></SuperAdminProfile>;
  }

  if (role === "admin") {
    return <AdminProfile></AdminProfile>;
  }

  if (role === "branch") {
    return <BranchProfilePage></BranchProfilePage>;
  }

  return (
    <div>
      <h1>this is profile page</h1>
    </div>
  );
};

export default Profile;
