/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IFilesDetail, IResponseFileUpload } from '../../types/common';
import { IPayload } from './../../types';

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
    //   name: `excel.xlsx`,
    // },
    // {
    //   id: "2",
    //   name: `neue-ANS-Hilfs-korr.docx`,
    // },
    // {
    //   id: "3",
    //   name: `neue-ANS-Hilfs-rein.docx`,
    // },
    // {
    //   id: "4",
    //   name: `neue-BES-Haupt-korr.docx`,
    // },
    // {
    //   id: "5",
    //   name: `neue-BES-Haupt-rein.docx`,
    // },
    // {
    //   id: "6",
    //   name: `neue-BES-Hilfs-korr.docx`,
    // },
    // {
    //   id: "7",
    //   name: `neue-BES-Hilfs-rein.docx`,
    // },
    // {
    //   id: "8",
    //   name: `Ohter-BSW.docx`,
    // },
    // {
    //   id: "9",
    //   name: `Rechnung.pdf`,
    // },
    // {
    //   id: "10",
    //   name: `Ueberm-BSW.docx`,
    // },
    // {
    //   id: "11",
    //   name: `Ohter-BSW-.docx`,
    // },
    // {
    //   id: "12",
    //   name: `-neue-ANS--bc--korr.docx`,
    // },
    // {
    //   id: "12",
    //   name: `-neue-ANS--bc--krr.docx`,
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