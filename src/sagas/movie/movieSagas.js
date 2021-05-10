import {
  put, call, takeLatest,
} from 'redux-saga/effects';
import { actions } from '../../redux/movie';
import { apiMovie } from '../../api';
import { notification } from '../../components/index';

export function* movieList(data) {
  try {
    const dataResp = yield call(apiMovie, data.payload);
    if (dataResp && dataResp.Response === 'True') {
      yield put({
        type: actions.MOVIE_LIST_SUCCESS,
        payload: {
          success: dataResp,
        },
      });
    } else {
      notification('error', dataResp.Error);
      yield put({
        type: actions.MOVIE_LIST_ERROR,
        payload: {
          error: dataResp,
        },
      });
    }
  } catch (err) {
    let errorResponse = { message: '' };
    if (err.response && err.response.data) {
      errorResponse = err.response.data;
    }
    // notification('error', errorResponse.message || err.message);
    yield put({
      type: actions.MOVIE_LIST_ERROR,
      payload: {
        error: errorResponse,
      },
    });
  }
}

export function* movieDetail(data) {
  try {
    const dataResp = yield call(apiMovie, data.payload);
    if (dataResp) {
      yield put({
        type: actions.MOVIE_DETAIL_SUCCESS,
        payload: {
          successDetail: dataResp,
        },
      });
    }
  } catch (err) {
    let errorResponse = { message: '' };
    if (err.response && err.response.data) {
      errorResponse = err.response.data;
    }
    // notification('error', errorResponse.message || err.message);
    yield put({
      type: actions.MOVIE_DETAIL_ERROR,
      payload: {
        errorDetail: errorResponse,
      },
    });
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.MOVIE_LIST_REQUEST, movieList);
  yield takeLatest(actions.MOVIE_DETAIL_REQUEST, movieDetail);
}
