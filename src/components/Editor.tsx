"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Text } from "@tiptap/extension-text";
import EditorMenuBar from "./EditorMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";

type Props = { note: NoteType };

const Editor = ({ note }: Props) => {
  const defaultNoteTitle = `<h1>${note.name}</h1>`;
  const [editorState, setEditorState] = useState(
    note.editorState || defaultNoteTitle
  );
  const debouncedEditorState = useDebounce(editorState, 500);
  // For AI completion use effect
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const lastCompletion = useRef("");

  // Save note
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });

      return response.data;
    },
  });

  // Adding AI shortcut
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split("").slice(-30).join("");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  // Inserting into editor AI suggestion.
  useEffect(() => {
    if (!editor || !completion) return;
    console.log("lastCompletion initial value: ", lastCompletion.current);
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;

    // get individual word so that we can insert into the editor
    editor?.commands.insertContent(diff);
  }, [completion, editor]);

  // For text completion
  useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => console.log("saved. data is: ", data),
      onError: (error) => console.error(error),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <EditorMenuBar editor={editor} />}
        <Button className="ml-auto" disabled variant={"outline"}>
          {saveNote.isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="mt-4">
        <span className="text-sm">Tip: Press</span>{" "}
        <kbd className="p-2 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        to enable AI
      </div>
    </>
  );
};

export default Editor;
