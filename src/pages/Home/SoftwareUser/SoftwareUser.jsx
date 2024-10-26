import { useGetAllSoftwareUsersQuery } from "../../../redux/features/softwareUsers/softwareUsers";

const SoftwareUser = () => {
  const { data: softwareUsersData } = useGetAllSoftwareUsersQuery();

  return (
    <div className="max-w-[1140px] mx-auto py-20">
      <div className="text-center mb-10">
        <h1 className="font-semibold text-[30px]">সফটওয়্যার ব্যবহারকারী</h1>
        <p className="my-2 text-[20px]">
          নিয়মিত সফটওয়্যার ব্যবহারকারীদের তালিকা
        </p>
      </div>

      <div className="grid grid-cols-4 gap-5 justify-items-center place-items-center">
        {softwareUsersData?.data.map((item) => (

          <div key={item._id} className="border border-slate-300 rounded bg-gray-50 py-2">
            <img className="w-[150px] rounded mx-auto" src={item.softwareUsersLogo} alt="NGO Logo" />
            <h2 className="font-semibold text-center py-2">{item.softwareUsersName}</h2>
            <p className="text-center">{item.softwareUsersAddress}</p>
          </div>

        ))}
      </div>
    </div>
  );
};

export default SoftwareUser;
