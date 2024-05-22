import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Post, PostsContext } from '../contexts/PostsContext';
import SampleImage from '../Images/noimage.jpg'; 

import '../styles/Homestyle.css'; // スタイルシートをインポート

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const postsContext = useContext(PostsContext);

  // const onDelete = (id: number) => {
  //   if (window.confirm('この投稿を削除しますか？')) {
  //     if (postsContext) {
  //       postsContext.deletePost(id);
  //     }
  //   }
  // };
  

  return (
    <section className='wrapper'>
    <ul className='postlist'>
      
      {posts.map(post => (
        <Link to={`/edit/${post.id}`}>
          <li key={post.id} className='postlistblock' >
            <div className='image'>
              {/* {post.image && <img src={post.image || SampleImage} alt="Post Image" />} */}
              <img src={post.image || SampleImage} alt="Post Image" />
            </div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        </Link>
      ))}
    </ul>
    </section>
  );
};

export default PostList;
