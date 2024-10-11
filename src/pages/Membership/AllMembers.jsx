import { NavLink } from "react-router-dom";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { FaEdit } from "react-icons/fa";

const AllMembers = () => {
  const { data, isLoading: membersDataLoading } = useGetAllMembershipQuery();

  if (membersDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="px-5 pt-5 flex justify-between">
        <h1>Member List: {data?.data.length}</h1>
        <NavLink to="/dashboard/membership-create">
          <button>Add New Member</button>
        </NavLink>
      </div>

      <div className="p-5">
        <table className="employeeTable">
          <thead>
            <tr className="uppercase font-semibold">
              <th className="text-center">SL</th>
              <th className="text-center">Member Name</th>
              <th className="text-center">Membership ID</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Relative</th>
              <th className="text-center">Group</th>
              <th className="text-center">Reference</th>
              <th className="text-center">Join Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item.memberName}</td>
                <td>{item.memberId}</td>
                <td>{item.phoneNo}</td>
                <td>{item.gender}</td>
                <td>{item.nominee.nomineeRelation}</td>
                <td>{item.group.groupTitle}</td>
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
                  <div className="flex justify-center items-center">
                    <FaEdit />
                  </div>
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
