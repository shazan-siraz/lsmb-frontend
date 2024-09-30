import { useState } from "react";
import { Modal } from "antd";
import { NavLink } from "react-router-dom";
import membershipIcon from "../../assets/icons/user-plus.png";
import loanIcon from "../../assets/icons/home.png";
import dpsIcon from "../../assets/icons/server.png";
import fdrIcon from "../../assets/icons/fdr.png";
import withDrawIcon from "../../assets/icons/minus.png";
import expenseIcon from "../../assets/icons/expence.png";
import windowIcon from '../../assets/icons/window-icon.png'

const ModalComponents = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <p onClick={showModal}> <img className="w-[40px]" src={windowIcon} alt="windowicon" /></p>
      <Modal open={open} title="Quick Access" onCancel={handleCancel} footer={[]}>
        <div className="grid grid-cols-2 gap-5">
          <NavLink
            className="hover:text-white"
            target="_blank"
            to="membership-create"
          >
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img
                  className="w-14"
                  src={membershipIcon}
                  alt="membershipIcon"
                />
                <p className="text-3xl font-semibold">MEMBERSHIP</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            className="hover:text-white"
            target="_blank"
            to="loan-create"
          >
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img className="w-14" src={loanIcon} alt="loanIcon" />
                <p className="text-3xl font-semibold">LOAN</p>
              </div>
            </div>
          </NavLink>

          <NavLink className="hover:text-white" target="_blank" to="dps-create">
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img className="w-14" src={dpsIcon} alt="dpsIcon" />
                <p className="text-3xl font-semibold">DPS</p>
              </div>
            </div>
          </NavLink>

          <NavLink className="hover:text-white" target="_blank" to="fdr-create">
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img className="w-14" src={fdrIcon} alt="fdrIcon" />
                <p className="text-3xl font-semibold">FDR</p>
              </div>
            </div>
          </NavLink>

          <NavLink className="hover:text-white" target="_blank" to="withdraw">
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img className="w-14" src={withDrawIcon} alt="withdrawIcon" />
                <p className="text-3xl font-semibold">WITHDRAW</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            className="hover:text-white"
            target="_blank"
            to="expense-create"
          >
            <div className="bg-gradient-to-r from-indigo-300 from-10% via-sky-400 via-30% to-emerald-400 to-90% flex justify-center items-center rounded-lg h-[150px]">
              <div className="flex flex-col items-center">
                <img className="w-14" src={expenseIcon} alt="expenseIcon" />
                <p className="text-3xl font-semibold">EXPENSE</p>
              </div>
            </div>
          </NavLink>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponents;
