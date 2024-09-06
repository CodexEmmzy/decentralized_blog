import React, { useState } from "react";
import contract from "../utils/contract";

const CreatePost: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleCreatePost = async () => {
    try {
      const userAddress = await contract.signer.getAddress();
      const tx = await contract.createPost(userAddress, category, content);
      if (tx) {
        alert("Post created successfully!");
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      ></textarea>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;
