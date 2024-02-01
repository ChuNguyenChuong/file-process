import { createBrowserRouter } from "react-router-dom";
import AppBlock from "./pages/App";
import UploadFilesBlock from "./pages/UploadFiles";
import SortFilesBlock from "./pages/SortFiles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppBlock />,
  },
  {
    path: "/upload-file",
    element: <UploadFilesBlock />,
  },
  {
    path: "/sort-files",
    element: <SortFilesBlock />,
  },
]);

export default router