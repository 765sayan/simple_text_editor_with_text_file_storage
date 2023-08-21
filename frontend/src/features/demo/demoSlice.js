import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  user: null,
  edit: null,
};

export const changeUser = createAsyncThunk("demo/changeUser", async () => {
  return "Hello";
});

export const imp = createAsyncThunk("demo/imp", async () => {
  var res = await fetch("http://127.0.0.1:8080/json");
  res = await res.json();
  return res;
});

export const editData = createAsyncThunk("demo/editData", async (edit) => {
  const data = { input: edit };
  console.log(data);
  var res = await fetch("http://127.0.0.1:8080/json1/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  res = await res.json();
  return res;
});

export const setData = createAsyncThunk("demo/setData", async (data) => {
  return data;
});

export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changeUser.pending, (state, action) => {
        state.user = "null";
      })
      .addCase(imp.fulfilled, (state, action) => {
        state.user = action.payload.surname;
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.user = action.payload.surname;
      })
      .addCase(setData.fulfilled, (state, action) => {
        state.edit = action.payload;
      });
  },
});

export const { reset } = demoSlice.actions;
export default demoSlice.reducer;
