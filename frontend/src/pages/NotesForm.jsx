import { Form, Formik } from "formik";
import { useNotes } from "../context/NoteProvider.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NotesForm() {
  const { categories, CreateNote, GetNote, UpdateNote } = useNotes();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  useEffect(() => {
    const loadNote = async () => {
      if (params.id) {
        const note = await GetNote(params.id);
        setNote({
          title: note.title,
          description: note.description,
          user_id: note.user_id,
        });
      }
    };
    loadNote();
  }, []);
  return (
    <>
      <div>
        <Formik
          initialValues={note}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            const user_id = window.localStorage.getItem("user_id");
            if (params.id && user_id == note.user_id) {
              UpdateNote(params.id, values);
              navigate("/notes");
            } else {
              values["user_id"] = user_id;
              CreateNote(values);
              actions.resetForm();
            }
          }}
        >
          {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className=" bg-zinc-700 max-w-sm rounded-xl p-4 mx-auto mt-10"
            >
              <h1 className="text-5xl text-white font-bold text-center pb-2">
                {" "}
                {params.id ? "Edit Note" : "Create Note"}{" "}
              </h1>

              <input
                className="px-2 py-1 rounded-md w-full mb-3"
                type="text"
                name="title"
                placeholder="Write a title"
                onChange={handleChange}
                value={values.title}
              />

              <textarea
                name="description"
                rows="3"
                className="px-2 py-1 rounded-md w-full mb-3"
                placeholder="Write a description"
                onChange={handleChange}
                value={values.description}
              ></textarea>

              <select
                name="category_id"
                onChange={handleChange}
                value={values.category_id}
                className="block px-2 py-1 rounded-md w-full text-black mb-3"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>

              <select
                className="block px-2 py-1 rounded-md w-full text-black mb-3"
                name="archived"
                onChange={handleChange}
                value={values.archived}
              >
                <option value="">Archived?</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md w-full"
              >
                {isSubmitting ? "Saving..." : "Save"}{" "}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default NotesForm;
