import React, { useRef, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import ItemList from "./ItemList";
import { products } from "../../dummyData";
import useClickOutside from "../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/features/product/productSlice";

const Modal = ({ index, cancel }) => {
  const modalRef = useRef(null);
  const { allProducts } = useSelector((store) => store.product);
  // const [search, setSearch] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const disptach = useDispatch();
  useClickOutside(modalRef, cancel);

  // const {
  //   isPending,
  //   error,
  //   data,
  //   isFetching,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useQueryProduct({ search: search || 'hat' });

  // if (isPending) {
  //   return <div>Loading....</div>;
  // }
  // if (error) {
  //   return <div>{error}</div>;
  // }

  const onConfirm = (isSelected, itemsSelected) => {
    disptach(addProduct({ index, selectedItems }));
    cancel();
  };

  return (
    <>
      <div className="fixed w-full h-screen flex flex-col justify-center items-center top-0 left-0 z-50 bg-black/50">
        <div
          ref={modalRef}
          className="w-[45%] max-h-[90vh] z-40 bg-white rounded-md overflow-hidden"
        >
          <div className="flex justify-between items-center mt-3 mb-2">
            <p className="ml-6">Select product</p>
            <MdClose
              className="mr-4 text-xl text-gray-400 cursor-pointer"
              onClick={cancel}
            />
          </div>
          <hr />
          <div className="relative flex justify-center items-center mx-5 my-2">
            <MdSearch className="absolute left-4 text-xl" />
            <input
              className="w-full border border-black/10 px-10 py-[6px] focus:outline-none"
              placeholder="Search Product"
            />
          </div>
          <hr />
          <div className="overflow-y-auto py-3" style={{ maxHeight: "60vh" }}>
            {products &&
              products.map((product) => (
                <ItemList
                  key={product.id}
                  product={product}
                  index={index}
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
                />
              ))}
          </div>
          <hr />
          <div className="flex justify-between items-center mx-4 mt-3 mb-4">
            <p>
              {allProducts.length !== 0 && allProducts.length} Product Selected
            </p>
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={cancel}
                className="border-[#000000]/40 border px-[25px] py-2 text-[#000000]/60 font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-[#008060] px-[25px] py-2 rounded-md text-white font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
