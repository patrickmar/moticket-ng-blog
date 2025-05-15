const Comments = require("../model/Comments");

const createComments = async (req, res, next) => {
  try {
    const { name, email, reason, country, employment, details } = req.body;
    const newComment = await Comments.create({
      name,
      email,
      reason,
      details,
      country,
      employment,
    });
    res.status(201).json({ success: true, data: newComment });
    console.log(data);
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comment = await Comments.find();
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = { createComments, getAllComments };
