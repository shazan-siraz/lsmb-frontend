import { NavLink } from "react-router-dom";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

const AllMembers = () => {
  const { data, isLoading: membersDataLoading } = useGetAllMembershipQuery();

  if (membersDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="px-5 flex justify-between">
        <h1>Member List: {data?.data.length}</h1>
        <NavLink to="/dashboard/membership-create">
          <button>Add New Member</button>
        </NavLink>
      </div>

      <div className="p-5">
        <table className="employeeTable">
          <thead>
            <tr className="uppercase font-semibold">
              <th>SL</th>
              <th>Member Name</th>
              <th>Membership ID</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Relative</th>
              <th>Group</th>
              <th>User</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1} </td>
                <td>{item.memberName}</td>
                <td>{item.memberId}</td>
                <td>{item.phoneNo}</td>
                <td>{item.gender}</td>
                <td>{item.nominee.nomineeRelation}</td>
                <td>{item.groupName}</td>
                <td>{item.referenceUser}</td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.status}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMembers;
