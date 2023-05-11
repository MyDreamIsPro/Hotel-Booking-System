import { useState } from "react";
import { Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import Toolbar from "./Toolbar";

const CustomEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div style={{ border: "1px solid #bfbfbf", borderRadius: 4 }}>
      <Toolbar />
      <div style={{ height: 200 }}></div>
      <Slate editor={editor} value={[]}></Slate>
    </div>
  );
};

export default CustomEditor;
