import { NavLink } from "react-router-dom";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { FaEdit } from "react-icons/fa";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useEffect, useState } from "react";

const AllMembers = () => {
  const { branchEmail } = useGetBranchEmail();
  const [editRowId, setEditRowId] = useState(null); // Store the ID of the row being edited
  const { data, isLoading: membersDataLoading } =
    useGetAllMembershipQuery(branchEmail);

  const handleShowEdit = (id, event) => {
    event.stopPropagation(); // Prevent click event from propagating
    setEditRowId((prevId) => (prevId === id ? null : id)); // Toggle edit state for specific row
  };

  const handleClickOutside = (event) => {
    const popup = document.querySelector(".popup");
    if (popup && !popup.contains(event.target)) {
      setEditRowId(null);
    }
  };

  useEffect(() => {
    // Add event listener for outside click
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (membersDataLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const handleEditMember = (id) => {
    console.log(id);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-5 pt-5 flex justify-between">
        <h1>Member List: {data?.data.length}</h1>
        <NavLink to="/dashboard/membership-create">
          <button className="border-2 hover:bg-slate-500 font-semibold hover:text-white transition-all duration-300 ease-in-out px-3 py-1 rounded">
            Add New Member
          </button>
        </NavLink>
      </div>

      <div className="p-5">
        <table className="employeeTable">
          <thead>
            <tr className="uppercase font-semibold">
              <th className="text-center">ID</th>
              <th className="text-center">Member Name</th>
              <th className="text-center">Member Phone</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Group</th>
              <th className="text-center">Reference</th>
              <th className="text-center">Join Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr key={item._id}>
                <td>{item.memberId}</td>
                <td>{item.memberName}</td>
                <td>{item.phoneNo}</td>
                <td>{item.gender}</td>
                <td>{item.group?.groupTitle}</td>
                <td>
                  {item?.referenceEmployee
                    ? item.referenceEmployee.employeeName
                    : item?.referenceMember
                    ? item.referenceMember.memberName
                    : null}
                </td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td>
                  <div
                    onClick={(event) => handleShowEdit(item._id, event)}
                    className="flex justify-center items-center relative cursor-pointer py-1"
                  >
                    <FaEdit />
                  </div>

                  {editRowId === item._id && (
                    <div className="popup z-10 bg-white shadow-md flex flex-col w-[150px] rounded py-2 absolute right-[25px]">
                      <NavLink
                        to={`/dashboard/updateMembership/${item._id}`}
                        className="text-start hover:bg-slate-100 px-3 py-1 uppercase font-semibold"
                      >
                        Edit
                      </NavLink>
                      <button className="text-start hover:bg-slate-100 px-3 py-1 uppercase font-semibold">
                        Profile
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMembers;
