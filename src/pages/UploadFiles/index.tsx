import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { block } from "million/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BoxBgTranper } from "../../components/styled";
import { RootState } from "../../store";
import { uploadFileStore } from "../../store/files/filesSlice";
import { DraggerStyled, FileList, IconItem, Item, WrapperItem, WrapperUploadFile } from "./UploadFile.styled";
import { getLogoFile } from "../../helpers";
import { AnyElement } from "../../types";

const UploadFilesBlock = block(() => {
  const { isLoadingUploadFile } = useSelector((state: RootState) => state.files);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList]);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    onRemove: (file) => {
      const cloneFile = [...fileList];
      const newValue = cloneFile.filter((item) => item.uid !== file.uid);
      setFileList(newValue);
    },
    beforeUpload: () => {
      return false;
    },
    showUploadList: false,
    onChange(info) {
      setFileList(old => {
        return [...old, info.file as AnyElement]
      })
    },

  };

  const handleSubmit = () => {
    dispatch(
      uploadFileStore({
        data: fileList,
        onSuccess: () => {
          naviagte("/sort-files");
        },
      })
    );
  };

  const handleRemove = useCallback(
    (uid: string) => () => {
      setFileList((old) => {
        return old.filter((item) => item.uid !== uid);
      });
    },
    []
  );

  return (
    <WrapperUploadFile>
      <BoxBgTranper style={{ display: "flex", gap: "16px" }}>
        <Button disabled={isLoadingUploadFile}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit} disabled={isLoadingUploadFile}>
          Submit
        </Button>
      </BoxBgTranper>
      <DraggerStyled {...props} disabled={isLoadingUploadFile}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </DraggerStyled>
      <FileList>
        {fileList.map((file) => {
          return (
            <WrapperItem>
              <IconItem draggable={false} src={getLogoFile(file.name)} className="p-2" />
              <Item>{file.name}</Item>
              <DeleteOutlined onClick={handleRemove(file.uid)} />
            </WrapperItem>
          );
        })}
      </FileList>
    </WrapperUploadFile>
  );
});

export default UploadFilesBlock;
