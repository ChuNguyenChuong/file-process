import { PayloadAction } from "@reduxjs/toolkit"
import { RcFile } from "antd/es/upload"
import { all, call, put, takeLatest, } from "redux-saga/effects"
import { IPayload } from "../../types"
import { sendFiles } from "./api"
import { SagaIterator } from "redux-saga"
import { uploadFileStore, uploadFileStoreFail, uploadFileStoreSuccess } from "./filesSlice"
import { message } from 'antd';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* sendFile(action: PayloadAction<IPayload<RcFile[]>>): SagaIterator {
  try {
    message.loading("File uploading ...");
    const fileRes = yield call(sendFiles, action.payload.data);
    yield put({ type: uploadFileStoreSuccess.type, payload: fileRes.data });
    message.destroy();
    message.success("File uploading success!!!");
    action.payload.onSuccess && action.payload.onSuccess(fileRes);
  } catch (e) {
    action.payload.onFail && action.payload.onFail(e);
    yield put({ type: uploadFileStoreFail.type });
    message.destroy();
    message.error("File uploading fail!!!");
  }
}


function* fileSaga() {
  yield all([takeLatest(uploadFileStore.type, sendFile)])
}

export default fileSaga