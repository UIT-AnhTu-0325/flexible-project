import React from 'react';

function BlogTable({ blogs, loading, onView, onEdit }) {
    const [expandedRows, setExpandedRows] = React.useState([]);

    const handleExpand = (id) => {
        setExpandedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
    };

    return (
        <div className="blog-table">
            <h1>Blog List</h1>
            {loading ? <p>Loading...</p> : (
                blogs.length === 0 ? <p>No blogs found.</p> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>BlogData</th>
                                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => {
                                const blogDataStr = blog.blogData ? JSON.stringify(blog.blogData) : '';
                                const isLong = blogDataStr.length > 60;
                                const isExpanded = expandedRows.includes(blog.id);
                                return (
                                    <tr key={blog.id}>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>{blog.title}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.2em 0.6em',
                                                borderRadius: '0.5em',
                                                background: blog.status === 'Published' ? '#4caf50' : blog.status === 'Draft' ? '#ffc107' : '#9e9e9e',
                                                color: '#fff',
                                                fontSize: '0.9em'
                                            }}>{blog.status}</span>
                                        </td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px', maxWidth: 200, wordBreak: 'break-all' }}>
                                            {isLong && !isExpanded ? (
                                                <>
                                                    {blogDataStr.slice(0, 60)}...{' '}
                                                    <button style={{ fontSize: '0.8em', padding: '2px 6px' }} onClick={() => handleExpand(blog.id)}>Show all</button>
                                                </>
                                            ) : isLong && isExpanded ? (
                                                <>
                                                    {blogDataStr}{' '}
                                                    <button style={{ fontSize: '0.8em', padding: '2px 6px' }} onClick={() => handleExpand(blog.id)}>Hide</button>
                                                </>
                                            ) : blogDataStr}
                                        </td>
                                        <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                            <button onClick={() => onView(blog.id)}>View</button>
                                            <button style={{ marginLeft: '0.5em' }} onClick={() => onEdit(blog.id)}>Edit</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}

export default BlogTable;
