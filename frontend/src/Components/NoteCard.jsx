import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  
  const handleDelete = async (e,id) => {
    if (!window.confirm("Are you sure to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note successfully deleted.");

    } catch (error) {
      toast.error("Failed to delete the note.", error);
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className="
        group
        block
        bg-base-100
        rounded-2xl
        border
        border-transparent
        hover:border-primary
        hover:shadow-lg
        transition
        duration-200
        overflow-hidden
      "
    >
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-base-content group-hover:text-primary transition">
          {note.title}
        </h3>

        <p className="text-base-content/70 text-sm line-clamp-3">
          {note.content}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-base-200">
          <time className="text-xs text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </time>

          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                // your edit handler
              }}
              className="btn btn-ghost btn-xs p-1"
            >
              <PenSquareIcon className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(e,note._id);
              }}
              className="btn btn-ghost btn-xs p-1 text-error"
            >
              <Trash2Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
