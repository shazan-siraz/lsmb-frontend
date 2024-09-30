/* eslint-disable react/prop-types */
import { timeFormat } from "../../utils/timeFormat/timeFormat";
import GroupModal from "./GroupModal";

const GroupTable = ({ index, item }) => {
  return (
    <tr key={item.groupCode}>
      <td className="text-center">{index + 1} </td>
      <td className="text-center">{item.groupCode}</td>
      <td className="text-center">{item.groupTitle}</td>
      <td className="text-center">{timeFormat(item.createdAt)}</td>
      <td className="text-center">
        <button><GroupModal modalData = {item}></GroupModal></button>
      </td>
    </tr>
  );
};

export default GroupTable;
