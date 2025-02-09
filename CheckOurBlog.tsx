import React from 'react'
import BlogList from './BlogList'

export default function CheckOurBlog() {
  
  const page = 1;
  const limit = 3;
  const showPagination = false;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Our Blog Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover insights about vehicle history, maintenance, and buying guides
          </p>
        </div>
        <BlogList page={page} limit={limit} showPagination={showPagination} />
      </div>
    </div>
  )
}

