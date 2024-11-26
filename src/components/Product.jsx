import React, { useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import SubProduct from "./SubProduct";
import DiscountComponent from "./DiscountComponent";
import { MdClose, MdDragIndicator } from "react-icons/md";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  updateProductVariantOrder,
} from "../store/features/product/productSlice";
import { Reorder, useDragControls } from "motion/react";

const Product = React.memo(({ index, product, productLen }) => {
  const [isDiscountClicked, setIsDiscountClicked] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const dispatch = useDispatch();
  const dragControls = useDragControls();

  const onCancel = useCallback(() => {
    setIsModal(false);
  }, []);

  const handleVariantReorder = useCallback(
    (newOrder) => {
      dispatch(
        updateProductVariantOrder({
          id: product.id,
          variants: newOrder,
        })
      );
    },
    [dispatch, product.id]
  );

  return (
    <Reorder.Item
      value={product}
      key={product.id}
      id={product.id}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="flex justify-between items-center gap-2 mt-4">
        <div className="flex justify-center items-center gap-3">
          <MdDragIndicator
            size={30}
            onPointerDown={(event) => dragControls.start(event)}
          />
          <span>{index + 1}.</span>
        </div>
        <div className="flex w-full justify-between items-center gap-5">
          <div className="w-[70%] flex justify-center items-center relative">
            <div
              className="h-9 w-full border text-black/50 px-3 py-2 rounded-sm focus:outline-none drop-shadow-lg"
              placeholder="Select Product"
            >
              {product?.title}
            </div>
            <img
              src="/edit-icon.svg"
              alt="edit-icon"
              className="absolute right-3 cursor-pointer"
              onClick={() => setIsModal(true)}
            />
          </div>
          {isDiscountClicked ? (
            <>
              <button
                onClick={() => setIsDiscountClicked(false)}
                className="bg-[#008060] w-64 px-[25px] py-2 rounded-md text-white font-semibold"
              >
                Add Discount
              </button>
              {productLen > 1 && (
                <span
                  onClick={() => dispatch(removeProduct({ product, index }))}
                >
                  <MdClose className="text-xl text-gray-400" />
                </span>
              )}
            </>
          ) : (
            <>
              <DiscountComponent />
              {productLen > 1 && (
                <span
                  onClick={() => dispatch(removeProduct({ product, index }))}
                >
                  <MdClose className="text-xl text-gray-400" />
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {product?.variants && product?.variants.length > 0 && (
        <div
          onClick={() => setIsHide((prev) => !prev)}
          className="flex justify-end items-center mt-1"
        >
          <span className="inline-flex items-center gap-1 underline text-[#006EFF] text-xs cursor-pointer ">
            <span>{isHide ? "Hide Variants" : "Show Variants"}</span>
            {isHide ? (
              <FaChevronUp className="font-normal" />
            ) : (
              <FaChevronDown className="font-normal" />
            )}
          </span>
        </div>
      )}
      <Reorder.Group
        values={product?.variants}
        onReorder={handleVariantReorder}
        axis="y"
      >
        {isHide &&
          product?.variants.map((variant, idx) => (
            <SubProduct key={idx} variant={variant} productIdx={index} />
          ))}
      </Reorder.Group>
      {productLen - 1 !== index && <hr className="my-7" />}
      {isModal && <Modal index={index} cancel={onCancel} />}
    </Reorder.Item>
  );
});

export default Product;
