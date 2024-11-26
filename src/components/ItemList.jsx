import React, { useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import SubItems from "./SubItems";
import { useDispatch } from "react-redux";
// import {
//   addParentProduct,
//   removeParentProducts,
// } from "../store/features/product/productSlice";

const ItemList = ({ product, index, setSelectedItems, selectedItems }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [subItemStates, setSubItemStates] = useState(
    product.variants.map(() => false)
  );

  const toggleParentItem = useCallback(() => {
    const shouldCheck = !isItemChecked;
    setIsItemChecked(shouldCheck);
    setSubItemStates((prev) => prev.map(() => shouldCheck));
    if (shouldCheck) {
      setSelectedItems((prev) => [...prev, product]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item.id != product.id));
    }
  }, [isItemChecked, setSubItemStates, product]);

  // toggleSubItems array
  const toggleSubItem = (idx, currentSubItemStates) => {
    const updatedSubItemStates = currentSubItemStates.map((state, index) =>
      idx === index ? !state : state
    );
    return updatedSubItemStates;
  };

  const updateSelectedItems = (subProduct, currentSelectedItems, product) => {
    // check if the product exist
    const existingProductIndex = currentSelectedItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex > -1) {
      // check if the variant exist
      const variantExisted = currentSelectedItems[
        existingProductIndex
      ].variants.findIndex((variant) => variant.id === subProduct.id);

      if (variantExisted > -1) {
        const updatedVariants = currentSelectedItems[
          existingProductIndex
        ].variants.filter((variant) => variant.id !== subProduct.id);

        // check after removing variant is products variant is empty than remove the product.
        if (updatedVariants.length === 0) {
          return currentSelectedItems.filter((item) => item.id !== product.id);
        }

        return currentSelectedItems.map((item) =>
          item.id === product.id
            ? { ...product, variants: updatedVariants }
            : item
        );
      } else {
        return currentSelectedItems.map((item) =>
          item.id === product.id
            ? { ...product, variants: [...variants, subProduct] }
            : item
        );
      }
    } else {
      return [...currentSelectedItems, { ...product, variants: [subProduct] }];
    }
  };

  const handleToggleSubItem = useCallback(
    (subProduct, idx) => {
      const updatedSubItemStates = toggleSubItem(idx, subItemStates);
      setSubItemStates(updatedSubItemStates);

      const updatedSelectedItems = updateSelectedItems(
        subProduct,
        selectedItems,
        product
      );

      setSelectedItems(updatedSelectedItems);

      const isAnyProductSelected = updatedSubItemStates.some((state) => state);
      setIsItemChecked(isAnyProductSelected);
    },
    [product, subItemStates, setSelectedItems]
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-4 ml-6 my-2">
        <div
          onClick={toggleParentItem}
          className={`w-4 h-4 inline-flex justify-center items-center ${
            isItemChecked ? "bg-green-700" : "border-black"
          }  border rounded-[4px]`}
        >
          <FaCheck className="w-[10px] h-[10px] text-white " />
        </div>
        <img src={product.image.src} alt="image" className="w-10 h-10" />
        <p className="font-medium text-base">{product.title}</p>
      </div>
      <hr />
      {product.variants.map((item, index) => (
        <div key={index}>
          <SubItems
            isItemChecked={isItemChecked}
            isSubItemChecked={subItemStates[index]}
            subProduct={item}
            onToggleSubItem={() => handleToggleSubItem(item, index)}
          />
          {index !== product.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
