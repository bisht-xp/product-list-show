import React, { useState } from "react";
import DiscountComponent from "./DiscountComponent";
import { MdClose, MdDragIndicator } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeVariant } from "../store/features/product/productSlice";
import { Reorder, useDragControls } from "motion/react";

const SubProduct = React.memo(({ variant, productIdx }) => {
  const dispatch = useDispatch();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={variant}
      key={variant.id}
      id={variant.id}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="flex justify-end items-center gap-5 my-8 ">
        <MdDragIndicator
          size={30}
          onPointerDown={(event) => dragControls.start(event)}
        />

        <div className="w-[50%] border text-black px-3 py-2 rounded-full focus:outline-none drop-shadow-lg">
          <p className="pl-4">{variant?.title}</p>
        </div>
        <DiscountComponent customCss={"rounded-full"} />
        <span
          onClick={() =>
            dispatch(removeVariant({ variant, index: productIdx }))
          }
        >
          <MdClose className="text-xl text-gray-400" />
        </span>
      </div>
    </Reorder.Item>
  );
});

export default SubProduct;
