const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const taskSchema = new mongoose.Schema(
  {
    userId: ObjectId,
    tasks: [
      {
        checked: Boolean,
        title: {
          type: String,
          trim: true,
          required: true,
        },
        description: {
          type: String,
          trim: true,
          required: true,
          maxlength: 2000,
        },
        deadline: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
