import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({ // דוגמא למונגו איך אמור להראות 
  name: String,
  city: String,
  content: String,
  likes: { type: Number, default: 0 }
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;