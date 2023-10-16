import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { AxiosResponse } from "axios";
import request from "../../server";
import { CategoryResponseType } from "../../types/category";

interface StateType {
  loading: boolean;
  categories: CategoryResponseType[];
}

const initialState: StateType = {
  loading: false,
  categories: [],
};

export const getCategories = createAsyncThunk("category/fetching", async () => {
  // const { data }: AxiosResponse<CategoryResponseType[]> = await request.get(
  //   "category"
  // );
  const { data } = await request.get("category");
  return data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload }: PayloadAction<CategoryResponseType[]>) => {
        state.loading = false;
        state.categories = payload;
      }
    );
    builder.addCase(getCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});
