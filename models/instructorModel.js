import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["instructor", "admin"],
    },
    courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;