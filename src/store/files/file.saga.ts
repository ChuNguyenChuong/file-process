import { PayloadAction } from "@reduxjs/toolkit"
import { message } from 'antd'
import { RcFile } from "antd/es/upload"
import fileDownload from "js-file-download"
import { SagaIterator } from "redux-saga"
import { all, call, put, takeLatest, } from "redux-saga/effects"
import { IPayload } from "../../types"
import { IBodyCreateFileProcess } from "../../types/common"
import { createFileProcessApi, sendFilesApi } from "./api"
import { createFileProcess, createFileProcessFinally, uploadFileStore, uploadFileStoreFail, uploadFileStoreSuccess } from "./filesSlice"
import { IFileExtention, fileExtention } from "../../enums/common"
import dayjs from "dayjs"

const destroyMessageAndShowMessage = (messageDisplay: string, isSuccess: boolean = true) => {
  message.destroy();
  isSuccess ? message.success(messageDisplay) : message.error(messageDisplay)
}

const getFileExtension = (value:Blob) => {
  const type: keyof IFileExtention = value.type as keyof IFileExtention;
  return fileExtention[type]
}

function* sendFile(action: PayloadAction<IPayload<RcFile[]>>): SagaIterator {
  try {
    message.loading("File uploading ...");
    const fileRes = yield call(sendFilesApi, action.payload.data);
    yield put({
      type: uploadFileStoreSuccess.type, payload: {
        data: fileRes.data
      }
    });
    destroyMessageAndShowMessage("File uploading success!!!")
    action.payload.onSuccess && action.payload.onSuccess(fileRes);
  } catch (e) {
    action.payload.onFail && action.payload.onFail(e);
    yield put({ type: uploadFileStoreFail.type });
    destroyMessageAndShowMessage("File uploading fail!!!", false)
  }
}

function* createFileProcessSaga(action: PayloadAction<IPayload<IBodyCreateFileProcess>>): SagaIterator {
  try {
    message.loading("File processing ...", 100000);
    const fileRes = yield call(createFileProcessApi, action.payload.data);
    yield put({ type: createFileProcessFinally.type });
    const headerFileName = fileRes.headers['content-type']?.split('filename=')[1]?.split(';')[0];
    fileDownload(fileRes.data, headerFileName || `result-${dayjs().format("YYYY-MM-DD_hh-mm")}${getFileExtension(fileRes.data)}` )
    destroyMessageAndShowMessage("File processing success!!!")
    action.payload.onSuccess && action.payload.onSuccess(fileRes);
  } catch (e) {
    action.payload.onFail && action.payload.onFail(e);
    yield put({ type: createFileProcessFinally.type });
    destroyMessageAndShowMessage("File processing fail!!!", false)
  }
}

function* fileSaga() {
  yield all([
    takeLatest(uploadFileStore.type, sendFile), 
    takeLatest(createFileProcess.type, createFileProcessSaga),
  ])
}

export default fileSaga;
