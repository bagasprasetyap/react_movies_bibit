export const actions = {
  MOVIE_LIST_REQUEST: 'MOVIE_LIST_REQUEST',
  MOVIE_LIST_SUCCESS: 'MOVIE_LIST_SUCCESS',
  MOVIE_LIST_ERROR: 'MOVIE_LIST_ERROR',

  MOVIE_DETAIL_REQUEST: 'MOVIE_DETAIL_REQUEST',
  MOVIE_DETAIL_SUCCESS: 'MOVIE_DETAIL_SUCCESS',
  MOVIE_DETAIL_ERROR: 'MOVIE_DETAIL_ERROR',

  getMovieList: (data) => {
    return {
      type: actions.MOVIE_LIST_REQUEST,
      payload: data,
    };
  },

  getMovieDetail: (data) => {
    return {
      type: actions.MOVIE_DETAIL_REQUEST,
      payload: data,
    };
  },
};

const initState = {
  isLoading: false,
  success: null,
  error: null,

  isLoadingDetail: false,
  successDetail: null,
  errorDetail: null,
};

export default function resetReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.MOVIE_LIST_REQUEST:
      return { ...state, isLoading: true };
    case actions.MOVIE_LIST_SUCCESS:
      return {
        ...state, ...payload, isLoading: false, error: null,
      };
    case actions.MOVIE_LIST_ERROR:
      return {
        ...state, isLoading: false, ...payload, success: null,
      };

    case actions.MOVIE_DETAIL_REQUEST:
      return { ...state, isLoadingDetail: true };
    case actions.MOVIE_DETAIL_SUCCESS:
      return {
        ...state, ...payload, isLoadingDetail: false, errorDetail: null,
      };
    case actions.MOVIE_DETAIL_ERROR:
      return {
        ...state, isLoadingDetail: false, ...payload, successDetail: null,
      };
    default:
      return state;
  }
}