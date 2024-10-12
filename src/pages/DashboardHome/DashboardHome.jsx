import BalanceInfo from "./BalanceInfo/BalanceInfo";
import DigitalClock from "./DigitalClock/DigitalClock";
import { HiUserGroup } from "react-icons/hi2";

const DashboardHome = () => {
  return (
    <div className="py-8 px-10">
      <BalanceInfo></BalanceInfo>

      <div className="flex justify-center gap-5 mt-5">
        <div className="flex-1 flex justify-center items-center bg-white rounded-md">
          <DigitalClock></DigitalClock>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="bg-white rounded-md flex items-center py-5 px-5">
            <div className="flex flex-1 gap-8 items-center">
              <HiUserGroup className="text-[40px]" />
              <p className="text-[40px] ">Member</p>
            </div>
            <h2 className="font-semibold text-[40px] flex flex-1 justify-center">
              0
            </h2>
          </div>

          <div className="bg-white rounded-md flex items-center py-5 px-5">
            <div className="flex flex-1 gap-8 items-center">
              <HiUserGroup className="text-[40px]" />
              <p className="text-[40px] ">Group</p>
            </div>
            <h2 className="font-semibold text-[40px] flex flex-1 justify-center">
              0
            </h2>
          </div>

          <div className="bg-white rounded-md flex items-center py-5 px-5">
            <div className="flex flex-1 gap-8 items-center">
              <HiUserGroup className="text-[40px]" />
              <p className="text-[40px] ">Employee</p>
            </div>
            <h2 className="font-semibold text-[40px] flex flex-1 justify-center">
              0
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
