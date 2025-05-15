const Category = require("../model/Categories");

const createCategory = async (req, res, next) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const cat = await Category.find();
    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
};
module.exports = { createCategory, getAllCategories };
