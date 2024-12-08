import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useSearchMemberQuery } from "../../redux/features/membership/membershipApi";
import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";

const SearchMember = () => {
  const { branchEmail } = useGetBranchEmail();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

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



  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // যদি ইনপুট ফিল্ড খালি না থাকে, তাহলে ড্রপডাউন দেখান
    setDropdownVisible(query.length > 0);
  };

  const handleSelect = (id, memberName) => {
    setSearchQuery(memberName); // নির্বাচিত নাম ইনপুটে সেট করা হবে
    setDropdownVisible(false); // ড্রপডাউন বন্ধ করা হবে
  };

  return (
    
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
                  onClick={() => handleSelect(item._id, item.memberName)}
                >
                  {item.memberName} - {item.phoneNo}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    
  );
};

export default SearchMember;
