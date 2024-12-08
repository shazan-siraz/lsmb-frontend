import { useParams } from "react-router-dom";
import { useGetSingleDpsByIdQuery } from "../../redux/features/dps/dpsApi";
import { FaIdCard } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";

const CreateDpsCollection = () => {
  const { id } = useParams();

  console.log(id);

  const { data: singleDpsData } = useGetSingleDpsByIdQuery(id);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div>
        <h1 className="text-center uppercase font-bold text-[30px] py-1">
          Dps Transaction
        </h1>
      </div>

      <hr />
      <div className="flex justify-evenly">
        <div>
          <div className="flex items-center gap-3">
            <img
              className="w-[60px] h-[60px]"
              src={singleDpsData?.data?.memberOfApplying?.memberPhoto}
              alt=""
            />
            <h3 className="font-semibold text-[25px]">{singleDpsData?.data?.memberName}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaIdCard className="text-[25px]"></FaIdCard>
          <p className="font-semibold text-[25px]">
            {singleDpsData?.data?.memberOfApplying?.memberId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MdPhoneAndroid className="text-[25px]"></MdPhoneAndroid>
          <p className="font-semibold text-[25px]">
            {singleDpsData?.data?.memberOfApplying?.phoneNo}
          </p>
        </div>
      </div>
      <hr />

      <div className="flex justify-around py-5">
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">
            DPS Balance
          </p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">Monthly</p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-[18px] font-semibold">
            Last Transaction
          </p>
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
        </div>
        <div className="grid grid-cols-2 bg-white">
          <p className="border px-5 py-2 text-center text-[18px] font-semibold">
            0
          </p>
          <p className="border px-5 py-2 text-[18px] font-semibold">Days Ago</p>
        </div>
      </div>
      <hr />

      
    </div>
  );
};

export default CreateDpsCollection;
