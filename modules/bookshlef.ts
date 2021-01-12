import { databaseApp } from "../fbConfig";

const BOOKSHELFS_DATABASE: string = "bookshelfs";

const BookshelfActionTypes = {
  LIST_BOOKSHELF: "LIST_BOOKSHELF",
} as const;
type BookshelfActionTypes = typeof BookshelfActionTypes[keyof typeof BookshelfActionTypes];

type ActionFormat = {
  type: BookshelfActionTypes;
  data: BookshelfStateFormat;
};

export type BookshelfFormat = {
  id: string;
  title: string;
  userId: boolean;
  userName: string;
  photoURL: string;
};

export type BookshelfStateFormat = BookshelfFormat[];
const initBookshelfState: BookshelfStateFormat = [];

export const listBookshelf = async (): Promise<ActionFormat> => {
  const bookshelfsRef = databaseApp.collection(BOOKSHELFS_DATABASE);
  const snapshot = await bookshelfsRef.get();

  const data: BookshelfStateFormat = [];
  snapshot.forEach((doc) => {
    const docData = doc.data();
    data.push({
      id: doc.id,
      title: docData.title,
      userId: docData.userId,
      userName: docData.userName,
      photoURL: docData.photoURL,
    });
  });

  return {
    type: BookshelfActionTypes.LIST_BOOKSHELF,
    data,
  };
};

export function BookshelfReducer(
  state: BookshelfStateFormat = initBookshelfState,
  action: ActionFormat
) {
  switch (action.type) {
    case BookshelfActionTypes.LIST_BOOKSHELF:
      action.data.forEach((bookshelf) => {
        const index = state.findIndex((f) => f.id === bookshelf.id);
        if (index === -1) {
          return state.push(bookshelf);
        }
        state[index] = Object.assign(state[index], bookshelf);
      });
      return [...state];
    default:
      return state;
  }
}
