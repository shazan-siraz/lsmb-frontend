import { useForm } from "react-hook-form";
import "./AddNewEmployee.css";

import uploadImageToCloudinary from "../../utils/uploadImageToCloudinary/uploadImageToCloudinary";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useCreateEmployeeMutation } from "../../redux/features/employee/employeeApi";

const AddNewEmployee = () => {
  const [isError, setIsError] = useState(null);
  const { email } = useSelector(useCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [addEmployee, { error, isLoading: createEmoloyeeLoading }] =
    useCreateEmployeeMutation();

  useEffect(() => {
    if (error) {
      setIsError(error?.data?.message);
    }
  }, [error]); // Runs only when the error changes

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const uploadedImageUrl = await uploadImageToCloudinary(data.imageUrl[0]);

      const employeeData = {
        password: data?.employeePassword,
        employee: {
          employeeId: data?.employeeId,
          employeeEmail: data?.employeeEmail,
          branchEmail: email,
          employeeName: data?.name,
          joiningDate: data?.joiningDate,
          employeeType: data?.employeeType,
          phoneNo: data?.phoneNo,
          employeeNid: data?.employeeNid,
          presentAddress: data?.presentAddress,
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
          profileImage: uploadedImageUrl,
        },
      };

      setIsLoading(false);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#E1E2E1]">
      <h1 className="px-5 py-2 text-2xl font-bold">Make A New Employee </h1>
      <div className="py-3">
        <div className="border-b-2"></div>
      </div>

      <div className="px-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center text-red-600 font-semibold text-[20px]">
            {isError}
          </p>
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="employeeId">
                Employee ID*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="employeeId"
                placeholder="Employee Software ID"
                {...register("employeeId")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="email">
                Email*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="email"
                id="email"
                placeholder="Enter Email Address"
                {...register("employeeEmail")}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="password">
                Password*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="password"
                id="password"
                placeholder="Employee Login Password"
                {...register("employeePassword")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="name">
                Name*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="name"
                placeholder="Employee Name"
                {...register("name")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="joining">
                Joining*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="date"
                id="joining"
                {...register("joiningDate")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="employeeType">
                Employee Type*
              </label>
              <select
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                id="employeeType"
                {...register("employeeType")}
                required={true}
              >
                <option selected disabled>
                  Select Job Type
                </option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Sesonal">Sesonal</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="phoneNo">
                Phone No*
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="number"
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
                type="number"
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
                {...register("bloodGroup")}
                required={true}
              >
                <option selected disabled>
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
                {...register("degree")}
              >
                <option selected disabled>
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
                id="incentiveBonus"
                placeholder="Incentive Bonus"
                {...register("incentiveBonus")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="other">
                Incentive Bonus
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
                id="other"
                placeholder="Other"
                {...register("other")}
                required={true}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="professionalTax">
                Professional Tax
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="text"
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
                type="text"
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
                type="text"
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
                type="text"
                id="totalSalary"
                placeholder="Total Salary"
                {...register("totalSalary")}
                required={true}
              />
            </div>

            <div className="flex items-center">
              <label className="font-bold" htmlFor="imageUrl">
                Choose Profile Image:
              </label>
              <input
                className="py-2 px-2 my-1 rounded-sm employeeInput"
                type="file"
                id="imageUrl"
                placeholder="Profile Image"
                {...register("imageUrl")}
                required={true}
              />
            </div>
          </div>
          <div className="text-center pb-[30px]">
            <input
              className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-20 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
              value={
                isLoading || createEmoloyeeLoading
                  ? "Loading..."
                  : "Create Employee"
              }
              disabled={isLoading || createEmoloyeeLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
