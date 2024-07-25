import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {BookType} from "@/app/lib/definitions";


const initialState: {
  view: "list" | "grid";
  selectedBook?: BookType;
  perPage: number,
  page: number,
  search: string,
  currentShelve?: {id?: string, title?: string}

} = {
  view: "grid",
  selectedBook: undefined,
  perPage: 10,
  page: 1,
  search: "",
  currentShelve: {id: "0", title: "Tous les livres"},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<"list" | "grid">) => {
      state.view = action.payload;
    },
    changePerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeSelectedBook: (state, action: PayloadAction<BookType>) => {
      state.selectedBook = action.payload;
    },
    changeCurrentShelve: (state, action: PayloadAction<{id?: string, title?: string}| undefined >) => {
      state.currentShelve = action.payload;
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

  },
});

export const {
  changeView,
    changePerPage,
    changePage,
    changeSelectedBook,
    changeCurrentShelve,
    changeSearch,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
