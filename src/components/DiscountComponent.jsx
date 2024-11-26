import React, { useContext, useId, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { DropdownContext } from "./DropdownProvider";

const DiscountComponent = ({ customCss }) => {
  const [discountType, setDiscountType] = useState("% Off");
  const { activeDropdown, toggleDropdown } = useContext(DropdownContext);
  const id = useId();
  const isDropdown = id !== null && activeDropdown === id;

  const onSelect = (selectedType) => {
    setDiscountType(selectedType);
    toggleDropdown(null);
  };
  return (
    <div className="w-52 flex justify-between items-center gap-3">
      <input
        type="number"
        className={`w-24 border-none text-center text-black px-3 font-medium py-2 focus:outline-none drop-shadow-lg ${
          customCss ? "rounded-full" : "rounded-sm"
        }`}
      />
      <div className="relative ">
        <div
          onClick={() => toggleDropdown(id)}
          className={`bg-white py-2 w-24 drop-shadow-lg inline-flex items-center justify-around cursor-pointer ${
            customCss ? "rounded-full" : "rounded-sm"
          }`}
        >
          <span className="font-medium text-base">{discountType}</span>
          {isDropdown ? (
            <FaChevronUp className="text-gray-400" />
          ) : (
            <FaChevronDown className="text-gray-400" />
          )}
        </div>
        {isDropdown && (
          <div className={`absolute top-11 bg-slate-50 w-24 rounded-md z-10`}>
            <div
              onClick={() => onSelect("% Off")}
              className="text-center font-medium text-base py-2 border-b border-black cursor-pointer"
            >
              % Off
            </div>
            <div
              className="text-center py-2 cursor-pointer font-medium text-base"
              onClick={() => onSelect("Flat")}
            >
              Flat
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountComponent;
