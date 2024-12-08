import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { toast, ToastContainer } from "react-toastify";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";
import { isoDateToTime } from "../../utils/isoDateToTime/isoDateToTime";
import { useTodayLoanCollectionQuery } from "../../redux/features/loanCollection/loanCollectionApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useSearchDpsAccountQuery } from "../../redux/features/dps/dpsApi";

const FindDpsAccount = () => {
  const { email } = useSelector(useCurrentUser);
  const { branchEmail } = useGetBranchEmail();
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

  const { data: searchDpsData } = useSearchDpsAccountQuery({
    query: debouncedQuery || undefined,
    email: branchEmail,
  });

  const { data: todayLoanTxnData, isLoading: todayLoanTxnLoading } =
    useTodayLoanCollectionQuery(email);

  if (todayLoanTxnLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const handleDpsTxn = async (id) => {
    navigate(`/dashboard/dps-collection/${id}`);
  };


  

  return (
    <div className="bg-slate-100">
      <div className="rounded pt-[30px]">
        <ToastContainer></ToastContainer>
        <div className="max-w-[600px] w-full mx-auto bg-white rounded border-t-[5px] border-slate-500">
          <h1 className="uppercase font-bold text-center text-[30px] py-5">
            DPS Transaction
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
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
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="pt-5">
        <table className="w-[95%] mx-auto">
          <thead>
            <tr>
              <td>Dps A/C No</td>
              <td>Photo</td>
              <td>Name</td>
              <td>Phone No</td>
              <td>Father/Husband</td>
              <td>Present Address</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {searchDpsData?.data?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.dpsAcNo}</td>
                <td>
                  <img
                    className="w-[50px]"
                    src={item?.memberOfApplying?.memberPhoto}
                    alt=""
                  />
                </td>
                <td>{item?.memberName}</td>
                <td>{item?.memberPhoneNo}</td>
                <td>{item?.memberOfApplying?.fatherHusbandName}</td>
                <td>{item?.memberOfApplying?.presentAddress}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDpsTxn(item?._id)}
                    className="bg-slate-600 px-3 py-2 rounded text-white font-semibold"
                  >
                    DPS Transaction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-[30px]">
        <h1 className="text-center text-[25px] font-semibold mt-8 mb-2 pb-1 bg-slate-500 text-white">
          Today Dps Transaction
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
            {todayLoanTxnData?.data?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Loan Txn</td>
                <td>{item?.transactionNote}</td>
                <td>{item?.installmentAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FindDpsAccount;