import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useGetSingleSuperAdminQuery } from "../../../redux/features/superAdmin/superAdmin";
import defaultProfileImg from "../../../assets/icons/userProfile.png";

const SuperAdminProfile = () => {
  const { email } = useSelector(useCurrentUser);

  const { data: superAdminData, isLoading: superAdminQueryLoading } =
    useGetSingleSuperAdminQuery(email);

  if (superAdminQueryLoading) {
    return <p>Loading...</p>;
  }

  const {
    email: superAdminEmail,
    user,
    name,
    contactNo,
    presentAddress,
    permanentAddress,
  } = superAdminData.data;

  return (
    <div className="pt-20">
      <div className="bg-white max-w-[1000px] rounded-xl mx-auto flex justify-evenly py-20">
        <div>
          <img
            className="w-[100px] mx-auto py-5"
            src={defaultProfileImg}
            alt="Profile Image"
          />
          <p className="font-bold text-[30px] border-b-2 text-slate-500">
            {name?.firstName} {name?.lastName}
          </p>
          <p className="text-[20px] font-semibold py-2 border-b-2">{superAdminEmail}</p>
          <p className="text-[20px] font-semibold py-2 border-b-2">Role: {user.role}</p>
        </div>

        <div className="border-r-2"></div>

        <div className="flex flex-col justify-center">
          <h2 className="font-bold text-[30px] border-b-2 py-3 text-slate-500">Your Profile</h2>
          <p className="text-[20px] font-semibold py-3 border-b-2">
            Name: {name?.firstName} {name?.lastName}
          </p>
          <p className="text-[20px] font-semibold py-3 border-b-2 ">Mobile: {contactNo}</p>
          <p className="text-[20px] font-semibold py-3 border-b-2">Present Address: {presentAddress}</p>
          <p className="text-[20px] font-semibold py-3 border-b-2">Permanent Address: {permanentAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile;
