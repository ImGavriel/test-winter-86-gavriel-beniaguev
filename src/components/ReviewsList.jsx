"use client";

export default function ReviewsList({ reviews, onDelete, onUpdateLikes }) {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <p><strong>Business Name:</strong> {review.name}</p>
          <p><strong>City:</strong> {review.city}</p>
          <p><strong>Review:</strong> {review.content}</p>
          <p><strong>Likes:</strong> {review.likes}</p>
          
          <button onClick={() => onUpdateLikes(review._id, "like")}>Like</button>
          <button onClick={() => onUpdateLikes(review._id, "dislike")} style={{ marginLeft: "5px" }}>Dislike</button>
          <button onClick={() => onDelete(review._id)} style={{ marginLeft: "15px", color: "red" }}>Delete</button>
        </div>
      ))}
    </div>
  );
}