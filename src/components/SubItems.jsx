import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

const SubItems = ({ isItemChecked, isSubItemChecked, subProduct, onToggleSubItem }) => {

  return (
    <>
      <div className="flex justify-between items-center my-2 ">
        <div className="flex justify-center items-center gap-5 ml-16">
          <div
            onClick={onToggleSubItem}
            className={`w-4 h-4 inline-flex justify-center items-center ${
                isItemChecked && isSubItemChecked
                ? "bg-green-700"
                : "border-black border"
            }  rounded-[4px]`}
          >
            <FaCheck className="w-[10px] h-[10px] text-white " />
          </div>
          <p className="font-medium text-base">{subProduct.title}</p>
        </div>
        <div className="flex justify-center items-center gap-5 mr-10">
          {/* <p className="font-medium text-base">99 available</p> */}
          <p className="font-medium text-base">${subProduct.price}</p>
        </div>
      </div>
    </>
  );
};

export default SubItems;
