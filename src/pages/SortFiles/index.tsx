
import { block } from "million/react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import DndComponent from "../DndComponent";
import { IValue } from "../DndComponent/types";




const SortFilesBlock = block(() => {
  // const { list } = useSelector((state: RootState) => state.files)
  // if (list.length === 0) {
  //   return <Navigate to="/upload-file" replace={true} />
  // }

  const [value, setValue] = useState<IValue>({
    left: [
      {
        name: "Anschreiben muss Ueberm und BSW enthalten und auf .doc(x) enden",
        list: [
          {
            id: uuidv4(),
            name: "name 1 left"
          },
          {
            id: uuidv4(),
            name: "name 2 left"
          },
          {
            id: uuidv4(),
            name: "name 3 left"
          }
        ]
      },
      {
        name: "Excel-Datei (muss .xlsx heißen)",
        list: [
        ]
      },
      {
        name: "Bescheidserwiderung (muss *-BSW-• enthalten)",
        list: []
      },
      {
        name: "Neue Patentansprüche Korrekturexemplar (muss -neue-ANS- und -korr enthalten)",
        list: [
        ]
      },
      {
        name: "Neue Patentansprüche Reinschrift (muss -neue-ANS- und -rein enthalten )",
        list: [
        ]
      },
      {
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -korr enthalten)",
        list: [
        ]
      },
      {
        name: "Neue Beschreibungsseiten (muss -neue-BES- und -rein enthalten)",
        list: [
        ]
      },
    ],
    right: [
      {
        name: "All files",
        list: [
          {
            id: uuidv4(),
            name: "string 1",
          },
          {
            id: uuidv4(),
            name: "string 2",
          }
        ]
      }
    ]
  });

  return (
    <div style={{ width: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "start", background: "#dedcd4", paddingBottom: "10px" }}>
      <DndComponent value={value} setValue={setValue}></DndComponent>
    </div>
  );
})

export default SortFilesBlock