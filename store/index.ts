import { AuthReducer } from "../modules/auth";
import { BookReducer } from "../modules/books";
import { BookshelfReducer } from "../modules/bookshlef";
import { MyBookshelfReducer } from "../modules/my-bookshlef";
import { LoadingReducer } from "../modules/isLoading";

import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  auth: AuthReducer,
  book: BookReducer,
  myBookshelf: MyBookshelfReducer,
  bookshelf: BookshelfReducer,
  loading: LoadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const initialState = {};

// TODO epic middleware使ってみたいな。。
const store = createStore(rootReducer, initialState);

export default store;
