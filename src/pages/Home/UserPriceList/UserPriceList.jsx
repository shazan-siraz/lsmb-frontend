import { FaCheck } from "react-icons/fa";
import "./UserPriceList.css";

const UserPriceList = () => {
  return (
    <div className="bg-slate-100 py-[100px]">
      <div className="text-center">
        <h1 className="text-[30px] font-semibold mb-5">মূল্য তালিকা</h1>
        <p className="text-[20px]">কোম্পানি রেজিস্ট্রেশন ফি 3000 টাকা।</p>
      </div>
      <div className="max-w-[1050px] mx-auto">
        <div className="grid grid-cols-3 gap-5 justify-items-center place-items-center">
          
          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Startup
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">300</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 250 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 1 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 15 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>

          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Primary
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">500</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 500 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 1 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 30 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>

          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Standard
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">800</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 1000 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 1 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 60 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>

          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Standard Plus
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">1200</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 2000 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 2 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 80 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>

          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Premium
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">300</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 4000 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 3 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 100 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>

          <div className="price-card">
            <h1 className="text-center text-blue-600 text-[20px] uppercase font-semibold">
              Silver
            </h1>
            <div className="flex justify-center items-end">
              <h2 className="text-[50px] font-bold">2000</h2>
              <p className="mb-3 ml-2">BDT</p>
            </div>
            <p className="text-center font-semibold text-[15px]">মাসিক</p>
            <div className="border-b my-[30px]"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 5000 মেম্বার</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 4 টি ব্রাঞ্চ</p>
              </div>
              <div className="flex items-center gap-3">
                <FaCheck className="text-blue-600" />
                <p>সর্বোচ্চ 120 জন ব্যবহারকারী</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="border rounded-full px-10 py-1 border-blue-600 text-[15px] text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
                রেজিস্ট্রেশন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPriceList;
