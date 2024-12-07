import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";

const FieldOfficerSidebar = () => {
  const { role } = useSelector(useCurrentUser);

  return (
    <div>
      {role === "fieldOfficer" && (
        <>
          <NavLink to="/dashboard/all-members">
            <div className="dropDownStyle ">
              <div className="flex gap-5">
                <FaUser className="w-5 h-5 text-slate-400" />
                <p className="font-semibold uppercase">Membership</p>
              </div>
            </div>
          </NavLink>
          <NavLink to="/dashboard/loan-request">
            <div className="dropDownStyle ">
              <div className="flex gap-5">
                <HiHomeModern className="w-5 h-5 text-slate-400" />
                <p className="font-semibold uppercase">Loan Request</p>
              </div>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default FieldOfficerSidebar;
