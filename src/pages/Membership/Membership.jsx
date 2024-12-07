import { useForm } from "react-hook-form";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import "./Membership.css";
import { useGetAllGroupQuery } from "../../redux/features/groupList/groupListApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";
import { useRef, useState } from "react";
import {
  useCreateMembershipMutation,
  useGetAllMembershipQuery,
} from "../../redux/features/membership/membershipApi";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Divider } from "antd";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { FaMinus } from "react-icons/fa";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";

const Membership = () => {
  const { branchEmail } = useGetBranchEmail();
  const { register, handleSubmit, reset } = useForm();
  const [age, setAge] = useState("");
  const selectRef = useRef(null);
  const [selectedRefValue, setSelectedRefValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState([{}]);

  const [nominees, setNominees] = useState([{ id: Date.now() }]);

  const handleAddNominee = () => {
    setNominees([...nominees, { id: Date.now() }]);
  };

  // Delete a nominee row
  const handleDeleteNominee = (id) => {
    setNominees(nominees.filter((nominee) => nominee.id !== id));
  };

  const [addMembership, { isLoading: membershipLoading }] =
    useCreateMembershipMutation();

  const { data: groupData, isLoading: groupQueryLoading } =
    useGetAllGroupQuery(branchEmail);
  const { data: employeeData, isLoading: employeeQueryLoading } =
    useGetAllEmployeeQuery(branchEmail);
  const { data: membershipData, isLoading: membersQueryLoading } =
    useGetAllMembershipQuery(branchEmail);

  const { data: branchData, isLoading: branchQueryLoading } =
    useGetSingleBranchQuery(branchEmail);

  if (
    groupQueryLoading ||
    employeeQueryLoading ||
    membersQueryLoading ||
    branchQueryLoading
  ) {
    return <LoadingComponent></LoadingComponent>;
  }

  const companyEmail = branchData?.data?.company?.companyEmail;
  const fieldOfficerEmployee = employeeData?.data.filter(
    (item) => item.userId.role === "fieldOfficer"
  );

  const handleDateChange = (event) => {
    const birthDate = new Date(event.target.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if birth month and day haven't occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge);
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
    setIsLoading(true);
    try {
      // Map through all image files and upload each to Cloudinary
      const uploadedImageUrls = await Promise.all(
        data.attachment.map(async (attachments) => {
          const imageUrl = await uploadImageToCloudinary(attachments[0]);
          return imageUrl;
        })
      );

      const [
        memberPhotoImageUrl,
        memberSignatureImageUrl,
        nidFrontPartImageUrl,
        nidBackPartImageUrl,
      ] = await Promise.all([
        uploadImageToCloudinary(data.memberPhoto[0]),
        uploadImageToCloudinary(data.signature[0]),
        uploadImageToCloudinary(data.nidFrontPart[0]),
        uploadImageToCloudinary(data.nidBackPart[0]),
      ]);

      setIsLoading(false);

      const createMembershipData = {
        branchEmail: branchEmail,
        companyEmail: companyEmail,
        branch: branchData?.data?._id,
        memberName: data.memberName,
        group: data.groupName,
        assignFieldOfficer: data?.assignFieldOfficer,
        phoneNo: data.phoneNo,
        email: data.email,
        memberNid: data.memberNid,
        admissionFees: Number(data.admissionFees),
        accountBalance: Number(data?.shareAmount) || 0,
        dateOfBirth: data.dateOfBirth,
        age: Number(data.age),
        gender: data.gender,
        fatherHusbandName: data.father_husbandName,
        profession: data.profession,
        religion: data.religion,
        district: data.district,
        thana: data.thana,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        memberPhoto: memberPhotoImageUrl,
        signature: memberSignatureImageUrl,
        nidFrontPart: nidFrontPartImageUrl,
        nidBackPart: nidBackPartImageUrl,
        referenceEmployee: data.referenceEmployee,
        referenceMember: data.referenceMember,
        attachments: uploadedImageUrls,
        nominee: data.nominees,
      };

      const res = await addMembership(createMembershipData);

      if (res?.data) {
        toast.success("Member Created Successfully");
        reset();
      }

      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectChange = () => {
    const selectedValue = selectRef.current.value;
    setSelectedRefValue(selectedValue);
  };

  return (
    <div className="bg-[#EBECED]">
      <div className="flex justify-between px-5 pt-2">
        <h1>Make A New Membership</h1>
        <NavLink to="/dashboard/all-members">
          <button className="border border-slate-500 px-3 py-1 rounded font-semibold hover:text-white hover:bg-slate-500 transition-all duration-300 ease-in-out">
            Add New Member
          </button>
        </NavLink>
      </div>
      <div className="border-b border-slate-300 my-3"></div>

      <div className="px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-4 gap-5">
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberName">
                Member Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="memberName"
                placeholder="Member Name"
                {...register("memberName")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="groupName">
                Group Name*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="groupName"
                required
                defaultValue=""
                {...register("groupName")}
              >
                <option value="" disabled>
                  Select Group Name
                </option>
                {groupData?.data?.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item.groupTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="assignFieldOfficer">
                Assign Field Officer*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="assignFieldOfficer"
                required
                defaultValue=""
                {...register("assignFieldOfficer")}
              >
                <option value="" disabled>
                  Select Field Officer
                </option>
                {fieldOfficerEmployee?.map((item) => (
                  <option key={item._id} value={item?._id}>
                    {item?.employeeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="phoneNo">
                Phone No*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="phoneNo"
                placeholder="Phone No"
                {...register("phoneNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberNid">
                NID*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="memberNid"
                placeholder="NID"
                {...register("memberNid")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="admissionFees">
                Admission Fees
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="admissionFees"
                placeholder="Admission Fees"
                {...register("admissionFees")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="shareAmount">
                Share Amount
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="shareAmount"
                placeholder="Share Amount"
                {...register("shareAmount")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="dateOfBirth">
                Date Of Birth*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="date"
                id="dateOfBirth"
                placeholder="Date Of Birth"
                {...register("dateOfBirth")}
                required={true}
                onChange={handleDateChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="age">
                Age*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="age"
                placeholder="Age"
                value={age}
                readOnly
                {...register("age")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="gender">
                Gender*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="gender"
                {...register("gender")}
              >
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="father_husbandName">
                Father/Husband Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="father_husbandName"
                placeholder="Father/Husband Name"
                {...register("father_husbandName")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="profession">
                Profession*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="profession"
                placeholder="Profession"
                {...register("profession")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="religion">
                Religion*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="gender"
                {...register("religion")}
                required={true}
              >
                <option>Select Religion</option>
                <option value="muslim">Muslim</option>
                <option value="hindu">Hindu</option>
                <option value="buddhist">Buddhist</option>
                <option value="christian">Christian</option>
                <option value="chakma">Chakma</option>
                <option value="marma">Marma</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="district">
                District*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="district"
                placeholder="district"
                {...register("district")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="thana">
                Thana*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="thana"
                placeholder="Thana"
                {...register("thana")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="presentAddress">
                Present Address*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="presentAddress"
                placeholder="Present Address"
                {...register("presentAddress")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="permanentAddress">
                Permanent Address
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="permanentAddress"
                placeholder="Permanent Address "
                {...register("permanentAddress")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="memberPhoto">
                Member Photo
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="memberPhoto"
                {...register("memberPhoto")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="signature">
                Signature
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="signature"
                {...register("signature")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="nidFrontPart">
                Nid (Front Part)
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="nidFrontPart"
                {...register("nidFrontPart")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="nidBackPart">
                Nid (Back Part)
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="nidBackPart"
                {...register("nidBackPart")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="referenceType">
                Reference Type
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="referenceType"
                ref={selectRef} // Attach ref to the select element
                onChange={handleSelectChange} // Handle the change event
              >
                <option value="">Select Reference</option>
                <option value="employee">Employee</option>
                <option value="member">Member</option>
              </select>
            </div>

            {/* Conditionally render based on selectedRefValue */}
            {selectedRefValue === "employee" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="referenceEmployee">
                  Reference Employee
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="referenceEmployee"
                  {...register("referenceEmployee")}
                >
                  <option>Select Employee</option>
                  {employeeData?.data?.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.employeeName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedRefValue === "member" && (
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="referenceMember">
                  Reference Member
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="referenceMember"
                  {...register("referenceMember")}
                >
                  <option>Select Member</option>
                  {membershipData?.data?.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.memberName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {attachments.map((_, index) => (
              <div className="flex" key={index}>
                <div>
                  <label className="font-bold" htmlFor={`attachment-${index}`}>
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
          </div>

          <Divider className="uppercase">Member Nominee</Divider>

          <div>
            <button
              type="button"
              onClick={handleAddNominee}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Nominee
            </button>

            {nominees.map((nominee, index) => (
              <div key={nominee.id} className="grid grid-cols-6 gap-5 my-4">
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`nomineeName-${index}`}
                  >
                    Nominee Name*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="text"
                    id={`nomineeName-${index}`}
                    placeholder="Nominee Name"
                    {...register(`nominees[${index}].nomineeName`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`nomineePhone-${index}`}
                  >
                    Nominee Phone*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="number"
                    id={`nomineePhone-${index}`}
                    placeholder="Nominee Phone"
                    {...register(`nominees[${index}].nomineePhone`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`nomineeNid-${index}`}
                  >
                    Nominee NID*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="number"
                    id={`nomineeNid-${index}`}
                    placeholder="Nominee NID"
                    {...register(`nominees[${index}].nomineeNid`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`nomineeRelation-${index}`}
                  >
                    Nominee Relation*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="text"
                    id={`nomineeRelation-${index}`}
                    placeholder="Nominee Relation"
                    {...register(`nominees[${index}].nomineeRelation`)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="font-semibold"
                    htmlFor={`distributation-${index}`}
                  >
                    Distributation*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                    type="number"
                    id={`distributation-${index}`}
                    placeholder="Distributation"
                    {...register(`nominees[${index}].distributation`)}
                    required
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

          <div className="border-b border-slate-300 my-10"></div>

          <div className="text-center pb-10">
            <button
              className="border border-blue-500 py-2 px-5 rounded
            hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
            >
              {isLoading || membershipLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Create Member"
              )}
            </button>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Membership;
