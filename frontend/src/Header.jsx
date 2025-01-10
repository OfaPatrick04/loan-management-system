import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <div className="h-10 bg-slate-500 flex items-center p-2 lg:px-5 mb-1 justify-between">
      <div>
        <p className="italic text-white font-bold">Loan Management System</p>
      </div>
      <div>
        <CgProfile size={25}  className="text-white"/>
      </div>
    </div>
  );
};

export default Header;
