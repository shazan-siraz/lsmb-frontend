import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

const Withdraw = () => {
  const memberRef = useRef();
  const accountTypeRef = useRef();
  const [membership, setIsMembership] = useState();
  const [accountType, setAccountType] = useState("savings");

  const { data: membershipData, isLoading: membershipQueryLoading } =
    useGetAllMembershipQuery();

  if (membershipQueryLoading) {
    return <p>Loading...</p>;
  }

  const handleSelectChange = () => {
    const selectedValue = memberRef.current.value;
    setIsMembership(selectedValue);
  };

  const handleAccountTypeChange = () => {
    const accountTypeValue = accountTypeRef.current.value;
    setAccountType(accountTypeValue);
  };

  return (
    <div className="pt-[50px]">
      <div className="max-w-[580px] mx-auto bg-white py-2 px-8 rounded-lg">
        <div>
          <h1 className="text-[40px] font-bold text-center">WITHDRAW</h1>
          <div className="flex flex-col my-2">
            <select
              className="py-2 px-2 my-1 rounded-sm membershipInput border"
              onChange={handleSelectChange}
              ref={memberRef}
              aria-required
            >
              <option>Select Member</option>
              {membershipData?.data.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.memberName}
                </option>
              ))}
            </select>
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
          <NavLink
            to={
              membership === undefined
                ? ""
                : `/dashboard/withdraw/${accountType}/${membership}`
            }
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            NEXT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
