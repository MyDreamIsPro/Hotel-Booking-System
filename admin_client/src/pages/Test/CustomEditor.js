import { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import Toolbar from "./Toolbar";
import {
  toggleMark,
  toggleBlock,
  HOTKEYS,
  Element,
  INITIAL_VALUES,
  Leaf,
} from "./CustomElements";

const CustomEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <div style={{ border: "1px solid #bfbfbf", borderRadius: 4 }}>
      <Slate editor={editor} value={INITIAL_VALUES}>
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          // spellCheck
          autoFocus
          style={{ minHeight: "200px", padding: 10 }}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const type = HOTKEYS[hotkey].type;
                const value = HOTKEYS[hotkey].value;
                if (type === "mark") toggleMark(editor, value);
                else toggleBlock(editor, value);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

export default CustomEditor;
