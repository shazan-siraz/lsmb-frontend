import { useForm } from "react-hook-form";
// import LoadingComponent from "../../utils/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
// import { useGetAllMembershipQuery, useGetSearchingMembershipQuery } from "../../redux/features/membership/membershipApi";
// import { useSelector } from "react-redux";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { useFindMembershipQuery } from "../../redux/features/membership/membershipApi";

const FindSavingMember = () => {
  // const { email } = useSelector(useCurrentUser);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // const { data: memberData, isLoading: memberDataQueryLoading } =
  //   useGetAllMembershipQuery(email);


const {data} = useFindMembershipQuery()

    console.log(data);



  // if (memberDataQueryLoading) {
  //   return <LoadingComponent></LoadingComponent>;
  // }

  const onSubmit = async (data) => {
    navigate(`/dashboard/saving-transaction/${data.selectedMember}`);
  };

  return (
    <div className="rounded pt-[30px]">
      <div className="max-w-[600px] w-full mx-auto bg-white rounded border-t-[5px] border-slate-500">
        <h1 className="uppercase font-bold text-center text-[30px] p-8">
          Saving Transaction
        </h1>

        

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-8">
            {/* <select
              className="py-2 px-2 my-1 rounded membershipInput border"
              required
              defaultValue=""
              {...register("selectedMember")}
            >
              <option value="" disabled>
                Select Member
              </option>
              {memberData?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item?.memberName} - [ {item?.phoneNo} ]
                </option>
              ))}
            </select> */}
          </div>


          <div className="flex justify-center items-center gap-5 pb-5">
            <label className="font-semibold text-[20px]" htmlFor="email">
              Search Member For Saving Transaction
            </label>
            <input
              className="py-2 px-2 my-1 w-[350px] border rounded-sm membershipInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, PhoneNo, or ID"
              required={true}
            />
          </div>


          <div className="text-center py-8">
            <input
              className="transition-all duration-300 ease-in-out border border-blue-500 py-2 px-10 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindSavingMember;
