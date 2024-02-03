import { EnumPosition } from "../enums/common";

export interface IValue {
  left: IGroup[],
  right: IGroup[],
}

export interface IGroup {
  icon?: string;
  name: string,
  list: IItem[],
  id: string
}

export interface IItem {
  id: string,
  name: string,
}

export interface IItemDrag {
  data: IItem,
  position: EnumPosition,
  groupId: string
}

export interface IResponseFileUpload {
  session: string,
  uploaded_files: [
    {
      file_id: string,
      file_name: string
    }
  ]
}

export interface IFilesDetail {
  id: string,
  name: string,
  
}

export interface IBodyCreateFileProcess {
  session: string,
  company_ref :string;
  client_ref: string;
  file: IGroup[]
}
