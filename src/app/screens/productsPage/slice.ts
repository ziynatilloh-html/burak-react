import { ProductsPageState } from "./../../../lib/types/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};
const productsPageSlice = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

const ProductPageReducer = productsPageSlice.reducer;

export default ProductPageReducer;

export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;
