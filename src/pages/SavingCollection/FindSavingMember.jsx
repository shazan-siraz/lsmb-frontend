import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSearchMemberQuery } from "../../redux/features/membership/membershipApi";
import debounce from "lodash/debounce";
import { useGetSingleEmployeeQuery } from "../../redux/features/employee/employeeApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { toast, ToastContainer } from "react-toastify";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";
import { useTodaySavingCollectionQuery } from "../../redux/features/savingCollection/savingCollectionApi";
import { isoDateToTime } from "../../utils/isoDateToTime/isoDateToTime";

const FindSavingMember = () => {
  const { email, role } = useSelector(useCurrentUser);
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.message);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage);
      dispatch(clearToastMessage()); // টোস্ট মেসেজটি ক্লিয়ার করুন
    }
  }, [toastMessage, dispatch]);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms debounce
    handler();
    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  const { data: singleBranchData, isLoading: singleBranchQueryLoading } =
    useGetSingleBranchQuery(email);
  const { data: singleEmployeeData, isLoading: singleEmployeeLoading } =
    useGetSingleEmployeeQuery(email);

  // Conditionally use the data based on the role
  let data;
  if (role === "branch") {
    data = singleBranchData;
  } else if (role === "manager") {
    data = singleEmployeeData;
  }

  const branchEmail = data?.data?.branchEmail;

  const { data: searchMemberData, isLoading: searchMemeberLoading } =
    useSearchMemberQuery({
      query: debouncedQuery || undefined,
      email: branchEmail,
    });

  const { data: toadySavingTxnData, isLoading: todaySavingTxnLoading } =
    useTodaySavingCollectionQuery(email);

  if (
    singleEmployeeLoading ||
    singleBranchQueryLoading ||
    todaySavingTxnLoading ||
    searchMemeberLoading
  ) {
    return <LoadingComponent></LoadingComponent>;
  }

  // সার্চ বাটনের মাধ্যমে সার্চ
  const handleSearch = () => {
    setDebouncedQuery(searchQuery);
  };

  const handleSavingTxn = async (id) => {
    navigate(`/dashboard/saving-transaction/${id}`);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="rounded pt-[30px]">
        <ToastContainer></ToastContainer>
        <div className="max-w-[600px] w-full mx-auto bg-white rounded border-t-[5px] border-slate-500">
          <h1 className="uppercase font-bold text-center text-[30px] py-5">
            Saving Transaction
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // ফর্ম রিফ্রেশ বন্ধ করুন
              handleSearch();
            }}
          >
            <div className="flex justify-center items-center gap-2 px-5 pb-8">
              <input
                className="py-2 px-2 mx-4 rounded my-1 w-full border membershipInput"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, PhoneNo, or ID"
                required={true}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                {searchMemeberLoading ? (
                  <span className="loading loading-bars loading-md"></span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="pt-5">
        <table className="w-[95%] mx-auto">
          <thead>
            <tr>
              <td>Id</td>
              <td>Photo</td>
              <td>Name</td>
              <td>Phone No</td>
              <td>Father/Husband</td>
              <td>Present Address</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {searchMemberData?.data?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.memberId}</td>
                <td>
                  <img className="w-[50px]" src={item?.memberPhoto} alt="" />
                </td>
                <td>{item?.memberName}</td>
                <td>{item?.phoneNo}</td>
                <td>{item?.fatherHusbandName}</td>
                <td>{item?.presentAddress}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleSavingTxn(item?._id)}
                    className="bg-slate-600 px-3 py-2 rounded text-white font-semibold"
                  >
                    Saving Transaction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-[30px]">
        <h1 className="text-center text-[25px] font-semibold mt-8 mb-2 pb-1 bg-slate-500 text-white">
          Today Saving Transaction
        </h1>
        <table className="w-[95%] mx-auto mb-[60px]">
          <thead>
            <tr>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>Txn Note</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {toadySavingTxnData?.data?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Saving</td>
                <td>{item?.transactionNote}</td>
                <td>{item?.savingsAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FindSavingMember;
