import { ILogoFile, logoFile } from "../enums/file"

export const getLogoFile = (nameFile:string) => {
  const nameSplitDot = nameFile.split(".")
  const fileType: keyof ILogoFile = nameSplitDot[nameSplitDot.length - 1] as keyof ILogoFile

  return logoFile[fileType]
}

export const makeid = (length = 10) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
