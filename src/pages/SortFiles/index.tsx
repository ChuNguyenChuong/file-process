
import { block } from "million/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store";
import DndComponent from "../DndComponent";
import { IValue } from "../DndComponent/types";
import docxIcon from "./../../assets/images/file-doc-svgrepo-com.svg";
import xlsxIcon from "./../../assets/images/xlsx-file-format-extension-svgrepo-com.svg";




const SortFilesBlock = block(() => {
  const { list } = useSelector((state: RootState) => state.files)

  const [value, setValue] = useState<IValue>({
    left: [
      {
        icon: docxIcon,
        name: "Anschreiben muss Ueberm und BSW enthalten und auf .doc(x) enden",
        list: []
      },
      {
        icon: xlsxIcon,
        name: "Excel-Datei (muss .xlsx heißen)",
        list: []
      },
      {
        name: "Bescheidserwiderung (muss *-BSW-• enthalten)",
        list: []
      },
      {
        name: "Neue Patentansprüche Korrekturexemplar (muss -neue-ANS- und -korr enthalten)",
        list: []
      },
      {
        name: "Neue Patentansprüche Reinschrift (muss -neue-ANS- und -rein enthalten )",
        list: []
      },
      {
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -korr enthalten)",
        list: []
      },
      {
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -rein enthalten)",
        list: []
      },
    ],
    right: [
      {
        name: "All files",
        list: list
      }
    ]
  });

  const getContainer = () => {
    return list.length === 0 ? <Navigate to="/upload-file" replace={true} /> : <DndComponent value={value} setValue={setValue}></DndComponent>
  }

  return (
    <div style={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "start", background: "#dedcd4", paddingBottom: "10px" }}>
      {
        getContainer()
      }
    </div>
  );
})

export default SortFilesBlock