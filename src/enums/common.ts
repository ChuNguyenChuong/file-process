export enum EnumPosition {
  RIGHT = "right",
  LEFT = "left"
}

export interface IFileExtention  {
  "application/zip": string
} 

export const fileExtention: IFileExtention = {
  "application/zip" : ".zip"
}