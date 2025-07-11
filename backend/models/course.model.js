import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true, // fixed typo here
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    public_id:{
      type:String,
      required: true,
    },
    url:{
      type:String,
      required:true
    }
  },
  creatorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // ref: "Admin",
  }
});

export const Course = mongoose.model("Course", courseSchema);
