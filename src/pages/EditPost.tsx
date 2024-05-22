import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsContext, Post } from '../contexts/PostsContext';
import '../styles/EditPostStyles.css'; // スタイルシートをインポート



const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postsContext = useContext(PostsContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // 投稿を取得してstateに設定
    if (postsContext) {
      const post = postsContext.posts.find(p => p.id === Number(id));
      if (post) {
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
      }
    }
  }, [id, postsContext]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    if (!post) return;

    // 編集した投稿を更新
    if (postsContext) {
      postsContext.editPost({ ...post, title, content });
    }

    try {
      // 画像をアップロードするなどのAPI呼び出しを行う

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

   
  const onDelete = (id: number) => {
    if (window.confirm('この投稿を削除しますか？')) {
      if (postsContext) {
        postsContext.deletePost(id);
      }
    }
  };

  return (
    <div className='new-post-container'>
      <h2>Edit Post</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>タイトル : </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>コンテンツ : </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          
        </div>
        <button type="submit" className='submit-btn'>保存</button>
        <button onClick={() => onDelete(post.id)} className='delete-btn'>削除</button>
      </form>
    </div>
  );
};

export default EditPost;
