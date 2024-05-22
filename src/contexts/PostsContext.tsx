import React, { createContext, useState,useEffect, ReactNode } from 'react';

export interface Post {  // 'export'を追加して他のファイルでインポート可能にします
  id: number;
  title: string;
  content: string;
  image: string; // 画像のURLを含める
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  editPost: (updatedPost: Post) => void;
  deletePost: (id: number) => void;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const addPost = (post: Omit<Post, 'id'>) => {
    const newPost = { id: Date.now(), ...post };
    setPosts([...posts, newPost]);
  };

  const editPost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
