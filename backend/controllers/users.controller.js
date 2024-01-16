import User from "../models/user.js";
//import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "status"],
      where: {
        status: 0,
      },
    });
    res.json(users);
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "email", "status"],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postUser = async (req, res) => {
  try {
    const { email, password, status } = req.body;

    const existEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existEmail) {
      return res.status(400).json({
        success: 0,
        data: "This account already exists",
      });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      email,
      password, //:hashedPassword,
      status,
    });

    res.json({
      user_id: result.id,
      email: email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 0,
      data: "Contact the administrator",
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;

    const result = await User.findOne({
      where: {
        email: body.email,
        status: 0,
      },
    });

    if (!result) {
      return res.status(404).json({
        success: 0,
        data: "Invalid email",
      });
    }

    //const passwordMatch = await bcrypt.compare(body.password, result.password);

    if (body.password == result.password) {
      return res.json({
        success: 1,
        message: "Login successfully",
        user_id: result.id,
      });
    } else {
      return res.status(404).json({
        success: 0,
        data: "Invalid password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const putUser = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (body.email) {
      const existEmail = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (existEmail) {
        return res.status(400).json({
          success: 0,
          data: "This email alredy exists",
        });
      }
    }
    await user.update(body);
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await User.update(
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
