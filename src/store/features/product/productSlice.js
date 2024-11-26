import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const newProduct = () => ({
  id: uuidv4(),
  title: "",
  price: "",
  image: "",
  variants: [],
});

const initialState = {
  allProducts: [newProduct()],
};

const onRemoveVariant = (variant, index, allProducts) => {
  const newVariantList = allProducts[index]?.variants.filter(
    (item) => item.id !== variant.id
  );

  if (newVariantList?.length > 0) {
    const updateList = allProducts.map((product, idx) =>
      idx === index ? { ...product, variants: newVariantList } : product
    );
    return updateList;
  }

  return allProducts.filter((_, idx) => idx !== index);
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createComponent: (state) => {
      const newProductWithUuid = newProduct();
      state.allProducts.push(newProductWithUuid);
    },
    addProduct: (state, action) => {
      const { index, selectedItems } = action.payload;
      const newList = [...state.allProducts];
      newList.splice(index, 1, ...selectedItems);
      state.allProducts = newList;
    },
    removeProduct: (state, action) => {
      const { index } = action.payload;
      const newList = state.allProducts.filter((_, idx) => idx !== index);
      state.allProducts = newList;
    },
    removeVariant: (state, action) => {
      const { variant, index } = action.payload;
      const updateList = onRemoveVariant(variant, index, state.allProducts);
      if (updateList.length === 0) {
        state.allProducts = [newProduct];
        return;
      }
      state.allProducts = updateList;
    },

    updateProductOrder: (state, action) => {
      state.allProducts = action.payload;
    },

    updateProductVariantOrder: (state, action) => {
      const { id, variants } = action.payload;
      const productIndex = state.allProducts.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        state.allProducts[productIndex] = {
          ...state.allProducts[productIndex],
          variants: [...variants],
        };
      }
    },
  },
});

export const {
  createComponent,
  addProduct,
  removeProduct,
  removeVariant,
  updateProductOrder,
  updateProductVariantOrder,
} = productSlice.actions;

export default productSlice.reducer;
