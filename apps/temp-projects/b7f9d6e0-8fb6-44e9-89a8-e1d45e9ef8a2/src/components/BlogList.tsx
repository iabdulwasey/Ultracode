import React from 'react';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPostType } from '../types/blog';

interface BlogListProps {
  posts: BlogPostType[];
  onPostSelect: (post: BlogPostType) => void;
  searchTerm: string;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onPostSelect, searchTerm }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Blog Posts
        </h1>
        {searchTerm && (
          <p className="text-gray-600 dark:text-gray-400">
            {posts.length} post{posts.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </p>
        )}
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {searchTerm ? 'No posts found matching your search.' : 'No posts available.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
              onClick={() => onPostSelect(post)}
            >
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;