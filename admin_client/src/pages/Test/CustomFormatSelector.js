import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useSlate } from "slate-react";
import { toggleBlock } from "./CustomElements";

const TEXT_TYPES = [
  {
    value: "paragraph",
    text: "Pharagraph",
  },
  {
    value: "heading-1",
    text: "Heading 1",
  },
  {
    value: "heading-2",
    text: "Heading 2",
  },
  {
    value: "heading-3",
    text: "Heading 3",
  },
  {
    value: "heading-4",
    text: "Heading 4",
  },
];

const CustomFormatSelector = () => {
  const editor = useSlate();
  const [format, setFormat] = useState("paragraph");

  const handleFormat = (event) => {
    const value = event.target.value;
    toggleBlock(editor, value);
    setFormat(value);
  };

  return (
    <Select
      id="demo-simple-select"
      value={format}
      displayEmpty
      onChange={handleFormat}
      variant="outlined"
    >
      {TEXT_TYPES.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomFormatSelector;
