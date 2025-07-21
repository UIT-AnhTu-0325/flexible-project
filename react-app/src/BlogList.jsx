import React from 'react';

function BlogList({ blogs, loading }) {
    return (
        <div className="blog-list">
            <h1>Blog List</h1>
            {loading ? <p>Loading...</p> : (
                blogs.length === 0 ? <p>No blogs found.</p> : (
                    <ul>
                        {blogs.map(blog => (
                            <li key={blog.id}>
                                <h2>{blog.title}</h2>
                                <p>{blog.content}</p>
                                {blog.status && (
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.2em 0.6em',
                                        borderRadius: '0.5em',
                                        background: blog.status === 'Published' ? '#4caf50' : blog.status === 'Draft' ? '#ffc107' : '#9e9e9e',
                                        color: '#fff',
                                        fontSize: '0.9em',
                                        marginLeft: '1em'
                                    }}>{blog.status}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
}

export default BlogList;
