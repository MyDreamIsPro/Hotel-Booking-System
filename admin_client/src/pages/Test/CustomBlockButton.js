import { ButtonBase } from "@mui/material";
import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock, TEXT_ALIGN_TYPES } from "./CustomElements";

const CustomBlockButton = ({ children, format }) => {
  const editor = useSlate();
  return (
    <ButtonBase
      onMouseDown={() => toggleBlock(editor, format)}
      sx={
        isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
        )
          ? {
              mx: 0.3,
              padding: 1.5,
              borderRadius: 1,
              color: "#212B36",
              backgroundColor: "#E8E9EB",
              "&:hover": {
                backgroundColor: "#d6d8db",
              },
            }
          : {
              mx: 0.3,
              padding: 1.5,
              borderRadius: 1,
              color: "#637381",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#E8E9EB",
              },
            }
      }
    >
      {children}
    </ButtonBase>
  );
};

export default CustomBlockButton;
