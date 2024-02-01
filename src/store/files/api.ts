import { RcFile } from "antd/es/upload";
import axios from "axios";

export const sendFiles = async (files: RcFile[]) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const element = files[i];
    formData.append("file" + i, element)
  }

  const res = await axios.post("https://gvb-workflow-production.up.railway.app/files/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })

  return res
}