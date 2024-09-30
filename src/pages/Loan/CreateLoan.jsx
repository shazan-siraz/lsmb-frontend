import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { Divider } from "antd";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import { useCreateLoanMutation } from "../../redux/features/loan/loanApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLoan = () => {
  const { register, handleSubmit, reset } = useForm();
  const selectRef = useRef(null);
  const guarantorRef = useRef(null);
  const [selectedRefValue, setSelectedRefValue] = useState("");
  const [guarantorRefValue, setGuarantorRefValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: memberShipData } = useGetAllMembershipQuery();
  const { data: employeeData } = useGetAllEmployeeQuery();
  const [createLoan] = useCreateLoanMutation();

  const handleSelectChange = () => {
    const selectedValue = selectRef.current.value;
    setSelectedRefValue(selectedValue);
  };

  const handleGuarantorChange = () => {
    const guarantorRefValue = guarantorRef.current.value;
    setGuarantorRefValue(guarantorRefValue);
  };

  console.log(guarantorRefValue);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const [attachmentImageUrl, loanGurantorDocImageUrl] = await Promise.all([
        uploadImageToCloudinary(data.attachment[0]),
        uploadImageToCloudinary(data.attDocument[0]),
      ]);

      const loanData = {
        memberOfApplying: data.memberOfApplying,
        startDate: data.startDate,
        endDate: data.endDate,
        loanNo: data.loanNo,
        loanAmount: data.loanAmount,
        percentageOfInterest: data.percentageOfInterest,
        processFees: data.processFees,
        insurance: data.insurance,
        installmentMode: {
          numberOfInstallment: data.numberOfInstallment,
          installType: data.installType,
          totalReceivable: data.totalReceivable,
        },
        installmentAmount: data.installmentAmount,
        attachment: attachmentImageUrl,
        loanType: data.loanType,
        guarantorUser: data.guarantorUser,
        gurantorMember: data.gurantorMember,
        loanGuarantor: {
          name: data.name,
          phone: data.phone,
          nid: data.nid,
          bankAc: data.bankAc,
          attDocument: loanGurantorDocImageUrl,
        },
        status: "Pending",
      };

      const res = await createLoan(loanData);

      if (res?.data?.data) {
        toast.success("Loan is Created Successfully");
        reset();
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.success(err.message);
    }
  };

  return (
    <div className="bg-[#EBECED] h-screen">
      <div className="flex justify-between px-5 pt-2">
        <h1 className="uppercase">Loan Disbursement</h1>
        <NavLink to="/dashboard/all-members">
          <button>Active Loan List</button>
        </NavLink>
      </div>
      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberOfApplying">
                Member Of Applying*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="memberOfApplying"
                {...register("memberOfApplying")}
                required={true}
              >
                <option>Select Loan Member</option>
                {memberShipData?.data.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item.memberName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="startDate">
                Start Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="Date"
                id="startDate"
                {...register("startDate")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="endDate">
                End Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="Date"
                id="endDate"
                {...register("endDate")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="loanNo">
                Loan No*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="endDate"
                placeholder="Loan No"
                {...register("loanNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="loanAmount">
                Loan Amount*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="loanAmount"
                placeholder="Loan Amount"
                {...register("loanAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="percentageOfInterest">
                Percentage Of Interest*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="percentageOfInterest"
                placeholder="Enter Percentage"
                {...register("percentageOfInterest")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="processFess">
                Process Fees
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="processFess"
                placeholder="Enter Processing Fees"
                {...register("processFees")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="insurance">
                Insurance
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="insurance"
                placeholder="Enter Insurance"
                {...register("insurance")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installmentMode">
                Installment Mode*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="installmentMode"
                ref={selectRef} // Attach ref to the select element
                onChange={handleSelectChange} // Handle the change event
              >
                <option value="">Select Installment Mode</option>
                <option value="installment">Installment</option>
                <option value="interest">Interest</option>
              </select>
            </div>

            {/* Conditionally render based on selectedRefValue */}
            {selectedRefValue === "installment" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="numberOfInstallment">
                  Number Of Installment
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="number"
                  id="numberOfInstallment"
                  placeholder="Enter Total Paid Days"
                  {...register("numberOfInstallment")}
                  required={true}
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installType">
                Install Type
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="installType"
                {...register("installType")}
                required={true}
              >
                <option>Select Install Type</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            {/* Conditionally render based on selectedRefValue */}
            {selectedRefValue === "installment" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="totalReceivable">
                  Total Receivable
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="text"
                  id="totalReceivable"
                  placeholder="Enter Total Receivable"
                  {...register("totalReceivable")}
                  required={true}
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="installmentAmount">
                Installment Amount
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="installmentAmount"
                placeholder="Installment Amount"
                {...register("installmentAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="attachment">
                Attachment
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="attachment"
                {...register("attachment")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="loanType">
                Loan Type
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="loanType"
                {...register("loanType")}
                required={true}
              >
                <option>Select Loan Type</option>
                <option value="Personal">Personal</option>
                <option value="Payday">Payday</option>
                <option value="DPS">DPS</option>
                <option value="FDR">FDR</option>
                <option value="Saving">Saving</option>
                <option value="Card">Card</option>
                <option value="Home">Home</option>
                <option value="Car">Car</option>
                <option value="Business">Business</option>
                <option value="Gold">Gold</option>
                <option value="Education">Education</option>
                <option value="Consumer">Consumer</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="guarantorType">
                Guarantor Type
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="guarantorType"
                ref={guarantorRef} // Attach ref to the select element
                onChange={handleGuarantorChange} // Handle the change event
              >
                <option>Select Guarantor Type</option>
                <option value="user">User</option>
                <option value="member">Member</option>
              </select>
            </div>

            {/* Conditionally render based on guarantorRefValue */}
            {guarantorRefValue === "user" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="guarantorUser">
                  Guarantor User*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="guarantorUser"
                  {...register("guarantorUser")}
                  required={true}
                >
                  <option>Select Guarantor User</option>
                  {employeeData?.data.map((item) => (
                    <option key={item._id} value={item?.name}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Conditionally render based on guarantorRefValue */}
            {guarantorRefValue === "member" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="guarantorMember">
                  Guarantor Member*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="guarantorMember"
                  {...register("guarantorMember")}
                  required={true}
                >
                  <option>Select Guarantor Member</option>
                  {memberShipData?.data.map((item) => (
                    <option key={item._id} value={item?.memberName}>
                      {item?.memberName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <Divider className="uppercase">Loan Guarantor</Divider>

          <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="guarantorName">
                Guarantor Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="guarantorName"
                placeholder="Guarantor Name"
                {...register("name")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="guarantorPhone">
                Guarantor Phone*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="guarantorPhone"
                placeholder="Guarantor Phone"
                {...register("phone")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="guarantorNid">
                Guarantor NID*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="guarantorNid"
                placeholder="Guarantor NID"
                {...register("nid")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="bankAc">
                Bank ACC*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="bankAc"
                placeholder="Bank Acc"
                {...register("bankAc")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="attDoc">
                Attachment Document*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="attDoc"
                {...register("attDocument")}
                required={true}
              />
            </div>
          </div>

          <div className="text-center py-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              value={isLoading ? "Loading..." : "Submit"}
              disabled={isLoading}
            />
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default CreateLoan;
