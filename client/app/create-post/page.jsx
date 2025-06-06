"use client";
import React, { useState } from "react";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: "POST",
        headers: {
          // Do NOT set Content-Type manually when using FormData
          Authorization: `Bearer ${localStorage.getItem("token")}`, // optional if auth needed
        },
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create post");
      }

      setResponseMessage("✅ Post created successfully!");
      setFormData({ title: "", description: "", image: null });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      setResponseMessage("❌ " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Create a New Post</h2>

      {responseMessage && (
        <div className="alert alert-info" role="alert">
          {responseMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-bold">
            Upload Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {previewImage && (
          <div className="mb-3">
            <p className="fw-semibold">Image Preview:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="img-thumbnail"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
