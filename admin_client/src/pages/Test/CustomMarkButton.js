import { ButtonBase } from "@mui/material";
import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "./CustomElements";

const CustomMarkButton = ({ children, format }) => {
  const editor = useSlate();
  return (
    <ButtonBase
      onMouseDown={() => toggleMark(editor, format)}
      sx={
        isMarkActive(editor, format)
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

export default CustomMarkButton;
