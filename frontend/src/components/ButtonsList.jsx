import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NoteProvider";
import NoteCard from "./NoteCard";

const ButtonsList = ({ notes }) => {
  const { categories, loadCategories } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [totalFilteredNotes, setTotalFilteredNotes] = useState(notes);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    const updatedFilteredNotes = notes.filter((note) => {
      const categoryFilter =
        selectedCategoryId === null || note.category_id === selectedCategoryId;

      const showArchivedFilter = showArchived || !note.archived;

      return categoryFilter && showArchivedFilter;
    });

    setFilteredNotes(updatedFilteredNotes);
    const categoryFilteredNotes = notes.filter((note) => {
      const categoryFilter =
        selectedCategoryId === null || note.category_id === selectedCategoryId;
      return categoryFilter;
    });

    setTotalFilteredNotes(categoryFilteredNotes);
  }, [notes, selectedCategoryId, showArchived]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleShowArchivedChange = () => {
    setShowArchived((prevShowArchived) => !prevShowArchived);
  };

  function renderMain() {
    if (filteredNotes.length === 0)
      return (
        <h1 className="text-5xl text-white font-bold text-center">
          No Notes yet
        </h1>
      );
    return filteredNotes.map((note) => <NoteCard note={note} key={note.id} />);
  }

  const activeNotesCount = totalFilteredNotes.filter(
    (note) => !note.archived
  ).length;
  const archivedNotesCount = totalFilteredNotes.filter(
    (note) => note.archived
  ).length;
  const totalNotesCount = totalFilteredNotes.length;

  return (
    <div>
      <div className="flex gap-x-2 py-4 justify-center">
        <button
          className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md"
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md"
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div>
        <p className="text-sm text-white pb-4">
          <label className="text-left">
            <input
              type="checkbox"
              checked={showArchived}
              onChange={handleShowArchivedChange}
            />
            Show Archived
          </label>
          <div className="text-right">
            <strong>✔️ Active Notes:</strong> {activeNotesCount}{" "}
            <strong>❌ Archived Notes:</strong> {archivedNotesCount}{" "}
            <strong>Total Notes:</strong> {totalNotesCount}
          </div>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">{renderMain()}</div>
    </div>
  );
};

export default ButtonsList;
