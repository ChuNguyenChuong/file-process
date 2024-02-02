import { RcFile } from "antd/es/upload";
import axios from "axios";
import { IBodyCreateFileProcess } from "../../types/common";

export const sendFilesApi = async (files: RcFile[]) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const element = files[i];
    formData.append("file" + i, element)
  }
  
  const res = await axios.post("https://gvb-workflow-production.up.railway.app/files/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res
}

export const createFileProcessApi = async (body: IBodyCreateFileProcess) => {
  const res = await axios.post("https://gvb-workflow-production.up.railway.app/process/", body, {
    responseType: "blob"
})
  return res
}