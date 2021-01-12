import { User } from "@firebase/auth-types";
import { databaseApp, authApp } from "../fbConfig";

const AuthActionTypes = {
  AUTH_LOGIN: "AUTH_LOGIN",
  AUTH_LOGOUT: "AUTH_LOGOUT",
} as const;
type AuthActionTypes = typeof AuthActionTypes[keyof typeof AuthActionTypes];

type ActionFormat = {
  type: AuthActionTypes;
  user?: User;
  token?: string;
};

export interface AuthUser {
  id?: string;
  displayName?: string | null;
  photoURL?: string | null;
}

export interface AuthUserInfo {
  authUser: AuthUser | null;
  token: string | null;
  isLoggedin: boolean;
}

const initAuthUser: AuthUserInfo = {
  authUser: null,
  token: null,
  isLoggedin: false,
};

const createAuthUser = (firebaseUser: User | null): AuthUser | null => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }
  return {
    id: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
  };
};

export const login = (user: User, token?: string): ActionFormat => {
  const authUser = createAuthUser(user);
  if (authUser !== null) {
    databaseApp.collection("users").doc(authUser.id).set(authUser);
  }
  return {
    type: AuthActionTypes.AUTH_LOGIN,
    user,
    token,
  };
};
export const logout = (): ActionFormat => {
  authApp?.signOut();
  return {
    type: AuthActionTypes.AUTH_LOGOUT,
  };
};

export function AuthReducer(
  state: AuthUserInfo = initAuthUser,
  action: ActionFormat
) {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN:
      const loginState = {
        authUser: createAuthUser(action.user!),
        token: action.token!,
        isLoggedin: true,
      };
      return {
        ...state,
        ...loginState,
      };
    case AuthActionTypes.AUTH_LOGOUT:
      const logoutState = {
        authUser: null,
        token: null,
        isLoggedin: false,
      };
      return {
        ...state,
        ...logoutState,
      };
    default:
      return state;
  }
}
