import { useParams } from "react-router-dom";
import { useGetSingleMembershipQuery } from "../../redux/features/membership/membershipApi";

const UpdateMember = () => {
    const {id} = useParams();

    const {data: singleMemberData} = useGetSingleMembershipQuery(id)

    console.log(singleMemberData);
     
    return (
        <div>
            <h1>update member</h1>
        </div>
    );
};

export default UpdateMember;