import './ReviewForm.css';
import React, { useState } from 'react';

function ReviewForm({ diningHallId, addReview }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { rating, text };

    // Submit review to server
    fetch(`/api/dining-hall/${diningHallId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then(response => response.json())
      .then(data => {
        // Update reviews list
        addReview(data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        Review:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
