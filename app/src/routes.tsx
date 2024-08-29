import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import UserProfile from './pages/UserProfile/UserProfile';
import CreatePost from './pages/CreatePost/CreatePost';
import Layout from './components/Layout/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
