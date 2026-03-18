import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db"; 
import Review from "../../models/Review"; 

// 1. GET: שליפת כל הנתונים מהמסד
export async function GET() {
  await connectDB();
  const allReviews = await Review.find({});
  return NextResponse.json({ reviews: allReviews });
}

// 2. POST: יצירת ביקורת חדשה
export async function POST(request) {
  await connectDB();
  const data = await request.json();
  
  const newReview = await Review.create({
    name: data.name,
    city: data.city,
    content: data.content,
    likes: 0 
  });

  return NextResponse.json(newReview);
}

// 3. DELETE: מחיקת ביקורת לפי ה-ID שלה
export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json(); 
  await Review.findByIdAndDelete(id); 
  return NextResponse.json({ message: "Review deleted successfully" });
}

// 4. PATCH: עדכון לייקים בדרך פשוטה (שליפה, שינוי ושמירה)
export async function PATCH(request) {
  await connectDB();
  const { id, action } = await request.json(); 

  const reviewToUpdate = await Review.findById(id);

  // בודקים מה המשתמש לחץ בעזרת if ו-else פשוטים
  if (action === "like") {
    // אם זה לייק - נוסיף 1 לערך הקיים
    reviewToUpdate.likes = reviewToUpdate.likes + 1;
  } else {
    reviewToUpdate.likes = reviewToUpdate.likes - 1;
  }

  await reviewToUpdate.save();

  // מחזירים את התוצאה המעודכנת לקליינט
  return NextResponse.json(reviewToUpdate);
}