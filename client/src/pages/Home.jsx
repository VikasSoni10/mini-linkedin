import React, { useState, useEffect } from 'react';
import api from '../api';
import Post from '../components/Post';
import toast from 'react-hot-toast';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      toast.error('Could not fetch posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await api.post('/posts', { content });
      toast.success('Post created successfully!');
      setContent('');
      fetchPosts();
    } catch (err) {
      toast.error('Failed to create the post.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Feed Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Post Creation */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handlePostSubmit}>
              <textarea
                className="w-full resize-none border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                rows="3"
                placeholder="Start a post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
                >
                  Post
                </button>
              </div>
            </form>
          </div>

          {/* Posts Feed */}
          {loading ? (
            <p className="text-center text-gray-500">Loading feed...</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Welcome!</h3>
            <p className="text-sm text-gray-500 mt-2">
              This is your professional community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
