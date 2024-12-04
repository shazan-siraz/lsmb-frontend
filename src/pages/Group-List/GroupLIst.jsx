import { useForm } from "react-hook-form";
import {
  useCreateGroupMutation,
  useGetAllGroupQuery,
} from "../../redux/features/groupList/groupListApi";
import "./GroupList.css";
import GroupTable from "./GroupTable";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";

const GroupLIst = () => {
  const { register, handleSubmit, reset } = useForm();
  const { email } = useSelector(useCurrentUser);

  const { data: singleBranchData, isLoading: getBranchQueryLoading} = useGetSingleBranchQuery(email);

  const [addGroup, { isLoading: groupCreatingLoading }] =
    useCreateGroupMutation();

  const { data: groupData, isLoading: groupGetLoading } = useGetAllGroupQuery();

if(getBranchQueryLoading || groupGetLoading) {
  return <p>Loading...</p>
}

  const onSubmit = async (data) => {
    try {
      const groupData = {
        groupCode: data?.groupCode,
        groupTitle: data?.groupTitle,
        branchEmail: email,
        companyEmail: singleBranchData?.data.companyEmail,
        branch: singleBranchData?.data._id,
      };

      const res = await addGroup(groupData);
      if (res?.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Group Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (groupGetLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="px-5 py-2">
        <h1 className="text-2xl font-bold">Group List</h1>
      </div>
      <div className="border-b border-gray-400"></div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5 items-center py-5 px-5">
            <div className="flex flex-col">
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="name"
                placeholder="Group Code"
                {...register("groupCode")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="name"
                placeholder="Group Title"
                {...register("groupTitle")}
                required={true}
              />
            </div>

            <div className="text-left">
              <input
                className="border border-green-500 py-2 px-5 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                type="submit"
                value={groupCreatingLoading ? "Loading..." : "Submit"}
                disabled={groupCreatingLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <div>
        <div className="p-5">
          <table className="employeeTable">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Code</th>
                <th className="text-center">Title</th>
                <th className="text-center">Created</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {groupData?.data.map((item, index) => (
                <GroupTable
                  item={item}
                  key={item._id}
                  index={index}
                ></GroupTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupLIst;
