import bcrypt from "bcrypt";
import Instructor from "../models/instructorModel.js";
import { adminToken } from "../utils/generateToken.js";
import Course from "../models/courseModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
};

export const createCourse = async (req, res) => {
  try {
    console.log("hitted");
    if (!req.file) {
      return res.send("file is not visible");
    }
    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }

      const imageUrl = result.url;
      const body = req.body;
      console.log(body, "body");

      const { title, description, price, instructorEmail } = body;

      const findInstructor = await Instructor.findOne({
        email: instructorEmail,
      });

      if (!findInstructor) {
        return res.send("please add instructor first");
      }

      const createCourse = new Course({
        title,
        description,
        price,
        instructor: findInstructor._id,
        image: imageUrl,
      });

      const newCourseCreated = await createCourse.save();
      if (!newCourseCreated) {
        return res.send("course is not created");
      }
      return res.send(newCourseCreated);
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to create course");
  }
};

export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      {
        new: true,
      }
    );

    if (!updatedCourse) {
      return res.send("Course is not updated");
    }
    console.log(updatedCourse);
    return res.send(updatedCourse);
  } catch (error) {
    console.log("something went wrong", error);
    res.send("failed to update course");
  }
};

export const deleteCourse = async (req, res) => {
  const id = req.params.id;
  const deleteId = await Course.deleteOne({ _id: id });
  if (!deleteId) {
    return res.send("not deleted");
  }
  res.send("deleted course");
};
