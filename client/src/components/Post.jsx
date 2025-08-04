import React from 'react';
import { Link } from 'react-router-dom';

// Avatar with fallback initial
const Avatar = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  return (
    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xl shadow-sm">
      {initial}
    </div>
  );
};

const Post = ({ post }) => {
  if (!post.author) return null;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Link to={`/profile/${post.author._id}`}>
          <Avatar name={post.author.name} />
        </Link>

        {/* Author Info */}
        <div className="flex-1">
          <Link
            to={`/profile/${post.author._id}`}
            className="text-base font-bold text-gray-800 hover:underline"
          >
            {post.author.name}
          </Link>
          <p className="text-xs text-gray-500">
            {new Date(post.timestamp).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mt-4 whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};

export default Post;
