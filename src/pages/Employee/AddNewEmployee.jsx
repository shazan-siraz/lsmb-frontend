import { useForm } from "react-hook-form";
import "./AddNewEmployee.css";
import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useCreateEmployeeMutation } from "../../redux/features/employee/employeeApi";
import { FaMinus } from "react-icons/fa";
import todayDateFormated from "../../utils/todayDateFormated/todayDateFormated";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { Divider } from "antd";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { toast, ToastContainer } from "react-toastify";

const AddNewEmployee = () => {
  const { branchEmail, isLoading: branchQueryLoading } = useGetBranchEmail();
  const [isError, setIsError] = useState(null);
  const [fileError, setFileError] = useState("");
  const [signatureError, setSignatureError] = useState("");
  const [employeeNidFirstPartError, setEmployeeNidFirstPartError] =
    useState("");
  const [employeeNidSeconedPartError, setEmployeeNidSeconedPartError] =
    useState("");
  const [jabindarNidFirstPartError, setJabindarNidFirstPartError] =
    useState("");
  const [jabindarNidSeconedPartError, setJabindarNidSeconedPartError] =
    useState("");
  const [jabindarSignatureError, setJabindarSignatureError] = useState("");
  const [attachments, setAttachments] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, setError, clearErrors } = useForm();

  const { data: branchData } = useGetSingleBranchQuery(branchEmail);

  const [addEmployee, { error, isLoading: createEmoloyeeLoading }] =
    useCreateEmployeeMutation();

  useEffect(() => {
    if (error) {
      setIsError(error?.data?.message);
    }
  }, [error]); // Runs only when the error changes

  if (branchQueryLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  // ইমেজ সাইজ ভ্যালিডেশন ফাংশন
  const validateFileSize = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setFileError("Image size more than 100kb");
      setError("imageUrl", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setFileError("");
      clearErrors("imageUrl");
    }
  };

  // Signature size Validation
  const validateSignatureImageSize = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setSignatureError("Image size more than 100kb");
      setError("signatureImage", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setSignatureError("");
      clearErrors("signature");
    }
  };

  // Nid/Passport size Validation
  const validateEmployeeNidFirstPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setEmployeeNidFirstPartError("Image size more than 100kb");
      setError("employeeNidFirstPart", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setEmployeeNidFirstPartError("");
      clearErrors("signature");
    }
  };

  // Nid/Passport size Validation
  const validateEmployeeNidSeconedPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setEmployeeNidSeconedPartError("Image size more than 100kb");
      setError("employeeNidSeconedPart", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setEmployeeNidSeconedPartError("");
      clearErrors("signature");
    }
  };

  // validateJabindarNidFirstPart size Validation
  const validateJabindarNidFirstPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setJabindarNidFirstPartError("Image size more than 100kb");
      setError("nid_passport", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setJabindarNidFirstPartError("");
      clearErrors("signature");
    }
  };

  // validateJabindarSignature size Validation
  const validateJabindarSignature = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setJabindarSignatureError("Image size more than 100kb");
      setError("nid_passport", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setJabindarSignatureError("");
      clearErrors("signature");
    }
  };

  // validateJabindarNidFirstPart size Validation
  const validateJabindarNidSeconedPart = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 100 * 1024) {
      // 80 KB = 80 * 1024 bytes
      setJabindarNidSeconedPartError("Image size more than 100kb");
      setError("nid_passport", {
        type: "manual",
        message: "Image size more than 100kb",
      });
      e.target.value = "";
    } else {
      setJabindarNidSeconedPartError("");
      clearErrors("signature");
    }
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

  const companyEmail = branchData?.data.company.companyEmail;

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const [
        profileImageUrl,
        signatureImageUrl,
        nidFirstPartImageUrl,
        nidSeconedPartImageUrl,
        jabindarSignatureImageUrl,
        jabindarNidFirstPartImageUrl,
        jabindarNidSeconedPartImageUrl,
      ] = await Promise.all([
        uploadImageToCloudinary(data.profileImage[0]),
        uploadImageToCloudinary(data.signatureImage[0]),
        uploadImageToCloudinary(data.nidFirstPart[0]),
        uploadImageToCloudinary(data.nidSeconedPart[0]),
        uploadImageToCloudinary(data.jabindarSignature[0]),
        uploadImageToCloudinary(data.jabindarNidFirstPart[0]),
        uploadImageToCloudinary(data.jabindarNidSeconedPart[0]),
      ]);

      // Map through all image files and upload each to Cloudinary
      const uploadedImageUrls = await Promise.all(
        data.attachment.map(async (attachments) => {
          const imageUrl = await uploadImageToCloudinary(attachments[0]);
          return imageUrl;
        })
      );

      const employeeData = {
        password: data?.employeePassword,
        employee: {
          employeeEmail: data?.employeeEmail,
          branch: branchData?.data._id,
          branchEmail: branchEmail,
          companyEmail: companyEmail,
          employeeName: data?.employeeName,
          joiningDate: data?.joiningDate,
          employeeType: data?.employeeType,
          employeeDesignation: data?.employeeDesignation,
          phoneNo: data?.phoneNo,
          employeeNid: data?.employeeNid,
          presentAddress: data?.presentAddress,
          permanentAddress: data?.permanentAddress,
          fatherName: data?.fatherName,
          motherName: data?.motherName,
          bloodGroup: data?.bloodGroup,
          degree: data?.degree,
          basicSalary: Number(data?.basicSalary),
          mobileBill: Number(data?.mobileBill),
          conveyanceAllowance: Number(data?.conveyanceAllowance),
          medicalAllowance: Number(data?.medicalAllowance),
          houseRent: Number(data?.houseRent),
          incentiveBonus: Number(data?.incentiveBonus),
          others: Number(data?.other),
          professionalTax: Number(data?.professionalTax),
          incomeTax: Number(data?.incomeTax),
          providentFund: Number(data?.providentFund),
          totalSalary: Number(data?.totalSalary),
          profileImage: profileImageUrl,
          signature: signatureImageUrl,
          nidFirstPart: nidFirstPartImageUrl,
          nidSeconedPart: nidSeconedPartImageUrl,
          attachments: uploadedImageUrls,
          jabindar: {
            jabindarName: data.jabindarName,
            jabindarPhone: data.jabindarPhone,
            jabindarNid: data.jabindarNid,
            jabindarSignature: jabindarSignatureImageUrl,
            jabindarNidFirstPart: jabindarNidFirstPartImageUrl,
            jabindarNidSeconedPart: jabindarNidSeconedPartImageUrl,
          },
        },
      };

      setIsLoading(false);
      toast.error("Employee Limit is Full!")
      setIsError(error?.data?.message);
      const res = await addEmployee(employeeData);

      if (res?.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Employee has been Created",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setIsError("");
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-slate-100">
      <ToastContainer></ToastContainer>
      <h1 className="px-5 py-2 text-2xl font-bold">Make A New Employee </h1>
      <div className="py-3">
        <div className="border-b-2"></div>
      </div>

      <div className="px-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center text-red-600 font-semibold text-[20px]">
            {isError}
          </p>
          <div className="grid grid-cols-4 gap-3 gap-x-5 items-center">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="employeeEmail">
                Employee Email*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="email"
                id="employeeEmail"
                placeholder="Employee Login Email"
                {...register("employeeEmail")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="employeePassword">
                Employee Password*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="password"
                id="employeePassword"
                placeholder="Employee Login Password"
                {...register("employeePassword")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="employeeName">
                Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="employeeName"
                placeholder="Employee Name"
                {...register("employeeName")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="joining">
                Joining Date*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="date"
                id="joining"
                defaultValue={todayDateFormated()}
                {...register("joiningDate")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="employeeType">
                Employee Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="employeeType"
                required
                defaultValue=""
                {...register("employeeType")}
              >
                <option value="" disabled>
                  Select Job Type
                </option>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="seasonal">Seasonal</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="employeeDesignation">
                Employee Designation*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm membershipInput"
                id="employeeDesignation"
                required
                defaultValue=""
                {...register("employeeDesignation")}
              >
                <option value="" disabled>
                  Select Employee Designation
                </option>
                <option value="manager">Manager</option>
                <option value="accountant">Accountant</option>
                <option value="fieldOfficer">Field Officer</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="phoneNo">
                Phone No*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="phoneNo"
                placeholder="Enter Phone No"
                {...register("phoneNo")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="nid">
                NID*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="nid"
                placeholder="Voter ID No."
                {...register("employeeNid")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="presentAddress">
                Present Address*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="presentAddress"
                placeholder="Present Address"
                {...register("presentAddress")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="personalAddress">
                Permanent Address*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="personalAddress"
                placeholder="Permanent Address"
                {...register("permanentAddress")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="fatherName">
                Father Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="fatherName"
                placeholder="Enter Faher Name"
                {...register("fatherName")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="motherName">
                Mother Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="motherName"
                placeholder="Enter Mother Name"
                {...register("motherName")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="bloodGroup">
                Blood Group*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                id="bloodGroup"
                required
                defaultValue=""
                {...register("bloodGroup")}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A+">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="degree">
                Degree
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                id="degree"
                required
                defaultValue=""
                {...register("degree")}
              >
                <option value="" disabled>
                  Select Highest Degree
                </option>
                <option value="Five">Five</option>
                <option value="Eight">Eight</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelors">Bachelors</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="basicSalary">
                Basic Salary
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="basicSalary"
                placeholder="Enter Basic Salary"
                {...register("basicSalary")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="mobileBill">
                Mobile Bill
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="mobileBill"
                placeholder="Enter Mobile Bill"
                {...register("mobileBill")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="conveyanceAllowance">
                Conveyance Allowance
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="conveyanceAllowance"
                placeholder="Enter Conveyance Allowance"
                {...register("conveyanceAllowance")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="medicalAllowance">
                Medical Allowance
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="medicalAllowance"
                placeholder="Enter Medical Allowance"
                {...register("medicalAllowance")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="houseRent">
                House Rent
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="houseRent"
                placeholder="Enter House Rent"
                {...register("houseRent")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="incentiveBonus">
                Incentive Bonus
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="incentiveBonus"
                placeholder="Incentive Bonus"
                {...register("incentiveBonus")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="other">
                Other
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="other"
                placeholder="Other"
                {...register("other")}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="professionalTax">
                Professional Tax
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="professionalTax"
                placeholder="Professional Tax"
                {...register("professionalTax")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="incomeTax">
                Income Tax
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="incomeTax"
                placeholder="Income Tax"
                {...register("incomeTax")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="providentFund">
                Provident Fund
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="providentFund"
                placeholder="providentFund"
                {...register("providentFund")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="totalSalary">
                Total Salary
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
                id="totalSalary"
                placeholder="Total Salary"
                {...register("totalSalary")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              {fileError && (
                <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                  {fileError}
                </p>
              )}
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="imageUrl">
                  Profile Image*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                  type="file"
                  required
                  id="profileImage"
                  {...register("profileImage")}
                  onChange={validateFileSize}
                />
              </div>
            </div>

            <div className="flex flex-col">
              {signatureError && (
                <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                  {signatureError}
                </p>
              )}
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="signature">
                  Signature*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                  type="file"
                  required
                  id="signature"
                  {...register("signatureImage")}
                  onChange={validateSignatureImageSize}
                />
              </div>
            </div>

            <div className="flex flex-col">
              {employeeNidFirstPartError && (
                <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                  {employeeNidFirstPartError}
                </p>
              )}
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="employeeNidFirstPart">
                  Nid (1st Part)*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                  type="file"
                  required
                  id="employeeNidFirstPart"
                  {...register("nidFirstPart")}
                  onChange={validateEmployeeNidFirstPart}
                />
              </div>
            </div>

            <div className="flex flex-col">
              {employeeNidSeconedPartError && (
                <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                  {employeeNidSeconedPartError}
                </p>
              )}
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="employeeNidSeconedPart">
                  Nid (2nd Part)*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                  type="file"
                  required
                  id="employeeNidSeconedPart"
                  {...register("nidSeconedPart")}
                  onChange={validateEmployeeNidSeconedPart}
                />
              </div>
            </div>

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

            <div>
              <button
                type="button"
                className=" px-4 py-2 bg-slate-400 hover:bg-slate-500 transition-all duration-300 ease-in-out text-white rounded-md"
                onClick={addAttachmentField}
              >
                Add More Attachment
              </button>
            </div>
          </div>

          <Divider className="uppercase">Employee Jabindar</Divider>

          <div>
            <div className="grid grid-cols-4 gap-x-5">
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="jabindarName">
                  Jabindar Name*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="text"
                  id="jabindarName"
                  placeholder="Jabindar Name"
                  {...register("jabindarName")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="jabindarPhone">
                  Jabindar Phone*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="number"
                  id="jabindarPhone"
                  placeholder="Jabindar Phone"
                  {...register("jabindarPhone")}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold" htmlFor="jabindarNid">
                  Jabindar NID*
                </label>
                <input
                  className="py-2 px-2 my-1 rounded-sm membershipInput bg-white"
                  type="text"
                  id="jabindarNid"
                  placeholder="Jabindar Nid"
                  {...register("jabindarNid")}
                  required={true}
                />
              </div>

              <div className="flex flex-col">
                {jabindarSignatureError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {jabindarSignatureError}
                  </p>
                )}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="jabindarSignature">
                    Jabindar Signature*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                    type="file"
                    id="jabindarSignature"
                    required
                    {...register("jabindarSignature")}
                    onChange={validateJabindarSignature}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {jabindarNidFirstPartError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {jabindarNidFirstPartError}
                  </p>
                )}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="jabindarNidFirstPart">
                    NID (1st Part)*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                    type="file"
                    required
                    id="jabindarNidFirstPart"
                    {...register("jabindarNidFirstPart")}
                    onChange={validateJabindarNidFirstPart}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {jabindarNidSeconedPartError && (
                  <p className="mx-auto mr-2 text-red-500 z-10 font-semibold text-[15px] -mb-6 text-center">
                    {jabindarNidSeconedPartError}
                  </p>
                )}
                <div className="flex flex-col">
                  <label className="font-bold" htmlFor="jabindarNidSeconedPart">
                    NID (2nd Part)*
                  </label>
                  <input
                    className="py-2 px-2 my-1 rounded-sm employeeInput bg-white"
                    type="file"
                    required
                    id="jabindarNidSeconedPart"
                    {...register("jabindarNidSeconedPart")}
                    onChange={validateJabindarNidSeconedPart}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <button
              className="border border-blue-500 py-2 px-20 rounded hover:bg-blue-500 hover:text-white cursor-pointer transition-all duration-300 ease-in-out"
              type="submit"
              disabled={isLoading || createEmoloyeeLoading}
            >
              {isLoading || createEmoloyeeLoading ? (
                <span className="loading loading-bars loading-md"></span>
              ) : (
                "Create Employee"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
