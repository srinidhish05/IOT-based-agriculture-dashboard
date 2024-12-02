import React, { useState } from 'react';
import './Feedback.css'; // Optional: You can create a separate CSS file for styles

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackType: '',
        comments: '',
        rating: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to a server)
        console.log('Feedback submitted:', formData);
        // Reset the form after submission if needed
        setFormData({
            name: '',
            email: '',
            feedbackType: '',
            comments: '',
            rating: '',
        });
    };

    return (
        <div className="feedback-container">
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback-type">Feedback Type</label>
                    <select
                        id="feedback-type"
                        name="feedbackType"
                        value={formData.feedbackType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="general">General Feedback</option>
                        <option value="bug">Report a Bug</option>
                        <option value="suggestion">Suggestions</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group rating">
                    <label>Rating:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value}>
                                <input
                                    type="radio"
                                    id={value.toString()}
                                    name="rating"
                                    value={value}
                                    checked={formData.rating === value.toString()}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor={value.toString()}>{value}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;