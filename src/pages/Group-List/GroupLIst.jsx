import { useForm } from "react-hook-form";
import {
  useCreateGroupMutation,
  useGetAllGroupQuery,
} from "../../redux/features/groupList/groupListApi";
import "./GroupList.css";
import GroupTable from "./GroupTable";

const GroupLIst = () => {
  const { register, handleSubmit } = useForm();

  const [addGroup, { isLoading: groupCreatingLoading }] =
    useCreateGroupMutation();

  const { data: groupData, isLoading: groupGetLoading } = useGetAllGroupQuery();

  const onSubmit = async (data) => {
    try {
      const res = await addGroup(data);
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  };

  if (groupGetLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
