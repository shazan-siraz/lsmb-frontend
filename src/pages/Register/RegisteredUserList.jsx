import { useState } from "react";
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import { toast, ToastContainer } from "react-toastify";
import { useGetAllCompanyQuery } from "../../redux/features/company/company";
import { useUpdateUserStatusMutation } from "../../redux/features/user/user";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";

const RegisteredUserList = () => {
  const { data: companyData, isLoading: companyDataLoading } =
    useGetAllCompanyQuery();
  const [updateCompanyStatus] = useUpdateUserStatusMutation();
  const [loadingRow, setLoadingRow] = useState(null); // Track the loading row

  if (companyDataLoading) {
    return <LoadingComponent></LoadingComponent>
  }

  const handleStatus = async (email, rowId) => {

    setLoadingRow(rowId); // Set the loading row ID
    try {
      const res = await updateCompanyStatus({ email });

      if (res?.data) {
        toast.success("Status Updated!");
      } else {
        toast.error("Failed to update status!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setLoadingRow(null); // Reset the loading row ID
    }
  };

  return (
    <div className="py-3 px-10">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-[20px]">
          Registered Users: {companyData?.data?.length}
        </h1>
      </div>

      <div className="my-5">
        <table className="w-full">
          <thead className="bg-slate-500 text-white">
            <tr>
              <th>#</th>
              <th>Registered Name</th>
              <th>Registered Email</th>
              <th>Registered Mobile</th>
              <th>Registered Address</th>
              <th>Package</th>
              <th>Registered Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {companyData?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.companyName}</td>
                <td>{item.companyEmail}</td>
                <td>{item.companyMobile}</td>
                <td>{item.companyAddress}</td>
                <td>
                  {item.registeredPackage.packageName} - Monthly{" "}
                  {item.registeredPackage.packagePrice} BDT -{" "}
                  {item.registeredPackage.memberLimit} Member
                </td>
                <td>{timeFormat(item.createdAt)}</td>
                <td>{item.user.status}</td>
                <td>
                  <div
                    className={`flex justify-center items-center flex-col ${
                      loadingRow === item._id
                        ? "bg-gray-400"
                        : "hover:bg-slate-600 bg-slate-500"
                    } cursor-pointer px-2 font-semibold text-white rounded`}
                    onClick={
                      loadingRow !== item._id
                        ? () => handleStatus(item.companyEmail, item._id)
                        : undefined
                    }
                  >
                    {/* {loadingRow === item._id ? "Loading" : "Active"} */}
                    {item.user.status === "pending"
                      ? "Active"
                      : item.user.status === "in-progress"
                      ? "Deactive"
                      : ""}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredUserList;
