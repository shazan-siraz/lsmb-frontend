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
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

const Membership = () => {
  const { email } = useSelector(useCurrentUser);
  const { register, handleSubmit, reset } = useForm();
  const selectRef = useRef(null);
  const [selectedRefValue, setSelectedRefValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [addMembership, { isLoading: membershipLoading , error}] =
    useCreateMembershipMutation();

  const { data: groupData, isLoading: groupQueryLoading } =
    useGetAllGroupQuery();
  const { data: employeeData, isLoading: employeeQueryLoading } =
    useGetAllEmployeeQuery();
  const { data: membershipData, isLoading: membersQueryLoading } =
    useGetAllMembershipQuery();

  if (groupQueryLoading || employeeQueryLoading || membersQueryLoading) {
    return <p>Loading...</p>;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const [
        memberPhotoImageUrl,
        memberSignatureImageUrl,
        memberPassportNidImageUrl,
        memberChequeBookImageUrl,
      ] = await Promise.all([
        uploadImageToCloudinary(data.memberPhoto[0]),
        uploadImageToCloudinary(data.signature[0]),
        uploadImageToCloudinary(data.passport_nid[0]),
        uploadImageToCloudinary(data.chequeBook[0]),
      ]);

      setIsLoading(false);

      const membershipData = {
        memberName: data.memberName,
        memberId: data.memberId,
        branchEmail: email,
        group: data.groupName,
        assignFieldOfficer: data.assignFieldOfficer,
        phoneNo: data.phoneNo,
        email: data.email,
        memberNid: data.memberNid,
        admissionFees: data.admissionFees,
        shareAmount: data.shareAmount,
        dateOfBirth: data.dateOfBirth,
        age: data.age,
        gender: data.gender,
        fatherHusbandName: data.father_husbandName,
        profession: data.profession,
        religion: data.religion,
        district: data.district,
        thana: data.thana,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        status: data.status,
        accountBalance: 0,
        memberPhoto: memberPhotoImageUrl,
        signature: memberSignatureImageUrl,
        passportOrNid: memberPassportNidImageUrl,
        chequeBook: memberChequeBookImageUrl,
        referenceEmployee: data.referenceEmployee,
        referenceMember: data.referenceMember,
        nominee: {
          nomineeName: data.nominee.nomineeName,
          nomineePhone: data.nominee.nomineeNid,
          nomineeNid: data.nominee.nomineeNid,
          nomineeRelation: data.nominee.nomineeRelation,
          distributation: data.nominee.distributation,
        },
      };

      const res = await addMembership(membershipData);
      console.log(error);

      if (res?.data) {
        toast.success("Branch Created Successfully");
        reset();
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
          <button>Add New Member</button>
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
              <label className="font-semibold" htmlFor="memberId">
                Member ID*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="number"
                id="memberId"
                placeholder="Member ID"
                {...register("memberId")}
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
                {...register("groupName")}
                required={true}
              >
                <option>Select Group Name</option>
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
                {...register("assignFieldOfficer")}
                required={true}
              >
                <option>Select Field Officer</option>
                {employeeData?.data?.map((item) => (
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
                type="number"
                id="phoneNo"
                placeholder="Phone No"
                {...register("phoneNo")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="email">
                Email*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="email"
                id="email"
                placeholder="Email"
                {...register("email")}
                required={true}
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
                type="text"
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
                Father Husband Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                type="text"
                id="father_husbandName"
                placeholder="Father Husband Name"
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
              <label className="font-semibold" htmlFor="status">
                Status*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="status"
                {...register("status")}
                required={true}
              >
                <option>Select Status</option>
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
              </select>
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
              <label className="font-semibold" htmlFor="passport_nid">
                Passport/Nid
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="passport_nid"
                {...register("passport_nid")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="chequeBook">
                Cheque Book
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                type="file"
                id="chequeBook"
                {...register("chequeBook")}
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
          </div>

          <Divider className="uppercase">Member Nominee</Divider>

          <div>
            <div className="grid grid-cols-5 gap-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="nomineeName">
                  Nominee Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="text"
                  id="nomineeName"
                  placeholder="Nominee Name"
                  {...register("nominee.nomineeName")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="nomineePhone">
                  Nominee Phone*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="number"
                  id="nomineePhone"
                  placeholder="Nominee Phone"
                  {...register("nominee.nomineePhone")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="nomineeNid">
                  Nominee NID*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="number"
                  id="nomineeNid"
                  placeholder="Nominee Nid"
                  {...register("nominee.nomineeNid")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="nomineeRelation">
                  Nominee Relation*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="text"
                  id="nomineeRelation"
                  placeholder="Nominee Relation"
                  {...register("nominee.nomineeRelation")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="distributation">
                  Distributation*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="number"
                  id="distributation"
                  placeholder="Distributation"
                  {...register("nominee.distributation")}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-slate-300 my-10"></div>

          <div className="text-center pb-10">
            <input
              className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              value={
                membershipLoading || isLoading ? "Loading..." : "Create Member"
              }
              disabled={membershipLoading || isLoading}
            />
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Membership;
