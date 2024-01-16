import React, { useEffect } from "react";
import { useNotes } from "../context/NoteProvider.jsx";
import ButtonsList from "../components/ButtonsList.jsx";
function NotesPage() {
  const { notes, loadNotes } = useNotes();
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <div>
        <ButtonsList notes={notes}></ButtonsList>
      </div>
    </>
  );
}

export default NotesPage;
