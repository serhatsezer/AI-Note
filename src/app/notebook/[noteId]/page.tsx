import React from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { clerk } from "@/lib/clerk-service";
import Editor from "@/components/Editor";
import DeleteButton from "@/components/DeleteButton";

type Props = {
  params: {
    noteId: string;
  };
};

const NoteBookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();

  // If there is no userId return to the dashboard
  if (!userId) {
    return redirect("/dashboard");
  }

  const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  // If there is no notes than no need to be here. Return it to the dashboard
  if (notes.length != 1) {
    return redirect("/dashboard");
  }

  const note = notes[0];

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>

          <div className="ml-3">
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="inline-block mx-1">/</span>
            <span className="text-stone-500 font-semibold">{note.name}</span>
          </div>

          <div className="ml-auto">
            <DeleteButton noteId={noteId} />
          </div>
        </div>

        <div className="mt-4 border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <Editor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NoteBookPage;
