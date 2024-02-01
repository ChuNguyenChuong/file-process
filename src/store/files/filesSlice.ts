import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RcFile } from 'antd/es/upload';
import { IFilesDetail, IResponseFileUpload } from '../../pages/DndComponent/types';
import { IPayload } from './../../types';

export interface CounterState {
  list: IFilesDetail[],
  isLoadingUploadFile: boolean
}

const initialState: CounterState = {
  list: [],
  isLoadingUploadFile: false
}

export const filesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    uploadFileStore: (state, action: PayloadAction<IPayload<RcFile[]>>) => {
      console.log("🚀 ~ uploadFileStore:", action)
      state.isLoadingUploadFile = true
    },
    uploadFileStoreSuccess: (state, action: PayloadAction<IPayload<IResponseFileUpload>>) => {
      state.list = action.payload.data.uploaded_files.map(item => ({
        id: item.file_id,
        name: item.file_name
      }))
      state.isLoadingUploadFile = false
    },
    uploadFileStoreFail: (state) => {
      state.isLoadingUploadFile = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { uploadFileStore, uploadFileStoreFail, uploadFileStoreSuccess } = filesSlice.actions

export default filesSlice.reducer