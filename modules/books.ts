import axios from "axios";
import { databaseApp } from "../fbConfig";
const BOOKSHELFS_DATABASE: string = "bookshelfs";

const BookActionTypes = {
  LIST_BOOK: "LIST_BOOK",
  GET_BOOK: "GET_BOOK",
  CREATE_BOOK: "CREATE_BOOK",
  UPDATE_BOOK: "UPDATE_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
} as const;
type BookActionTypes = typeof BookActionTypes[keyof typeof BookActionTypes];

type ActionFormat = {
  type: BookActionTypes;
  id: string;
  title?: string;
  userId?: string;
  content?: string;
};

export type BookFormat = {
  id?: string;
  title?: string;
  userId?: string;
  content?: string;
};

export type BookStateFormat = BookFormat;
const initBookState: BookStateFormat = {};

export const getBook = async (id: string): Promise<ActionFormat> => {
  const bookshelfsRef = databaseApp.collection(BOOKSHELFS_DATABASE).doc(id);
  const snapshot = await bookshelfsRef.get();
  const doc = snapshot.data();

  const { data } = await axios.get(`https://api.github.com/gists/${id}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  const content: string = data["files"]["bookshelf.yaml"].content;
  // TODO doc!直す

  return {
    type: BookActionTypes.GET_BOOK,
    id: id,
    title: doc!.title,
    userId: doc!.userId,
    content: content,
  };
};

export function BookReducer(
  state: BookStateFormat = initBookState,
  action: ActionFormat
) {
  switch (action.type) {
    case BookActionTypes.GET_BOOK:
      return {
        ...state,
        id: action.id,
        title: action.title,
        userId: action.userId,
        content: action.content,
      };
    default:
      return state;
  }
}
