import { Divider } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import CustomMarkButton from "./CustomMarkButton";
import CustomBlockButton from "./CustomBlockButton";
import CustomFormatSelector from "./CustomFormatSelector";

const Toolbar = () => {
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
        <CustomFormatSelector />
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <CustomMarkButton format="bold">
          <FormatBoldIcon />
        </CustomMarkButton>
        <CustomMarkButton format="underline">
          <FormatUnderlinedIcon />
        </CustomMarkButton>
        <CustomMarkButton format="italic">
          <FormatItalicIcon />
        </CustomMarkButton>
        <CustomMarkButton format="code">
          <CodeIcon />
        </CustomMarkButton>
        <CustomBlockButton format="block-quote">
          <FormatQuoteIcon />
        </CustomBlockButton>
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <CustomBlockButton format="left">
          <FormatAlignLeftIcon />
        </CustomBlockButton>
        <CustomBlockButton format="center">
          <FormatAlignCenterIcon />
        </CustomBlockButton>
        <CustomBlockButton format="right">
          <FormatAlignRightIcon />
        </CustomBlockButton>
        <CustomBlockButton format="justify">
          <FormatAlignJustifyIcon />
        </CustomBlockButton>
      </div>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ mx: 0.5, my: 1, borderRightWidth: 2 }}
      />
      <div style={{ margin: "0 10px" }}>
        <CustomBlockButton format="numbered-list">
          <FormatListNumberedIcon />
        </CustomBlockButton>
        <CustomBlockButton format="bulleted-list">
          <FormatListBulletedIcon />
        </CustomBlockButton>
      </div>
    </div>
  );
};

export default Toolbar;
