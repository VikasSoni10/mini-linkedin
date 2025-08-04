import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Post from '../components/Post';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userRes = await api.get(`/users/${userId}`);
        const postsRes = await api.get(`/posts/user/${userId}`);
        setUser(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading)
    return (
      <div className="text-center mt-12 text-gray-700 font-medium text-lg">
        Loading Profile...
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-12 text-red-600 font-semibold">
        User not found.
      </div>
    );

  const initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gray-100"></div>

        {/* Avatar and Info */}
        <div className="px-6 pb-6">
          <div className="transform -translate-y-16">
            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-5xl border-4 border-white shadow-md">
              {initial}
            </div>
          </div>
          <div className="transform -translate-y-12">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            <p className="mt-4 text-gray-700 whitespace-pre-wrap">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="bg-white p-5 rounded-lg border border-gray-200 text-center text-gray-500">
              This user hasn't posted anything yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
