import React from "react";
import PurchaseTokens from "./components/PurchaseTokens";
import CreatePost from "./components/CreatePost";
// Import other components as needed

const App: React.FC = () => {
  return (
    <div>
      <h1>Decentralized Blog</h1>
      <PurchaseTokens />
      <CreatePost />
      {/* Add other components like CommentOnPost, DonateToPost, etc. */}
    </div>
  );
};

export default App;
