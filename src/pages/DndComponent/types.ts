export interface IGroup {
  icon?: string;
  name: string,
  list: IItem[]
}

export interface IItem {
  id: string,
  name: string
}

export interface IValue {
  left: IGroup[],
  right: IGroup[],
}

export enum EnumPosition {
  RIGHT = "right",
  LEFT = "left"
}

export interface IItemDrag {
  data: IItem,
  position: EnumPosition,
  group: string
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