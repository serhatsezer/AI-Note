"use client";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  noteId: string;
};

function DeleteButton({ noteId }: Props) {
  const router = useRouter();

  // Delete the note api call
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", { noteId: noteId });
      return response.data;
    },
  });

  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      disabled={deleteNote.isLoading}
      onClick={() => {
        const confirm = window.confirm("Do you want to delete this note?");
        if (!confirm) return;
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push("/dashboard");
          },

          onError: (error) => {
            console.error(error);
          },
        });
      }}
    >
      <Trash />
    </Button>
  );
}

export default DeleteButton;
