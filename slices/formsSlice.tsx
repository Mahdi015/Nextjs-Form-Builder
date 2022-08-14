import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type field = {
  type?: string;
  value?: string;
  required?: boolean;
}

export type form = {
  id: string;
  name: string;
  fields: field[];
};

let initialState: form[] = [

]


if (typeof window !== "undefined") {
  if (localStorage.getItem("forms")) {
    const data = JSON.parse(localStorage.getItem("forms") || "{}");
    initialState = data;
  }
}

const formsSlice = createSlice({
  name: "forms",
  initialState:initialState,
  reducers: {
    updateForms: (state, action: PayloadAction<form>) => {
      state.push(action.payload);
    },
    test: (state, action) => {
      return action.payload 
    },
  },
});

// Selector
export const selectForms = (state: RootState) => state.forms;
export const { updateForms,test } = formsSlice.actions;
export default formsSlice.reducer;
