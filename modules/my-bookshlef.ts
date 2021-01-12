import axios from "axios";
import { databaseApp } from "../fbConfig";
import { AuthUser } from "./auth";

import githubTokenHeader from "../helpers/githubTokenHeader";

const BOOKSHELFS_DATABASE: string = "bookshelfs";

const MyBookshelfActionTypes = {
  LIST_MY_BOOKSHELF: "LIST_MY_BOOKSHELF",
  GET_MY_BOOKSHELF: "GET_MY_BOOKSHELF",
  CREATE_MY_BOOKSHELF: "CREATE_MY_BOOKSHELF",
  UPDATE_MY_BOOKSHELF: "UPDATE_MY_BOOKSHELF",
  DELETE_MY_BOOKSHELF: "DELETE_MY_BOOKSHELF",
} as const;
type MyBookshelfActionTypes = typeof MyBookshelfActionTypes[keyof typeof MyBookshelfActionTypes];

type ActionFormat = {
  type: MyBookshelfActionTypes;
  data: MyBookshelfStateFormat;
};

export type MyBookshelfFormat = {
  id: string;
  title?: string;
  userId?: string;
  userName?: string | null;
  photoURL?: string | null;
  githubUser?: string;
  fileName?: string;
  content?: string;
};

export type MyBookshelfStateFormat = MyBookshelfFormat[];
const initMyBookshelfState: MyBookshelfStateFormat = [];

export const listBookshelf = async (userId: string): Promise<ActionFormat> => {
  const bookshelfsRef = databaseApp.collection(BOOKSHELFS_DATABASE);
  const snapshot = await bookshelfsRef.where("userId", "==", userId).get();
  const data: MyBookshelfStateFormat = [];
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
    type: MyBookshelfActionTypes.LIST_MY_BOOKSHELF,
    data,
  };
};

export const addMyBookshelf = async (
  text: string,
  User: AuthUser
): Promise<ActionFormat | undefined> => {
  try {
    const files = {
      description: text,
      files: {
        "bookshelf.yaml": {
          content: "-",
        },
      },
      public: true,
    };
    const { data } = await axios.post(`https://api.github.com/gists`, files, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...githubTokenHeader(),
      },
    });

    const doc = {
      title: text,
      userId: User.id,
      userName: User.displayName,
      photoURL: User.photoURL,
      githubUser: data.owner.login,
      fileName: "bookshelf.yaml",
    };

    await databaseApp.collection(BOOKSHELFS_DATABASE).doc(data.id).set(doc);

    const payload: MyBookshelfStateFormat = [
      {
        id: data.id,
        ...doc,
      },
    ];
    return {
      type: MyBookshelfActionTypes.CREATE_MY_BOOKSHELF,
      data: payload,
    };
  } catch (e) {
    console.log({ e });
  }
};
export const updateMyBookshelf = async (
  id: string,
  content: string
): Promise<ActionFormat> => {
  const files = {
    files: {
      "bookshelf.yaml": {
        content: content,
      },
    },
    public: true,
  };
  await axios.patch(`https://api.github.com/gists/${id}`, files, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...githubTokenHeader(),
    },
  });

  const bookshelf: MyBookshelfFormat = {
    id,
    content,
  };

  return {
    type: MyBookshelfActionTypes.UPDATE_MY_BOOKSHELF,
    data: [bookshelf],
  };
};

export function MyBookshelfReducer(
  state: MyBookshelfStateFormat = initMyBookshelfState,
  action: ActionFormat // TODO StateによってFormat分けれるか調べる
) {
  switch (action.type) {
    case MyBookshelfActionTypes.LIST_MY_BOOKSHELF:
      action.data.forEach((bookshelf) => {
        const index = state.findIndex((f) => f.id === bookshelf.id);
        if (index === -1) {
          return state.push(bookshelf);
        }
        state[index] = Object.assign(state[index], bookshelf);
      });
      return [...state];
    case MyBookshelfActionTypes.CREATE_MY_BOOKSHELF:
      return [...state, ...action.data];
    case MyBookshelfActionTypes.UPDATE_MY_BOOKSHELF:
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
