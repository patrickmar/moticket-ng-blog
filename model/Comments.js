const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");

const commentsSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
      unique: false,
    },
    reason: { type: String, required: true, unique: false },
    country: { type: String, required: true },
    employment: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Comments = model("Comments", commentsSchema);
module.exports = Comments;
