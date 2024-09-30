import { useGetAllMembershipQuery } from "../../redux/features/membership/membershipApi";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

const SavingTransaction = () => {
  const transactionRef = useRef();
  const [istransactionRef, setIsTransactionRef] = useState();
  const { data: membershipData, isLoading: membershipQueryLoading } =
    useGetAllMembershipQuery();

  if (membershipQueryLoading) {
    return <p>Loading...</p>;
  }

  const handleSelectChange = () => {
    const selectedValue = transactionRef.current.value;
    setIsTransactionRef(selectedValue);
  };

  return (
    <div className="pt-[100px]">
      <div className="max-w-[580px] mx-auto bg-white p-8 rounded-lg">
        <div>
          <h1 className="text-[40px] font-bold text-center">
            Saving Transaction
          </h1>
          <div className="flex flex-col my-8">
            <select
              className="py-2 px-2 my-1 rounded-sm membershipInput border"
              onChange={handleSelectChange}
              ref={transactionRef}
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
        </div>
        <div className="text-center">
          <NavLink
            to={
              istransactionRef === undefined
                ? ""
                : `/dashboard/saving-transaction-check/${istransactionRef}`
            }
            className="border border-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white cursor-pointerm transition-all duration-300 ease-in-out"
          >
            Find Saving A/C
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SavingTransaction;
