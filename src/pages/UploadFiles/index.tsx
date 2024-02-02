import { InboxOutlined } from '@ant-design/icons';
import { Button, UploadProps } from "antd";
import { RcFile } from 'antd/es/upload';
import Dragger from "antd/es/upload/Dragger";
import { block } from "million/react";
import { useEffect, useState } from "react";
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
  align-items: center;
  gap: 30px;
  padding-top: 100px;
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/1fbf4b536c3dd6efa1dc317fb2e6c2ca/photo-1696595883516-76c97aa3a164.jpg");
  color: white
`

const DraggerStyled = styled(Dragger)`
  height: 185px;
  span,p{
    color:white !important
  }
`

const UploadFilesBlock = block(() => {
  const { isLoadingUploadFile } = useSelector((state: RootState) => state.files)
  const dispatch = useDispatch()
  const naviagte = useNavigate()
  const [fileList, setFileList] = useState<RcFile[]>([])

  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onRemove: (file) => {
      const cloneFile = [...fileList]
      const newValue = cloneFile.filter(item => item.uid !== file.uid)
      setFileList(newValue);
    },
    beforeUpload: (_, fileList) => {
      setFileList([...fileList]);
      return false;
    }
  };

  const handleSubmit = () => {
    dispatch(uploadFileStore({
      data: fileList,
      onSuccess: () => {
        naviagte("/sort-files")
      }
    }))
  }

  return <Wrapper>
    <div style={{ display: "flex", gap: "16px" }}>
      <Button disabled={isLoadingUploadFile}>Cancel</Button>
      <Button type="primary" onClick={handleSubmit} disabled={isLoadingUploadFile}>Submit</Button>
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