import React, { useEffect, useState } from "react";
import Product from "./Product";
import DropdownProvider from "./DropdownProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  createComponent,
  updateProductOrder,
} from "../store/features/product/productSlice";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Reorder, useDragControls } from "motion/react";

const ProductList = () => {
  const { allProducts } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = allProducts.findIndex(
        (product) => product.id === active.id
      );
      const newIndex = allProducts.findIndex(
        (product) => product.id === over.id
      );

      const reorderedProducts = arrayMove(allProducts, oldIndex, newIndex);
      dispatch(updateProductOrder(reorderedProducts));
    }
  };

  const handleReorder = (newOrder) => {
    dispatch(updateProductOrder(newOrder));
  };

  return (
    <div className="w-full md:w-[85%] lg:w-[50%] mx-auto">
      <div className="flex justify-start items-center ml-4">
        <h4 className="text-xl font-semibold">Add Product</h4>
      </div>
      <div className="flex justify-between items-center mt-12">
        <span className="text-lg font-medium ml-16">Product</span>
        <span className="text-lg font-medium mr-16">Discount</span>
      </div>
      <DropdownProvider>
        <Reorder.Group values={allProducts} onReorder={handleReorder}>
          {allProducts?.length > 0 &&
            allProducts?.map((product, index) => (
              <Product
                key={product.id}
                index={index}
                product={product}
                onClickHandler={() => setIsModal(true)}
                productLen={allProducts.length}
              />
            ))}
        </Reorder.Group>
      </DropdownProvider>

      <div className="mt-5 flex justify-end items-center">
        <button
          onClick={() => dispatch(createComponent())}
          className="border-[#008060] border-[3px] px-[54px] py-4 text-[#008060] font-semibold text-xl rounded-md"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductList;
