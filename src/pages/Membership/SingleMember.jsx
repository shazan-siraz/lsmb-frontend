import { useParams } from "react-router-dom";
import { useGetSingleMembershipQuery } from "../../redux/features/membership/membershipApi";
import { timeFormat } from "../../utils/timeFormat/timeFormat";

const SingleMember = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleMembershipQuery(id);

  const memberData = data?.data;

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 px-5 py-5">
        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            Savings Summary
          </caption>
          <tr className="uppercase font-semibold">
            <td>Total Saving</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Total Withdraw</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Net Saving</td>
            <td>0 BDT</td>
          </tr>
        </table>

        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            Loan Summary
          </caption>
          <tr className="uppercase font-semibold">
            <td>Total Saving</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Total Withdraw</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Net Saving</td>
            <td>0 BDT</td>
          </tr>
        </table>

        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            DPS Summary{" "}
          </caption>
          <tr className="uppercase font-semibold">
            <td>Total Saving</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Total Withdraw</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Net Saving</td>
            <td>0 BDT</td>
          </tr>
        </table>

        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            FDR Summary{" "}
          </caption>
          <tr className="uppercase font-semibold">
            <td>Total Saving</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Total Withdraw</td>
            <td>0 BDT</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Net Saving</td>
            <td>0 BDT</td>
          </tr>
        </table>
      </div>

      <div className="px-5 grid grid-cols-2 gap-5">
        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            Member Information
          </caption>
          <tr className="uppercase font-semibold">
            <td>Name</td>
            <td>{memberData?.memberName}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Member Id</td>
            <td>{memberData?.memberId}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Phone</td>
            <td>{memberData?.phoneNo}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Email</td>
            <td className="lowercase">{memberData?.email}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>NID</td>
            <td>{memberData?.memberNid}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Admission Fees</td>
            <td>{memberData?.admissionFees}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Share Amount</td>
            <td>{memberData?.shareAmount}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Gender</td>
            <td>{memberData?.gender}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Date Of Birth</td>
            <td>{memberData?.dateOfBirth}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>AGE</td>
            <td>{memberData?.age}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Father/Husband</td>
            <td>{memberData?.fatherHusbandName}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Profession</td>
            <td>{memberData?.profession}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Religion</td>
            <td>{memberData?.religion}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>District</td>
            <td>{memberData?.district}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Thana</td>
            <td>{memberData?.thana}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Present Address</td>
            <td>{memberData?.presentAddress}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Permanent Address</td>
            <td>{memberData?.permanentAddress}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Reference Type</td>
            <td></td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Reference Name</td>
            <td>{memberData?.referenceUser || memberData?.referenceMember}</td>
          </tr>
          <tr className="uppercase font-semibold">
            <td>Group</td>
            <td>{memberData?.groupName}</td>
          </tr>
        </table>

        <table>
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            Additional Information
          </caption>
          <tr>
            <td>
              <h1 className="bg-slate-500 font-semibold text-center text-white py-1">
                Member Photo
              </h1>
              <img src={memberData.memberPhoto} alt="" />
            </td>
            <td>
              <h1 className="bg-slate-500 font-semibold text-center text-white py-1">
                Signature
              </h1>
              <img src={memberData.signature} alt="" />
            </td>
          </tr>

          <tr>
            <td>
              <h1 className="bg-slate-500 font-semibold text-center text-white py-1">
                Passport/Nid
              </h1>
              <img src={memberData.passportOrNid} alt="" />
            </td>
            <td>
              <h1 className="bg-slate-500 font-semibold text-center text-white py-1">
                Cheque Book
              </h1>
              <img src={memberData.chequeBook} alt="" />
            </td>
          </tr>
          <tr>
            <td>Assign User</td>
            <td>{memberData.assignFieldUser}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>{timeFormat(memberData.createdAt)}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td>{timeFormat(memberData.updatedAt)}</td>
          </tr>
        </table>
      </div>

      <div className="px-5 py-5">
        <table className="w-[100%]">
          <caption className="bg-slate-600 text-white font-semibold py-1 uppercase">
            Nominee Information
          </caption>
          <thead>
            <tr className="uppercase font-semibold">
              <td>SL</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Nid</td>
              <td>Relation</td>
              <td>Distribution</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {memberData?.nominee?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.nomineeName}</td>
                <td>{item.nomineePhone}</td>
                <td>{item.nomineeNid}</td>
                <td>{item.nomineeRelation}</td>
                <td>{item.distributation}</td>
                <td>UNCHANGED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleMember;
