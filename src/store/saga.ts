import { all } from "redux-saga/effects"
import fileSaga from "./files/file.saga"

function* rootSaga() {
  yield all([fileSaga()])
}

export default rootSaga