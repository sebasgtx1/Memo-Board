import Note from "../models/note.js";
export const getNotes = async (req, res) => {
  try {
    console.log(req.params);
    const notes = await Note.findAll({
      where: {
        user_id: req.params.id,
        status: 0,
      },
    });
    res.json(notes);
    if (!notes) {
      return res.status(404).json({
        message: "Notes not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postNote = async (req, res) => {
  console.log(req.body);
  try {
    const result = await Note.create(req.body);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 0,
      data: "Contact the administrator",
    });
  }
};

export const putNote = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const note = await Note.findByPk(id);
  await note.update(body);
  return res.sendStatus(200);
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Note.update(
      {
        status: 1,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
