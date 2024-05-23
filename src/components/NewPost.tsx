import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsContext, Post } from '../contexts/PostsContext';
import '../styles/NewPostStyle.css'; // スタイルシートをインポート

interface NewPostData extends Omit<Post, 'id'> {
  image: string;
}

const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const postsContext = useContext(PostsContext);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = ''; // 画像のURLを初期化

    if (image) {
      imageUrl = URL.createObjectURL(image); // 画像が存在する場合、URLを生成
    }

    // 新しい投稿のデータを作成
    const newPost: NewPostData = {
      title,
      content,
      image: imageUrl // 画像のURLを保存
    };

    // 投稿を追加
    if (postsContext) {
      postsContext.addPost(newPost);
    }

    try {
      // 画像をアップロードするなどのAPI呼び出しを行う
      navigate('/'); // ホームページに遷移
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 画像を選択したときの処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="new-post-container">
      <h2>New Post</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>タイトル : </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>コンテンツ : </label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label>Image : </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" className="submit-btn">送信</button>
      </form>
    </div>
  );
};

export default NewPost;
