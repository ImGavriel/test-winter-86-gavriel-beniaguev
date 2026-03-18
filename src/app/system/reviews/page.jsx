"use client";
import { useState, useEffect } from "react";
import ReviewsList from "@/components/ReviewsList";

export default function ReviewsPage() {
  // ניהול רשימת הביקורות שמגיעה מהמסד
  const [reviews, setReviews] = useState([]);
  // ניהול הנתונים בתיבות הקלט (שם, עיר ותוכן)
  const [formData, setFormData] = useState({ name: "", city: "", content: "" });

  // פונקציה לשליפת כל הביקורות מה-API (פעולת READ)
  const fetchReviews = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data.reviews || []); // עדכון הרשימה במסך
  };

  // הרצת השליפה ברגע שהדף נטען לראשונה
  useEffect(() => { fetchReviews(); }, []);

  //  להוספת ביקורת חדשה (פעולת CREATE)
  const addReview = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      // ניקוי תיבות הקלט לאחר הצלחה - דרישה חובה במשימה
      setFormData({ name: "", city: "", content: "" }); 
      fetchReviews(); 
    }
  };

  //  למחיקת ביקורת לפי מזהה (פעולת DELETE)
  const deleteReview = async (id) => {
    await fetch("/api/reviews", { 
      method: "DELETE", 
      body: JSON.stringify({ id }) 
    });
    fetchReviews(); 
  };

  //  לעדכון לייקים/דיסלייקים (פעולת UPDATE)
  const updateLikes = async (id, action) => {
    await fetch("/api/reviews", { 
      method: "PATCH", 
      body: JSON.stringify({ id, action }) 
    });
    fetchReviews(); 
  };

  // לוגיקה למציאת העסק הטוב והגרוע ביותר לפי כמות לייקים
  const getStats = () => {
    if (reviews.length === 0) return null;
    // מיון הרשימה מהגבוה לנמוך
    const sorted = [...reviews].sort((a, b) => b.likes - a.likes);
    return { 
      best: sorted[0], // הראשון ברשימה הממוינת
      worst: sorted[sorted.length - 1] // האחרון ברשימה הממוינת
    };
  };

  const stats = getStats();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ borderBottom: "2px solid #333", paddingBottom: "10px" }}>All Business Reviews</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        <input style={{ padding: "8px" }} placeholder="Business Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <input style={{ padding: "8px" }} placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
        <textarea style={{ padding: "8px", minHeight: "60px" }} placeholder="Review Content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} />
        <button onClick={addReview} style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Add Review</button>
      </div>

      {/* קריאה לרכיב הרשימה הנפרד (דרישת מודולריות) */}
      <ReviewsList reviews={reviews} onDelete={deleteReview} onUpdateLikes={updateLikes} />

      {/* הצגת העסק המצטיין והגרוע ביותר בתחתית הדף */}
      {stats && (
        <div style={{ marginTop: "40px", padding: "15px", borderTop: "2px dashed #ccc", color: "#444" }}>
          <p>
            The best business is <strong>{stats.best.name}</strong> in the city of <strong>{stats.best.city}</strong> with <strong>{stats.best.likes > 0 ? "+" : ""}{stats.best.likes}</strong> likes, 
            and the worst business is <strong>{stats.worst.name}</strong> in <strong>{stats.worst.city}</strong> with <strong>{stats.worst.likes}</strong> likes.
          </p>
        </div>
      )}
    </div>
  );
}