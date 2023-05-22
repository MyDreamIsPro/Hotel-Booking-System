import { useCallback, useMemo, useRef, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Transforms } from "slate";
import { withHistory } from "slate-history";
import Toolbar from "./Toolbar";
import {
  toggleMark,
  toggleBlock,
  HOTKEYS,
  Element,
  INITIAL_VALUES,
  Leaf,
  clearEditor,
} from "./CustomElements";

const CustomEditor = () => {
  const [isAllSelected, setAllSelected] = useState(false);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()));
  const editor = editorRef.current;
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
          // 1
          // 2
          // 3
          onKeyDown={(event) => {
            if (isHotkey("mod+y", event)) {
              // console.log(editor.selection);
              // console.log(editor.children);-
              // Transforms.removeNodes(editor);
              console.log(editor.selection);
              // console.log(editor.children);
            } else if (
              (isHotkey("backspace", event) || isHotkey("mod+x", event)) &&
              isAllSelected
            ) {
              // if (editor) clearEditor(editor);
              console.log(editor.children);
              Transforms.delete(editor);
              Transforms.unwrapNodes(editor, {
                at: {
                  path: [0],
                },
                split: true,
              });
              Transforms.setNodes(editor, { type: "paragraph" });

              console.log(editor.children);
              setAllSelected(false);
              return;
            } else if (isHotkey("mod+a", event)) {
              setAllSelected(true);
            } else {
              setAllSelected(false);
            }
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
