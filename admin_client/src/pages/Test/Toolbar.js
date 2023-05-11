import { useState } from "react";
import {
  Divider,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const TEXT_TYPES = [
  {
    value: "p",
    text: "Pharagraph",
  },
  {
    value: "h1",
    text: "Heading 1",
  },
  {
    value: "h2",
    text: "Heading 2",
  },
  {
    value: "h3",
    text: "Heading 3",
  },
  {
    value: "h4",
    text: "Heading 4",
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const Toolbar = () => {
  const [age, setAge] = useState("p");
  const [formats, setFormats] = useState(() => ["bold", "italic"]);
  const [alignment, setAlignment] = useState("left");
  const [formatList, setFormatList] = useState("numbered");

  const handleFormatList = (event, newFormat) => {
    setFormatList(newFormat);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #bfbfbf",
      }}
    >
      <div style={{ marginRight: 10 }}>
        <Select
          id="demo-simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
          variant="outlined"
        >
          {TEXT_TYPES.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <StyledToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="strike" aria-label="strike">
            <StrikethroughSIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <StyledToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <StyledToggleButtonGroup
          exclusive
          value={formatList}
          onChange={handleFormatList}
          aria-label="text alignment"
        >
          <ToggleButton value="numbered" aria-label="numbered list">
            <FormatListNumberedIcon />
          </ToggleButton>
          <ToggleButton value="bulleted" aria-label="bulleted list">
            <FormatListBulletedIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </div>
    </div>
  );
};

export default Toolbar;
