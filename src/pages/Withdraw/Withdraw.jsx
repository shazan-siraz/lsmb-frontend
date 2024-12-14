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

  const { data: singleDpsData } = useGetSingleDpsQuery(membership, {
    skip: !membership,
  });

  const { data: singleFdrData } = useGetSingleFdrQuery(membership, {
    skip: !membership,
  });

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

    setSearchQuery(memberName ); // নির্বাচিত নাম ইনপুটে সেট করা হবে
    setDropdownVisible(false); // ড্রপডাউন বন্ধ করা হবে
    setIsMembership(id);
  };



  const handleNavigateWithdraw = () => {
    if (accountType === "dps") {
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
                      onClick={() => handleSelect(item._id, item.memberName, item.phoneNo)}
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
          {/* <NavLink
            to={
              membership === undefined
                ? ""
                : `/dashboard/withdraw/${accountType}/${membership}`
            }
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            NEXT
          </NavLink> */}

          <button
            onClick={() => handleNavigateWithdraw()}
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
