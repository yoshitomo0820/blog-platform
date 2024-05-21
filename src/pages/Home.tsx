import React, { useContext } from 'react';
import PostList from '../components/PostList';
import { Post, PostsContext } from '../contexts/PostsContext';


const Home: React.FC = () => {
  const context = useContext(PostsContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { posts } = context;

  return (
    <div className = "container">
      <h1>Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
