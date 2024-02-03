import { ILogoFile, logoFile } from "../enums/file"

export const getLogoFile = (nameFile:string) => {
  const nameSplitDot = nameFile.split(".")
  const fileType: keyof ILogoFile = nameSplitDot[nameSplitDot.length - 1] as keyof ILogoFile

  return logoFile[fileType]
}