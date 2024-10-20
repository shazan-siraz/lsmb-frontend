import { FaCheck } from "react-icons/fa";
import "./UserPriceList.css";
import { useGetAllRegisterPackageQuery } from "../../../redux/features/registerPackage/registerPackage";

const UserPriceList = () => {
  const { data: packageData, isLoading: packageDataLoading } =
    useGetAllRegisterPackageQuery();

  if (packageDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-slate-100 py-[100px]">
      <div className="text-center">
        <h1 className="text-[30px] font-semibold mb-5">মূল্য তালিকা</h1>
        <p className="text-[20px]">কোম্পানি রেজিস্ট্রেশন ফি 3000 টাকা।</p>
      </div>
      <div className="max-w-[1050px] mx-auto">
        <div className="grid grid-cols-3 gap-5 justify-items-center place-items-center">
          {packageData?.data?.map((item) => (
            <div key={item._id} className="price-card">
              <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
                {item.packageName}
              </h1>
              <div className="flex justify-center items-end">
                <h2 className="text-[50px] font-bold">{item.packagePrice}</h2>
                <p className="mb-3 ml-2">BDT</p>
              </div>
              <p className="text-center font-semibold text-[15px]">মাসিক</p>
              <div className="border-b my-[30px]"></div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <p>সর্বোচ্চ {item.memberLimit} মেম্বার</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <p>সর্বোচ্চ {item.branchLimit} টি ব্রাঞ্চ</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-blue-600" />
                  <p>সর্বোচ্চ {item.userLimit} জন ব্যবহারকারী</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                  রেজিস্ট্রেশন
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPriceList;
