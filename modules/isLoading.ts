const IsLoadingActionTypes = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
} as const;
type IsLoadingActionTypes = typeof IsLoadingActionTypes[keyof typeof IsLoadingActionTypes];

type ActionFormat = {
  type: IsLoadingActionTypes;
  isLoading: boolean;
};

type Loading = {
  isLoading: boolean;
};

const initLoading: Loading = { isLoading: false };

export const startLoading = (): ActionFormat => {
  return {
    type: IsLoadingActionTypes.START_LOADING,
    isLoading: true,
  };
};
export const stopLoading = (): ActionFormat => {
  return {
    type: IsLoadingActionTypes.STOP_LOADING,
    isLoading: false,
  };
};

export function LoadingReducer(
  state: Loading = initLoading,
  action: ActionFormat
) {
  switch (action.type) {
    case IsLoadingActionTypes.START_LOADING:
      return { ...state, isLoading: action.isLoading };
    case IsLoadingActionTypes.STOP_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
