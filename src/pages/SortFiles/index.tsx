
import { Button, Form, Input } from "antd";
import { block } from "million/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { createFileProcess } from "../../store/files/filesSlice";
import { IBodyCreateFileProcess, IValue } from "../../types/common";
import DndComponent from "../../components/DndComponent";
import { WrapperSortFile } from "./styled";
import { BoxBgTranper } from "../../components/styled";

const SortFilesBlock = block(() => {
  const dispatch = useDispatch()
  const { list, session } = useSelector((state: RootState) => state.files);
  
  const [value, setValue] = useState<IValue>({
    left: [
      {
        id: "docFiles",
        name: "Anschreiben muss Ueberm und BSW enthalten und auf .doc(x) enden",
        list: []
      },
      {
        id: "xlsxFiles",
        name: "Excel-Datei (muss .xlsx heißen)",
        list: []
      },
      {
        id: "bmsFiles",
        name: "Bescheidserwiderung (muss *-BSW-• enthalten)",
        list: []
      },
      {
        id: "ansKorrFiles",
        name: "Neue Patentansprüche Korrekturexemplar (muss -neue-ANS- und -korr enthalten)",
        list: []
      },
      {
        id: "ansReinFiles",
        name: "Neue Patentansprüche Reinschrift (muss -neue-ANS- und -rein enthalten )",
        list: []
      },
      {
        id: "besKorrFiles",
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -korr enthalten)",
        list: []
      },
      {
        id: "besReinFiles",
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -rein enthalten)",
        list: []
      },
      {
        id: "optionale",
        name: "Optionale Zeichnungen",
        list: []
      },
      {
        id: "rechnungPdf",
        name: "Rechnung (muss *Rechnung* heißen und auf .pdf enden)",
        list: []
      },
    ],
    right: [
      {
        id: "all",
        name : "All Files",
        list: list
      }
    ]
  });

  const getContainer = () => {
    return list.length === 0 ? <Navigate to="/upload-file" replace={true} /> : <DndComponent value={value} setValue={setValue}></DndComponent>
  }

  const handleOnClickSubmit = (values: { company_ref: string, client_ref: string }) => {
    const listFile = value.left
    const data: IBodyCreateFileProcess = {
      session: session,
      company_ref: values.company_ref,
      client_ref: values.client_ref,
      file: listFile
    }
    dispatch(createFileProcess({
      data: data
    }))
  }

  return (
    <WrapperSortFile>
      <BoxBgTranper>
        <Form
          name="infor"
          layout="inline"
          initialValues={{ company_ref: "", client_ref: "" }}
          onFinish={handleOnClickSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="company_ref"
            rules={[{ required: true, message: 'Please input company ref!' }]}
          >
            <Input placeholder="Company ref" />
          </Form.Item>

          <Form.Item
            name="client_ref"
            rules={[{ required: true, message: 'Please input client ref!' }]}
          >
            <Input placeholder="Client ref" />
          </Form.Item>


          <Button htmlType="submit">Submit</Button>
        </Form>
      </BoxBgTranper>
      {
        getContainer()
      }
    </WrapperSortFile>
  );
})

export default SortFilesBlock