import { useGetBranchEmail } from "../../hooks/useGetBranchEmail";
import { useGetSingleBranchQuery } from "../../redux/features/branch/branchApi";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import formatDateAndTimeForPrint from "../../utils/dateAndTimeForPrint/dateAndTimeForPrint";
import { useGetDailyCreditAndDebitQuery } from "../../redux/features/ledger/ledgerApi";

const DailyLedger = () => {
  const { branchEmail } = useGetBranchEmail();
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { data: singleBranchData } = useGetSingleBranchQuery(branchEmail);
  const { data: ledgerData } = useGetDailyCreditAndDebitQuery(branchEmail);

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="bg-white py-[30px] px-[20px]" ref={contentRef}>
        <div className="px-6 flex justify-between">
          <div>
            <h2 className="font-bold text-[25px]">
              {singleBranchData?.data?.branchName || ""}
            </h2>
            <p className="font-semibold">
              Address: {singleBranchData?.data?.branchAddress || ""}
            </p>
            <p>Email: {singleBranchData?.data?.branchEmail || ""}</p>
            <p>Phone: {singleBranchData?.data?.branchMobile || ""}</p>
          </div>
          <div>
            <h1 className="font-bold text-[25px]">
              Bank Transaction Statement
            </h1>
            <p>Reporting Date: {formatDateAndTimeForPrint()}</p>
          </div>
        </div>

        <hr className="border my-[20px]" />

        <div>
          <div className="px-5">
            <table className="employeeTable">
              <thead className="bg-slate-600 text-white uppercase text-[14px]">
                <tr>
                  <th className="text-center">SL</th>
                  <th className="text-center">Created Date</th>
                  <th className="text-center">Credit</th>
                  <th className="text-center">Debit</th>
                  <th className="text-center">Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData?.data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1} </td>
                    <td className="text-center">{item?.date} </td>
                    <td className="text-center">{item?.credit} </td>
                    <td className="text-center">{item?.debit} </td>
                    <td className="text-center">
                      {item?.credit - item?.debit}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="font-semibold text-center">
                    SubTotal
                  </td>
                  <td className="font-semibold text-center">
                    {ledgerData?.data.reduce(
                      (total, item) => total + (item?.credit || 0),
                      0
                    )}
                  </td>
                  <td className="font-semibold text-center">
                    {ledgerData?.data.reduce(
                      (total, item) => total + (item?.debit || 0),
                      0
                    )}
                  </td>
                  <td className="font-semibold text-center">
                    {ledgerData?.data.reduce(
                      (total, item) => total + (item?.credit || 0),
                      0
                    ) -
                      ledgerData?.data.reduce(
                        (total, item) => total + (item?.debit || 0),
                        0
                      )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="bg-white pb-3 pr-9 flex justify-between">
        <div></div>
        <button
          className="bg-slate-50 border rounded-sm px-3 py-1 text-right flex items-center gap-2"
          onClick={() => reactToPrintFn()}
        >
          <FaPrint />
          Print
        </button>
      </div>
    </div>
  );
};

export default DailyLedger;
