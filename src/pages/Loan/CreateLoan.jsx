import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import {
  useGetAllMembershipQuery,
  useSearchMemberQuery,
} from "../../redux/features/membership/membershipApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { Divider } from "antd";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import {
  useCreateLoanMutation,
  useGetLastLoanDocumentQuery,
} from "../../redux/features/loan/loanApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash/debounce";
import { FaMinus } from "react-icons/fa";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useBranchWallet } from "../../hooks/useBranchWallet";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";

const CreateLoan = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit, reset } = useForm();
  const selectRef = useRef(null);
  const guarantorRef = useRef();
  const [selectedRefValue, setSelectedRefValue] = useState("");
  const [guarantorRefValue, setGuarantorRefValue] = useState("employee");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoanAmount, setIsLoanAmount] = useState("");
  const [percentOfInterest, setPercentOfInterest] = useState("");
  const [attachments, setAttachments] = useState([{}]);
  const [nominees, setNominees] = useState([{ id: Date.now() }]);
  const [installmentNumber, setInstallmentNumber] = useState();
  const { branchWallet } = useBranchWallet();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [membership, setIsMembership] = useState();
  const [memberId, setMemberId] = useState();
  const [memberPhone, setMemberPhone] = useState();
  const [memberName, setMemberName] = useState();

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce
    handler();
    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  const { data: searchMemberData } = useSearchMemberQuery({
    query: debouncedQuery || undefined,
    email: branchEmail,
  });

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // যদি ইনপুট ফিল্ড খালি না থাকে, তাহলে ড্রপডাউন দেখান
    setDropdownVisible(query.length > 0);
  };

  const handleSelect = (id, memberName, memberId, memberPhone) => {
    setSearchQuery(memberName); // নির্বাচিত নাম ইনপুটে সেট করা হবে
    setMemberId(memberId);
    setMemberName(memberName);
    setMemberPhone(memberPhone);
    setIsMembership(id);
    setDropdownVisible(false); // ড্রপডাউন বন্ধ করা হবে
  };

  const handleAddNominee = () => {
    setNominees([...nominees, { id: Date.now() }]);
  };

  // Delete a nominee row
  const handleDeleteNominee = (id) => {
    setNominees(nominees.filter((nominee) => nominee.id !== id));
  };

  const { data: branchData, isLoading: branchLoading } = useGetSingleBranchQuery(branchEmail);
  const { data: memberShipData } = useGetAllMembershipQuery(branchEmail);
    useGetLastLoanDocumentQuery(branchEmail);
  const { data: employeeData } = useGetAllEmployeeQuery(branchEmail);
  const [createLoan] = useCreateLoanMutation();

 

  const companyEmail = branchData?.data?.company?.companyEmail;

  if (branchLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const handleSelectChange = () => {
    const selectedValue = selectRef.current.value;
    setSelectedRefValue(selectedValue);
  };

  const handleGuarantorChange = () => {
    const guarantorRefValue = guarantorRef.current.value;
    setGuarantorRefValue(guarantorRefValue);
  };

  // Function to add a new attachment input
  const addAttachmentField = () => {
    setAttachments([...attachments, {}]);
  };

  // Function to remove an attachment input
  const removeAttachmentField = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      if (branchWallet < Number(data?.loanAmount)) {
        toast.error("Insufficient Balance!");
        setIsLoading(false);
      }

      // Map through all image files and upload each to Cloudinary
      const attachmentImageUrls =
        data.attachment[0].length > 0
          ? await Promise.all(
              data.attachment.map(async (attachments) => {
                const imageUrl = await uploadImageToCloudinary(attachments[0]);
                return imageUrl;
              })
            )
          : [];

      const loanData = {
        memberOfApplying: membership,
        memberId: memberId,
        memberName: memberName,
        memberPhone: memberPhone,
        branchEmail: branchEmail,
        companyEmail: companyEmail,
        startDate: data.startDate,
        endDate: data.endDate,
        loanAmount: data.loanAmount,
        percentageOfInterest: data.percentageOfInterest,
        processFees: Number(data.processFees),
        insurance: data.insurance,
        installmentMode: {
          numberOfInstallment: data.numberOfInstallment,
          installType: data.installType,
          totalReceivable: data.totalReceivable,
        },
        installmentAmount: data.installmentAmount,
        attachment: attachmentImageUrls,
        loanType: data.loanType,
        guarantorEmployee: data.guarantorEmployee || null,
        gurantorMember: data.guarantorMember || null,
        loanGuarantor: data.loanGuarantor,
        status: "Pending",
      };

      const res = await createLoan(loanData);

      if (res?.data?.data) {
        toast.success("Loan Created Successfully.")
        reset();
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.success(err.message);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex justify-between px-5 pt-2">
        <h1 className="uppercase">Loan Disbursement</h1>
        <NavLink to="/dashboard/loan-request" className="border-2 px-3 rounded">
          <button>Pending Loan List</button>
        </NavLink>
      </div>
      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            <div className="flex flex-col ">
              <label className="font-semibold" htmlFor="memberOfLoanApplying">
                Member Of Loan Applying*
              </label>
              <div className="relative w-full">
                {/* ইনপুট ফিল্ড */}
                <input
                  type="text"
                  className="py-2 px-2 my-1 rounded-sm membershipInput border w-full"
                  placeholder="Type Member Name Or Phone No"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setDropdownVisible(searchQuery.length > 0)} // ইনপুটে ফোকাস করলে ড্রপডাউন দেখাবে
                />

                {/* ড্রপডাউন মেনু */}
                {isDropdownVisible && searchMemberData?.data?.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full rounded-sm max-h-40 overflow-y-auto">
                    {searchMemberData?.data?.map((item) => (
                      <li
                        key={item._id}
                        className="py-2 px-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleSelect(
                            item._id,
                            item.memberName,
                            item.memberId,
                            item.phoneNo
                          )
                        }
                      >
                        {item.memberName} - {item.phoneNo}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
                onChange={(e) => setIsLoanAmount(e.target.value)}
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
                onChange={(e) => setPercentOfInterest(e.target.value)}
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
                required
                defaultValue=""
                ref={selectRef} // Attach ref to the select element
                onChange={handleSelectChange} // Handle the change event
              >
                <option value="" disabled>
                  Select Installment Mode
                </option>
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
                  onChange={(e) => setInstallmentNumber(e.target.value)}
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select Install Type
                </option>
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
                  value={
                    Number(isLoanAmount) +
                    Number((isLoanAmount / 100) * percentOfInterest)
                  }
                  readOnly
                />
              </div>
            )}

            {/* Conditionally render based on selectedRefValue */}
            {selectedRefValue === "installment" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="installmentAmount">
                  Installment Amount
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="number"
                  id="installmentAmount"
                  placeholder="Installment Amount"
                  {...register("installmentAmount")}
                  required={true}
                  value={(
                    (Number((isLoanAmount / 100) * percentOfInterest) +
                      Number(isLoanAmount)) /
                    installmentNumber
                  ).toFixed(2)}
                  readOnly
                />
              </div>
            )}

            {/* Conditionally render based on selectedRefValue */}
            {selectedRefValue === "interest" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="interestAmount">
                  Interest Amount
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  type="number"
                  id="interestAmount"
                  placeholder="Interest Amount"
                  {...register("interestAmount")}
                  required={true}
                  value={(isLoanAmount / 100) * percentOfInterest}
                  readOnly
                />
              </div>
            )}

            {attachments.map((_, index) => (
              <div className="flex" key={index}>
                <div>
                  <label
                    className="font-bold gap-3"
                    htmlFor={`attachment-${index}`}
                  >
                    Attachment:
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm employeeInput"
                    type="file"
                    id={`attachment-${index}`}
                    placeholder="Profile Image"
                    {...register(`attachment[${index}]`)}
                  />
                </div>
                {index > 0 && (
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      className="ml-2 px-2 py-2 bg-red-500 text-white rounded"
                      onClick={() => removeAttachmentField(index)}
                    >
                      <FaMinus></FaMinus>
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center">
              <button
                type="button"
                className=" px-4 py-2 bg-slate-400 hover:bg-slate-500 transition-all duration-300 ease-in-out text-white rounded-md"
                onClick={addAttachmentField}
              >
                Add More Attachment
              </button>
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select Loan Type
                </option>
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
                required
                ref={guarantorRef} // Attach ref to the select element
                onChange={handleGuarantorChange} // Handle the change event
              >
                <option value="" disabled>
                  Select Guarantor Type
                </option>
                <option value="employee">Employee</option>
                <option value="member">Member</option>
              </select>
            </div>

            {/* Conditionally render based on guarantorRefValue */}
            {guarantorRefValue === "employee" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="guarantorEmployee">
                  Guarantor Employee*
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="guarantorEmployee"
                  {...register("guarantorEmployee")}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select Guarantor Employee
                  </option>
                  {employeeData?.data.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.employeeName}
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
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select Guarantor Member
                  </option>
                  {memberShipData?.data.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.memberName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex">
            <div className=" flex items-center">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                type="button"
                onClick={handleAddNominee}
              >
                Add
              </button>
            </div>
            <Divider className="uppercase">Loan Guarantor</Divider>
          </div>

          <div>
            {nominees.map((nominee, index) => (
              <div key={nominee.id} className="grid grid-cols-5 gap-5 my-4">
                <div className="flex flex-col">
                  <label className="font-semibold" htmlFor={`name-${index}`}>
                    Name*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="text"
                    id={`name-${index}`}
                    placeholder="Name"
                    {...register(`loanGuarantor[${index}].name`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold" htmlFor={`phone-${index}`}>
                    Phone*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="number"
                    id={`phone-${index}`}
                    placeholder="Nominee Phone"
                    {...register(`loanGuarantor[${index}].phone`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold" htmlFor={`nid-${index}`}>
                    NID*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="number"
                    id={`nid-${index}`}
                    placeholder="Nominee NID"
                    {...register(`loanGuarantor[${index}].nid`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`bankAccount-${index}`}
                  >
                    Back Account
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="text"
                    id={`bankAccount-${index}`}
                    placeholder="Nominee Relation"
                    {...register(`loanGuarantor[${index}].bankAccount`)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteNominee(nominee.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded h-10 self-end"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="text-center py-5">
            <button
              className="border border-blue-500 py-2 px-5 rounded
            hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default CreateLoan;
