import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { AxiosResponse } from "axios";
import request from "../../server";
import { ProductResponseType } from "../../types/product";

interface StateType {
  loading: boolean;
  products: ProductResponseType[];
}

const initialState: StateType = {
  loading: false,
  products: [],
};

export const getProduct = createAsyncThunk("product/fetching", async (id) => {
  // const { data }: AxiosResponse<CategoryResponseType[]> = await request.get(
  //   "category"
  // );
  if (id === undefined) {
    return [];
  }
  const { data } = await request.get(`category/${id}/product`);
  return data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, { payload }: PayloadAction<ProductResponseType[]>) => {
        state.loading = false;
        state.products = payload;
      }
    );
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});
