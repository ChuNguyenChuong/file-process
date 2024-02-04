/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IFilesDetail, IResponseFileUpload } from '../../types/common';
import { IPayload } from './../../types';
import { makeid } from '../../helpers';

export interface CounterState {
  list: IFilesDetail[],
  isLoadingUploadFile: boolean,
  session: string;

  isLoaddingFileProcess: boolean
}

const initialState: CounterState = {
  list: [
    // {
    //   id: "1",
    //   name: `${makeid()}.txt`,
    // },
    // {
    //   id: "2",
    //   name: `${makeid()}.doc`,
    // },
    // {
    //   id: "3",
    //   name: `${makeid()}.docx`,
    // },
    // {
    //   id: "4",
    //   name: `${makeid()}.pdf`,
    // },
    // {
    //   id: "5",
    //   name: `${makeid()}.jpeg`,
    // },
    // {
    //   id: "6",
    //   name: `${makeid()}.png`,
    // },
    // {
    //   id: "7",
    //   name: `${makeid()}.gif`,
    // },
    // {
    //   id: "8",
    //   name: `${makeid()}.bmp`,
    // },
    // {
    //   id: "9",
    //   name: `${makeid()}.svg`,
    // },
    // {
    //   id: "10",
    //   name: `${makeid()}.mp3`,
    // },
    // {
    //   id: "11",
    //   name: `${makeid()}.mp3`,
    // },
    // {
    //   id: "12",
    //   name: `${makeid()}.wav`,
    // },
    // {
    //   id: "13",
    //   name: `${makeid()}.mpeg`,
    // },
    // {
    //   id: "14",
    //   name: `${makeid()}.mp4`,
    // },
    // {
    //   id: "15",
    //   name: `${makeid()}.avi`,
    // },
    // {
    //   id: "16",
    //   name: `${makeid()}.mov`,
    // },
    // {
    //   id: "17",
    //   name: `${makeid()}.exe`,
    // },
    // {
    //   id: "18",
    //   name: `${makeid()}.xlsx`,
    // },
    // {
    //   id: "19",
    //   name: `${makeid()}.csv`,
    // },
    // {
    //   id: "20",
    //   name: `${makeid()}.zip`,
    // },
  ],
  isLoadingUploadFile: false,
  session: "",
  isLoaddingFileProcess: false
}

export const filesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    uploadFileStore: (state, _) => {
      state.isLoadingUploadFile = true
    },
    uploadFileStoreSuccess: (state, action: PayloadAction<IPayload<IResponseFileUpload>>) => {
      state.list = action.payload.data.uploaded_files.map(item => ({
        id: item.file_id,
        name: item.file_name
      }))
      state.session = action.payload.data.session
      state.isLoadingUploadFile = false
    },
    uploadFileStoreFail: (state) => {
      state.isLoadingUploadFile = false
    },
    createFileProcess: (state, _) => {
      state.isLoaddingFileProcess = true
    },
    createFileProcessFinally: (state) => {
      state.isLoaddingFileProcess = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { uploadFileStore, uploadFileStoreFail, uploadFileStoreSuccess, createFileProcess, createFileProcessFinally } = filesSlice.actions

export default filesSlice.reducer