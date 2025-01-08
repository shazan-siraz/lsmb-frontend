import { useParams } from "react-router-dom";
import {
  useGetAllMembershipQuery,
  useGetSingleMembershipQuery,
  useUpdateMembershipMutation,
} from "../../redux/features/membership/membershipApi";
import { useForm } from "react-hook-form";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import "./Membership.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Divider } from "antd";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { FaMinus } from "react-icons/fa";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetAllGroupQuery } from "../../redux/features/groupList/groupListApi";
import { useGetAllEmployeeQuery } from "../../redux/features/employee/employeeApi";

const UpdateMember = () => {
  const { id } = useParams();
  const { branchEmail } = useGetBranchEmail();

  const { data: singleMemberData, isLoading: singleMemberQueryLoading } =
    useGetSingleMembershipQuery(id);

  const { register, handleSubmit, reset, setError, clearErrors } = useForm();
  const [age, setAge] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState([{}]);
  const [memberPhotoError, setMemberPhotoError] = useState("");
  const [signaturePhotoError, setSignaturePhotoError] = useState("");
  const [nidFirstPhotoError, setNidFirstPhotoError] = useState("");
  const [nidSeconedPhotoError, setNidSeconedPhotoError] = useState("");
  const [attachmentsPhotoError, setAttachmentsPhotoError] = useState("");

  useEffect(() => {
    if (
      !singleMemberQueryLoading &&
      singleMemberData?.data?.age !== undefined
    ) {
      setAge(singleMemberData.data.age);
    }
  }, [singleMemberQueryLoading, singleMemberData?.data?.age]);

  useEffect(() => {
    if (singleMemberData?.data) {
      // ডিফল্ট মান একসাথে সেট করা
      reset({
        groupName: singleMemberData?.data?.group?._id || "",
        assignFieldOfficer:
          singleMemberData?.data?.assignFieldOfficer._id || "",
      });
    }
  }, [singleMemberData, reset]);

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const validateMemberPhotoSize = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setMemberPhotoError("Image larger than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image larger than 100kb",
      });
      e.target.value = "";
    } else {
      setMemberPhotoError("");
      clearErrors("imageUrl");
    }
  };

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const handleSignature = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setSignaturePhotoError("Image larger than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image larger than 100kb",
      });
      e.target.value = "";
    } else {
      setSignaturePhotoError("");
      clearErrors("imageUrl");
    }
  };

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const handleNidFirstPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setNidFirstPhotoError("Image larger than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image larger than 100kb",
      });
      e.target.value = "";
    } else {
      setNidFirstPhotoError("");
      clearErrors("imageUrl");
    }
  };

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const handleNidSeconedPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setNidSeconedPhotoError("Image larger than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image larger than 100kb",
      });
      e.target.value = "";
    } else {
      setNidSeconedPhotoError("");
      clearErrors("imageUrl");
    }
  };

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setAttachmentsPhotoError("Image larger than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image larger than 100kb",
      });
      e.target.value = "";
    } else {
      setAttachmentsPhotoError("");
      clearErrors("imageUrl");
    }
  };

  const [nominees, setNominees] = useState([{ id: Date.now() }]);

  const handleAddNominee = () => {
    setNominees([...nominees, { id: Date.now() }]);
  };

  // Delete a nominee row
  const handleDeleteNominee = (id) => {
    setNominees(nominees.filter((nominee) => nominee.id !== id));
  };

  const { data: groupData, isLoading: groupQueryLoading } =
    useGetAllGroupQuery(branchEmail);
  const { data: employeeData, isLoading: employeeQueryLoading } =
    useGetAllEmployeeQuery(branchEmail);
  const { data: membershipData, isLoading: membersQueryLoading } =
    useGetAllMembershipQuery(branchEmail);

  const { data: branchData } = useGetSingleBranchQuery(branchEmail);

  const [updateMembership, { updateMembershipLoading }] =
    useUpdateMembershipMutation();

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

  if (singleMemberQueryLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const {
    _id,
    memberName,
    phoneNo,
    email,
    memberNid,
    dateOfBirth,
    gender,
    fatherHusbandName,
    profession,
    religion,
    district,
    thana,
    presentAddress,
    permanentAddress,
    referenceEmployee,
    referenceMember,
  } = singleMemberData.data;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Check if attachment exists and process it
      const uploadedImageUrls =
        data.attachment[0].length > 0
          ? await Promise.all(
              data.attachment.map(async (attachments) => {
                const imageUrl = await uploadImageToCloudinary(attachments[0]);
                return imageUrl;
              })
            )
          : singleMemberData?.data?.attachments; // Default to an empty array if no attachments

      let memberPhotoImageUrl;

      if (data.memberPhoto[0]) {
        memberPhotoImageUrl = await uploadImageToCloudinary(
          data.memberPhoto[0]
        );
      } else {
        memberPhotoImageUrl = singleMemberData?.data?.memberPhoto;
      }

      let memberSignatureImageUrl;

      if (data.signature[0]) {
        memberSignatureImageUrl = await uploadImageToCloudinary(
          data.signature[0]
        );
      } else {
        memberSignatureImageUrl = singleMemberData?.data?.signature;
      }

      let nidFrontPartImageUrl;

      if (data.nidFrontPart[0]) {
        nidFrontPartImageUrl = await uploadImageToCloudinary(
          data.nidFrontPart[0]
        );
      } else {
        nidFrontPartImageUrl = singleMemberData?.data?.nidFrontPart;
      }

      let nidBackPartImageUrl;

      if (data.nidBackPart[0]) {
        nidBackPartImageUrl = await uploadImageToCloudinary(
          data.nidBackPart[0]
        );
      } else {
        nidBackPartImageUrl = singleMemberData?.data?.nidBackPart;
      }

      setIsLoading(false);

      const dataForUpdate = {
        id: _id,
        updateMembershipData: {
          branchEmail: branchEmail,
          companyEmail: companyEmail,
          branch: branchData?.data?._id,
          memberName: data.memberName,
          group: data.groupName,
          assignFieldOfficer: data?.assignFieldOfficer,
          phoneNo: data.phoneNo,
          email: data.email,
          memberNid: data.memberNid,
          dateOfBirth: data.dateOfBirth,
          age: Number(age),
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
          referenceEmployee: data.referenceEmployee || referenceEmployee,
          referenceMember: data.referenceMember || referenceMember,
          attachments: uploadedImageUrls,
          nominee: data.nominees,
        },
      };

      const res = await updateMembership(dataForUpdate);

      if (res?.data) {
        toast.success("Member Updated Successfully");
        reset();
      }

      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-slate-100">
        <div className="flex justify-between items-center px-5 pt-2">
          <h1 className="font-bold text-[22px]">Update Membership</h1>
          <NavLink to="/dashboard/membership-create">
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
                  defaultValue={memberName}
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
                  defaultValue={singleMemberData?.data?.group?.groupTitle}
                  {...register("groupName")}
                >
                  <option value="" disabled>
                    {groupQueryLoading
                      ? "Loading Groups..."
                      : "Select Group Name"}
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
                  defaultValue={
                    singleMemberData?.data?.assignFieldOfficer?.employeeName
                  }
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
                  defaultValue={phoneNo}
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
                  defaultValue={email}
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
                  defaultValue={memberNid}
                  {...register("memberNid")}
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
                  defaultValue={dateOfBirth}
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
                  defaultValue={age}
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
                  required
                  defaultValue={gender}
                  {...register("gender")}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
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
                  defaultValue={fatherHusbandName}
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
                  defaultValue={profession}
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
                  required
                  defaultValue={religion}
                  {...register("religion")}
                >
                  <option value="" disabled>
                    Select Religion
                  </option>
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
                  defaultValue={district}
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
                  defaultValue={thana}
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
                  defaultValue={presentAddress}
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
                  defaultValue={permanentAddress}
                  placeholder="Permanent Address "
                  {...register("permanentAddress")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                {memberPhotoError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {memberPhotoError}
                  </p>
                )}
                <label className="font-semibold" htmlFor="memberPhoto">
                  Member Photo
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="file"
                  id="memberPhoto"
                  {...register("memberPhoto")}
                  onChange={validateMemberPhotoSize}
                />
              </div>

              <div className="flex flex-col">
                {signaturePhotoError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {signaturePhotoError}
                  </p>
                )}
                <label className="font-semibold" htmlFor="signature">
                  Signature
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="file"
                  id="signature"
                  {...register("signature")}
                  onChange={handleSignature}
                />
              </div>

              <div className="flex flex-col">
                {nidFirstPhotoError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {nidFirstPhotoError}
                  </p>
                )}
                <label className="font-semibold" htmlFor="nidFrontPart">
                  Nid (Front Part)
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="file"
                  id="nidFrontPart"
                  {...register("nidFrontPart")}
                  onChange={handleNidFirstPart}
                />
              </div>

              <div className="flex flex-col">
                {nidSeconedPhotoError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {nidSeconedPhotoError}
                  </p>
                )}
                <label className="font-semibold" htmlFor="nidBackPart">
                  Nid (Back Part)
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="file"
                  id="nidBackPart"
                  {...register("nidBackPart")}
                  onChange={handleNidSeconedPart}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="referenceEmployee">
                  Reference Employee
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="referenceEmployee"
                  defaultValue=""
                  {...register("referenceEmployee")}
                >
                  <option value="" disabled>
                    {employeeQueryLoading
                      ? "Loading Employee..."
                      : "Select Employee"}
                  </option>
                  {employeeData?.data?.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.employeeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="referenceMember">
                  Reference Member
                </label>
                <select
                  className="py-2 px-2 my-1 rounded-sm membershipInput"
                  id="referenceMember"
                  defaultValue=""
                  {...register("referenceMember")}
                >
                  <option value="" disabled>
                    {membersQueryLoading
                      ? "Loading Member..."
                      : "Select Member"}
                  </option>
                  {membershipData?.data?.map((item) => (
                    <option key={item._id} value={item?._id}>
                      {item?.memberName}
                    </option>
                  ))}
                </select>
              </div>

              {attachments.map((_, index) => (
                <div className="flex" key={index}>
                  <div>
                    <div className="flex">
                      <label
                        className="font-bold"
                        htmlFor={`attachment-${index}`}
                      >
                        Attachment:
                      </label>
                      {attachmentsPhotoError && (
                        <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                          {attachmentsPhotoError}
                        </p>
                      )}
                    </div>
                    <input
                      className="py-2 px-2 my-1 rounded-sm employeeInput"
                      type="file"
                      id={`attachment-${index}`}
                      placeholder="Profile Image"
                      {...register(`attachment[${index}]`)}
                      onChange={handleAttachment}
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
                      defaultValue={
                        singleMemberData?.data?.nominee[0]?.nomineeName
                      }
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
                      defaultValue={
                        singleMemberData?.data?.nominee[0]?.nomineePhone
                      }
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
                      defaultValue={
                        singleMemberData?.data?.nominee[0]?.nomineeNid
                      }
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
                      defaultValue={
                        singleMemberData?.data?.nominee[0]?.nomineeRelation
                      }
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
                      defaultValue={
                        singleMemberData?.data?.nominee[0]?.distributation
                      }
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
                {isLoading || updateMembershipLoading ? (
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
    </div>
  );
};

export default UpdateMember;
