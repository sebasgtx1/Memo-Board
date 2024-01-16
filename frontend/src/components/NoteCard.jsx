import { useEffect, useState } from "react";
import { getCategory } from "../api/categories.api";
import { useNotes } from "../context/NoteProvider";
import { useNavigate } from "react-router-dom";
function NoteCard({ note }) {
  const { DeleteNote, ArchiveNote } = useNotes();
  const navigate = useNavigate();
  const [category, setCategory] = useState();

  useEffect(() => {
    const loadCategory = async () => {
      const fetchedCategory = await getCategory(note.category_id);
      setCategory(fetchedCategory);
    };

    loadCategory();
  }, [note.category_id]);
  return (
    <div className="bg-slate-700 rounded-xl p-4 text-white">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{note.title}</h2>
        <button onClick={() => ArchiveNote(note.id, note.archived)}>
          {note.archived ? "❌" : "✔️"}{" "}
        </button>
      </header>
      <p className="text-xs pb-2">{note.description}</p>
      <p className="text-xs">
        {" "}
        <strong>Category: </strong>
        {category ? category.title : "Not assigned"}
      </p>

      <span className="text-xs">
        {" "}
        <strong>Created at: </strong> {note.createdAt}
      </span>
      <div className="flex gap-x-1   pt-4  font-bold ">
        <button
          className="bg-slate-500 rounded-md px-2 py-1"
          onClick={() => ArchiveNote(note.id, note.archived)}
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>
        <button
          className="bg-lime-700 rounded-md px-2 py-1"
          onClick={() => navigate(`/edit/${note.id}`)}
        >
          {" "}
          Edit{" "}
        </button>
        <button
          className="bg-red-500 rounded-md px-2 py-1"
          onClick={() => DeleteNote(note.id)}
        >
          {" "}
          Delete{" "}
        </button>
      </div>
    </div>
  );
}
export default NoteCard;
