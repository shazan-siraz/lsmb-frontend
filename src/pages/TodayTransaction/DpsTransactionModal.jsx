/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { useUpdateDpsCollectionMutation } from "../../redux/features/dpsCollection/dpsCollectionApi";

const DpsTransactionModal = ({ dpsModalData }) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const showModal = () => {
        setOpen(true);
    };

    const [updateDpsTxn, { isLoading: updateDpsTransactionLoading }] = useUpdateDpsCollectionMutation();

    const handleCancel = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            const updateDpsTxnData = {
                id: dpsModalData._id,
                dpsCollectionAmount: Number(data.amount),
                penaltyAmount: Number(data.penaltyAmount),
                transactionNote: data.transactionNote,
            };

            await updateDpsTxn(updateDpsTxnData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <p onClick={showModal}>
                <FaEdit className="text-[20px]" />
            </p>
            <Modal
                open={open}
                title={`${dpsModalData?.memberOfApplying?.memberName} DPS Transaction Edit`}
                onCancel={handleCancel}
                footer={[]}
            >
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-5 items-center py-5 px-5">
                            <div className="flex flex-col">
                                <label className="font-semibold" htmlFor="amount">
                                    Amount
                                </label>
                                <input
                                    className="py-2 px-2 my-1 border rounded employeeInput"
                                    type="number"
                                    id="amount"
                                    defaultValue={dpsModalData?.dpsCollectionAmount}
                                    placeholder="Enter Amount"
                                    {...register("amount")}
                                    required={true}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold" htmlFor="penaltyAmount">
                                    Penalty Amount
                                </label>
                                <input
                                    className="py-2 px-2 my-1 border rounded employeeInput"
                                    type="number"
                                    id="penaltyAmount"
                                    defaultValue={dpsModalData?.penaltyAmount}
                                    placeholder="Enter Penalty Amount"
                                    {...register("penaltyAmount")}
                                    required={true}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold" htmlFor="txnNote">
                                    Transaction Note
                                </label>
                                <input
                                    className="py-2 px-2 my-1 border rounded-sm employeeInput"
                                    type="text"
                                    id="txnNote"
                                    defaultValue={dpsModalData?.transactionNote}
                                    placeholder="Transaction Note"
                                    {...register("transactionNote")}
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <input
                                onClick={updateDpsTransactionLoading ? null : handleCancel}
                                className="border border-green-500 transition-all duration-300 ease-in-out py-2 px-10 rounded hover:bg-green-500 hover:text-white cursor-pointer"
                                type="submit"
                                value={updateDpsTransactionLoading ? "Loading..." : "Submit"}
                                disabled={updateDpsTransactionLoading}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default DpsTransactionModal;
