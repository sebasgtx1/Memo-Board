import { useContext, useState } from "react";
import {
  getNotes,
  deleteNote,
  createNote,
  putNote,
  getNote,
} from "../api/notes.api";
import { getCategories } from "../api/categories.api";
import { NoteContext } from "./NoteContext";

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteContextProvider");
  }
  return context;
};

export const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const loadNotes = async () => {
    try {
      const user_id = window.localStorage.getItem("user_id");

      const response = await getNotes(user_id);
      setNotes(response);
    } catch (error) {
      console.error(error);
    }
  };
  const loadCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const DeleteNote = async (id) => {
    try {
      const response = await deleteNote(id);
      setNotes(notes.filter((note) => note.id != id));
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const CreateNote = async (values) => {
    try {
      const response = await createNote(values);
      loadCategories();
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const ArchiveNote = async (id, archived) => {
    try {
      archived = !archived;
      const response = await putNote(id, { archived: archived });
      //console.log(response);
      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateNote = async (id, values) => {
    try {
      const response = await putNote(id, values);
      //console.log(response);
      loadNotes();
    } catch (error) {
      console.error(error);
    }
  };
  const GetNote = async (id) => {
    try {
      const response = await getNote(id);
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        categories,
        loadCategories,
        loadNotes,
        DeleteNote,
        CreateNote,
        ArchiveNote,
        UpdateNote,
        GetNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
