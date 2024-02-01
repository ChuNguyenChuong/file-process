import { InboxOutlined } from '@ant-design/icons';
import { Button, UploadProps } from "antd";
import { RcFile } from 'antd/es/upload';
import Dragger from "antd/es/upload/Dragger";
import { block } from "million/react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { RootState } from '../../store';
import { uploadFileStore } from '../../store/files/filesSlice';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  gap: 30px;
`

const DraggerStyled = styled(Dragger)`
  height: 185px;
`


const UploadFilesBlock = block(() => {
  const { isLoadingUploadFile } = useSelector((state: RootState) => state.files)
  const dispatch = useDispatch()
  const naviagte = useNavigate()
  const [fileList, setFileList] = useState<RcFile[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onRemove: (file) => {
      const cloneFile = [...fileList]
      const newValue = cloneFile.filter(item => item.uid !== file.uid)
      setFileList(newValue);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    }
  };

  const handleSubmit = () => {
    dispatch(uploadFileStore({
      data: fileList,
      onSuccess: () => {
        naviagte("/sort-files")
      },
      onFail: (e) => {
        console.log(e);

      }
    }))
  }

  return <Wrapper>
    <div style={{ display: "flex", gap: "16px" }}>
      <Button disabled={isLoadingUploadFile}>Cancel</Button>
      <Button type="primary" ghost onClick={handleSubmit} disabled={isLoadingUploadFile}>Submit</Button>
    </div>
    <DraggerStyled {...props} disabled={isLoadingUploadFile}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
        banned files.
      </p>
    </DraggerStyled>
  </Wrapper>
});

export default UploadFilesBlock;