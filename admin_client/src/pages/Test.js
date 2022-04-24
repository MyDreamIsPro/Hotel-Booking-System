import { Box, Typography } from "@mui/material";
import Page from "../components/Page";
import { useDropzone } from "react-dropzone";

//-----------------------------------------
const Test = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg,image/jpg,image/png",
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <Page title="TEST">
      <Box>
        <div
          style={{ height: 300, width: 500, border: "5px dotted gray" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </Box>
    </Page>
  );
};

export default Test;
