import Category from "../models/category.js";
export const getCategories = async (req, res) => {
  try {
    const Categories = await Category.findAll({
      where: {
        status: 0,
      },
    });
    res.json(Categories);
    if (!Categories) {
      return res.status(404).json({
        message: "Categories not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postCategory = async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.json({
      category_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 0,
      data: "Contact the administrator",
    });
  }
};

export const putCategory = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const category = await Category.findByPk(id);
  await category.update(body);
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Category.update(
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
