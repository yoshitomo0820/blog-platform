import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import EditPost from './pages/EditPost';
import { PostsProvider } from './contexts/PostsContext';

import './App.css'; // スタイルシートをインポート

const Header: React.FC = () => {
  return (
    <header id='header' className='wrapper'>
      <h1 className = "site-title">WEBLOG</h1>
      <nav>
        <ul>
          <li><Link to="/">マイページ</Link></li>
          <li><Link to="/new">新規作成</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <PostsProvider>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </Router>
    </PostsProvider>
  );
};

export default App;
