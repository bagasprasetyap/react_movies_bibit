import { all } from 'redux-saga/effects';
import movieSagas from './movie/movieSagas';

export default function* rootSaga() {
  yield all([
    movieSagas(),
  ]);
}
