import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { QuoteData } from "../constans/constans";

const initialState: QuoteData[] = [];
export const getQuoteAction = createAsyncThunk<
  QuoteData[],
  void,
  { state: RootState }
>("getQuote", async () => {
  return fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("quoteData", JSON.stringify(data));
      return data;
    })
    .catch((error) => console.log(error.message));
});

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    addQuote: (state, action: PayloadAction<QuoteData[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
    getQuote: (state, action: PayloadAction<QuoteData>) => {
      const id = action.payload.id;
      let findElem: any = state.filter((elem)=> elem.id === id);
      let start= state.indexOf(findElem);
      state.splice(start, 20);
      },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQuoteAction.fulfilled,
      (state, action: PayloadAction<QuoteData[]>) => {
        state.splice(0, state.length, ...action.payload);
      },
    );
  },
});
export const { addQuote, getQuote } = quoteSlice.actions;
export default quoteSlice.reducer;
