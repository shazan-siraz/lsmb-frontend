/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { useUpdateGroupMutation } from "../../redux/features/groupList/groupListApi";
import { FaEdit } from "react-icons/fa";


const GroupModal = ({ modalData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const showModal = () => {
    setOpen(true);
  };

  const [updateGroup, { isLoading: groupUpdateLoading }] = useUpdateGroupMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const groupDataUpdate = {
        _id: modalData._id,
        groupCode: data.groupCode,
        groupTitle: data.groupTitle,
      };

      const res = await updateGroup(groupDataUpdate);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p onClick={showModal}><FaEdit /></p>
      <Modal
        open={open}
        title="Quick Access"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5 items-center py-5 px-5">
              <div className="flex flex-col">
                <input
                  className="py-2 px-2 my-1 rounded-sm employeeInput"
                  type="number"
                  id="name"
                  defaultValue={modalData.groupCode}
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
                  defaultValue={modalData.groupTitle}
                  placeholder="Group Title"
                  {...register("groupTitle")}
                  required={true}
                />
              </div>

              <div className="text-left">
                <input
                  onClick={ groupUpdateLoading ? null : handleCancel}
                  className="border border-green-500 py-2 px-5 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                  type="submit"
                  value={groupUpdateLoading ? "Loading..." : "Submit"}
                  disabled={groupUpdateLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default GroupModal;
