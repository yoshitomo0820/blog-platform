import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsContext, Post } from '../contexts/PostsContext';

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postsContext = useContext(PostsContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>タイトル : </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>コンテンツ : </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

export default EditPost;
