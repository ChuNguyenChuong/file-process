import textIcon from "./../assets/images/file-txt.svg"
import docIcon from "./../assets/images/file-doc.svg"
import pdfIcon from "./../assets/images/file-pdf.svg"
import svgIcon from "./../assets/images/file-svg.svg"
import xlsxIcon from "./../assets/images/file-xlsx.svg"
import jpgIcon from "./../assets/images/file-jpg.svg"
import jpegIcon from "./../assets/images/file-jpeg.svg"
import pngIcon from "./../assets/images/file-png.svg"
import gifIcon from "./../assets/images/file-gif.svg"
import bmpIcon from "./../assets/images/file-bmp.svg"
import mp3Icon from "./../assets/images/file-mp3.svg"
import wavIcon from "./../assets/images/file-wav.svg"
import mpegIcon from "./../assets/images/file-mpeg.svg"
import mp4Icon from "./../assets/images/file-mp4.svg"
import aviIcon from "./../assets/images/file-avi.svg"
import mkvIcon from "./../assets/images/file-mkv.svg"
import movIcon from "./../assets/images/file-mov.svg"
import exeIcon from "./../assets/images/file-exe.svg"
import csvIcon from "./../assets/images/file-csv.svg"
import zipIcon from "./../assets/images/file-zip.svg"


export interface ILogoFile {
  txt:string;
  doc: string;
  docx: string;
  pdf:string;
  jpg: string;
  jpeg: string;
  png:string;
  gif: string;
  bmp: string;
  svg: string;
  mp3: string;
  wav:string;
  mpeg: string;
  mp4:string;
  avi: string;
  mkv: string;
  mov: string;
  exe:string;
  xlsx: string;
  csv: string;
  zip:string;
}

export const logoFile: ILogoFile = {
  zip: zipIcon,
  csv: csvIcon,
  xlsx: xlsxIcon,
  exe: exeIcon,
  mov: movIcon,
  mkv: mkvIcon,
  avi: aviIcon,
  mp4: mp4Icon,
  mpeg: mpegIcon,
  wav: wavIcon,
  mp3: mp3Icon,
  svg: svgIcon,
  bmp: bmpIcon,
  gif: gifIcon,
  png: pngIcon,
  jpeg: jpegIcon,
  jpg: jpgIcon,
  pdf: pdfIcon,
  docx: docIcon,
  doc: docIcon,
  txt: textIcon,
}