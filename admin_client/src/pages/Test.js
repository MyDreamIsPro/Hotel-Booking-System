import { useState } from "react";
import { Box, Button } from "@mui/material";
import Page from "../components/Page";
import Calendar from "./PeakDay/Calendar";
import ReactQuill from "react-quill";
//-----------------------------------------
//#region EXAMPLE
// https://www.youtube.com/watch?v=w3jE0U548yw&ab_channel=H%E1%BB%99iph%C3%A1tKh%C3%ACnV%C3%ACThi%C3%AAnLongB%C3%A1tB%E1%BB%99
// var toolbarOptions = [
//   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//   ['blockquote', 'code-block'],

//   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//   [{ 'direction': 'rtl' }],                         // text direction

//   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//   [{ 'font': [] }],
//   [{ 'align': [] }],

//   ['clean']                                         // remove formatting button
// ];
//#endregion

const modules = {
  toolbar: [
    [{ font: [] }],
    // [{ header: 1 }, { header: 2 }],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const Test = () => {
  const [text, setText] = useState("");
  return (
    <Page title="TEST">
      <Box
        boxShadow={3}
        style={{ borderRadius: 4, marginTop: 30, padding: 100 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            if (text) console.log(text);
            else alert("empty");
          }}
        >
          Xem
        </Button>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={text}
          placeholder="Nội dung"
          onChange={(val) => setText(val)}
        >
          <div style={{ backgroundColor: "#F4F4F4" }}></div>
        </ReactQuill>
        <Box py={4} dangerouslySetInnerHTML={{ __html: text }}></Box>
      </Box>
    </Page>
  );
};

export default Test;
