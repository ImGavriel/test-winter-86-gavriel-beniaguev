import mongoose from "mongoose";

export const connectDB = async () => { // חיבור לדאטה בייס :))))

  if (mongoose.connections[0].readyState) return;
  try {
    
    const MONGO_URI = "mongodb://127.0.0.1:27017/IzharTest"; // API TO DATE MONGODB (';')
    await mongoose.connect(MONGO_URI);
    
    console.log("Connected to Local MongoDB (Compass)");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};