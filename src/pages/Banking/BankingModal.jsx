/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useUpdateBankingMutation } from "../../redux/features/banking/bankingApi";
import { useDispatch } from "react-redux";
import { setToastMessage } from "../../redux/features/auth/toastSlice";

const BankingModal = ({ modalData }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const [updateBanking, { isLoading: updateBankingLoading }] =
    useUpdateBankingMutation();

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const updateData = {
        id: modalData._id,
        bankUpdateData: {
          bankName: data?.bankName,
          shortName: data?.shortName,
          holderName: data?.holderName,
          acNo: data?.acNo,
          status: data?.status,
        },
      };

      const res = await updateBanking(updateData);
    
      if (res?.data) {
        dispatch(setToastMessage("Banking Updated Successfully!"));
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p onClick={showModal}>
        <FaEdit />
      </p>
      <Modal
        open={open}
        className="text-[25px]"
        title="Update Banking"
        onCancel={handleCancel}
        footer={[]}
      >
        <div>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-3 items-center py-5 px-5">
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="bankingName">
                  Bank Name*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="bankingName"
                  defaultValue={modalData?.bankName}
                  placeholder="Bank Name"
                  {...register("bankName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="shortName">
                  Short Name*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="shortName"
                  defaultValue={modalData?.shortName}
                  placeholder="Bank Name"
                  {...register("shortName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="holderName">
                  Holder Name*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="holderName"
                  defaultValue={modalData?.holderName}
                  placeholder="Bank Name"
                  {...register("holderName")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="acNo">
                  A/C No*
                </label>
                <input
                  className="py-2 px-2 my-1 border rounded employeeInput"
                  type="text"
                  id="acNo"
                  defaultValue={modalData?.acNo}
                  placeholder="A/C No"
                  {...register("acNo")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold" htmlFor="status">
                  Status*
                </label>
                <select
                  className="py-2 px-2 my-1 border rounded-sm membershipInput"
                  id="status"
                  required
                  defaultValue={modalData?.status}
                  {...register("status")}
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <input
                onClick={updateBankingLoading ? null : handleCancel}
                className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                type="submit"
                value={updateBankingLoading ? "Loading..." : "Submit"}
                disabled={updateBankingLoading}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BankingModal;
