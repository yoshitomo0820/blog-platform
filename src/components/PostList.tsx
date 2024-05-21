import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Post, PostsContext } from '../contexts/PostsContext';

import '../styles/Homestyle.css'; // スタイルシートをインポート

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const postsContext = useContext(PostsContext);

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (postsContext) {
        postsContext.deletePost(id);
      }
    }
  };

  return (
    <section id='blog' className='wrapper'>
    <ul className='postlist'>
      {posts.map(post => (
        <li key={post.id} >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Post Image" />} {/* 画像があれば表示 */}
          <div>
            <Link to={`/edit/${post.id}`}>編集</Link> | 
            <button onClick={() => onDelete(post.id)}>削除</button>
          </div>
        </li>
      ))}
    </ul>
    </section>
  );
};

export default PostList;
