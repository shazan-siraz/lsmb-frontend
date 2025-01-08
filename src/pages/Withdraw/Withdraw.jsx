import { useSearchMemberQuery } from "../../redux/features/membership/membershipApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleDpsQuery } from "../../redux/features/dps/dpsApi";
import { useGetSingleFdrQuery } from "../../redux/features/fdr/fdrApi";
import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { toast, ToastContainer } from "react-toastify";
import { clearToastMessage } from "../../redux/features/auth/toastSlice";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleMemberSavingTransactionQuery } from "../../redux/features/savingCollection/savingCollectionApi";
import { useTodaySavingWithdrawQuery } from "../../redux/features/savingWithdraw/savingWithdraw";
import { isoDateToTime } from "../../utils/isoDateToTime/isoDateToTime";
import { useTodayDpsWithdrawQuery } from "../../redux/features/dpsWithdraw/dpsWithdrawApi";

const Withdraw = () => {
  const { branchEmail, isLoading } = useGetBranchEmail();
  const dispatch = useDispatch();
  const [routeErr, setRouteErr] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const accountTypeRef = useRef();
  const [membership, setIsMembership] = useState();
  const [accountType, setAccountType] = useState("savings");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  const toastMessage = useSelector((state) => state.toast.message);

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

  const { data: searchMemberData } = useSearchMemberQuery({
    query: debouncedQuery || undefined,
    email: branchEmail,
  });

  const { data: singleSavingMember } = useGetSingleMemberSavingTransactionQuery(
    membership,
    {
      skip: !membership,
    }
  );

  const { data: singleDpsData } = useGetSingleDpsQuery(membership, {
    skip: !membership,
  });

  const { data: singleFdrData } = useGetSingleFdrQuery(membership, {
    skip: !membership,
  });

  const { data: todaySavingWithdrawData } =
    useTodaySavingWithdrawQuery(branchEmail);

  const { data: todayDpsWithdrawData } = useTodayDpsWithdrawQuery(branchEmail);

  if (isLoading) {
    return <LoadingComponent></LoadingComponent>;
  }

  const handleAccountTypeChange = () => {
    const accountTypeValue = accountTypeRef.current.value;
    setAccountType(accountTypeValue);
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // যদি ইনপুট ফিল্ড খালি না থাকে, তাহলে ড্রপডাউন দেখান
    setDropdownVisible(query.length > 0);
  };

  const handleSelect = (id, memberName) => {
    setSearchQuery(memberName); // নির্বাচিত নাম ইনপুটে সেট করা হবে
    setDropdownVisible(false); // ড্রপডাউন বন্ধ করা হবে
    setIsMembership(id);
  };

  const handleNavigateWithdraw = () => {
    if (accountType === "savings") {
      singleSavingMember?.data === null
        ? setRouteErr("Savings A/C Not Available!")
        : navigate(`/dashboard/withdraw/${accountType}/${membership}`);
    } else if (accountType === "dps") {
      singleDpsData?.data === null
        ? setRouteErr("Dps A/C Not Available!")
        : navigate(`/dashboard/withdraw/${accountType}/${membership}`);
    } else if (accountType === "fdr") {
      singleFdrData?.data === null
        ? setRouteErr("Fdr A/C Not Available!")
        : navigate(`/dashboard/withdraw/${accountType}/${membership}`);
    } else {
      setRouteErr("");
      navigate(
        membership === undefined
          ? ""
          : `/dashboard/withdraw/${accountType}/${membership}`
      );
    }
  };

  return (
    <div className="pt-[50px] bg-slate-100 min-h-screen">
      <ToastContainer></ToastContainer>
      <div className="max-w-[580px] mx-auto bg-white py-2 px-8 rounded-lg">
        <div>
          <h1 className="text-[40px] font-bold text-center">WITHDRAW</h1>
          <p className="text-red-500 text-center font-bold text-[18px]">
            {routeErr && routeErr}
          </p>
          <div className="flex flex-col my-2">
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
                        handleSelect(item._id, item.memberName, item.phoneNo)
                      }
                    >
                      {item.memberName} - {item.phoneNo}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-col my-2">
            <select
              className="py-2 px-2 my-1 rounded-sm membershipInput border"
              onChange={handleAccountTypeChange}
              ref={accountTypeRef}
              aria-required
            >
              <option value="savings">Savings</option>
              <option value="dps">DPS</option>
              <option value="fdr">FDR</option>
            </select>
          </div>
        </div>
        <div className="text-center py-5">
          <button
            onClick={() => handleNavigateWithdraw()}
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            NEXT
          </button>
        </div>
      </div>

      <div className="mt-[20px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          Today Savings Withdraw: {todaySavingWithdrawData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[30px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>TxnID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>MR/SlipNo</td>
              <td>Amount</td>
              <td>Company Profit</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {todaySavingWithdrawData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?.transactionId}</td>
                <td>{item?.memberId?.memberName}</td>
                <td>{item?.memberId?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Savings</td>
                <td>{item?.mrSlipNo}</td>
                <td>{item?.withdrawAmount}</td>
                <td>{item?.serviceCharge}</td>
                <td>{item?.installmentAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan="7" className="text-right">
                Total:
              </td>
              <td>
                {todaySavingWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.withdrawAmount || 0),
                  0
                )}
              </td>
              <td>
                {todaySavingWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.serviceCharge || 0),
                  0
                )}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-[20px] pb-[10px]">
        <h1 className="text-center font-semibold text-[18px] pt-[10px]">
          Today DPS Withdraw: {todayDpsWithdrawData?.data?.length}
        </h1>
        <table className="w-[95%] mx-auto mb-[30px]">
          <thead className="bg-slate-500 text-white font-semibold">
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>Member</td>
              <td>Member Phone</td>
              <td>Time</td>
              <td>Txn Type</td>
              <td>MR/SlipNo</td>
              <td>Amount</td>
              <td>Company Profit</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {todayDpsWithdrawData?.data?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>{item?._id}</td>
                <td>{item?.memberOfApplying?.memberName}</td>
                <td>{item?.memberOfApplying?.phoneNo}</td>
                <td>{isoDateToTime(item?.createdAt)}</td>
                <td>Dps</td>
                <td>{item?.mrSlipNo}</td>
                <td>{item?.amount}</td>
                <td>{item?.serviceCharge}</td>
                <td>{item?.installmentAmount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td colSpan="7" className="text-right">
                Total:
              </td>
              <td>
                {todayDpsWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.amount || 0),
                  0
                )}
              </td>
              <td>
                {todayDpsWithdrawData?.data?.reduce(
                  (total, item) => total + (item?.serviceCharge || 0),
                  0
                )}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Withdraw;
