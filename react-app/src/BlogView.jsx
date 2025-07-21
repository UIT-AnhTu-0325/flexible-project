import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogView() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5258/blogs`)
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                const found = Array.isArray(data) ? data.find(b => b.id === Number(id)) : null;
                setBlog(found);
                setLoading(false);
            })
            .catch(() => {
                setBlog(null);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    return (
        <div style={{ maxWidth: 600, margin: '2em auto' }}>
            <h1>{blog.title}</h1>
            <span style={{
                display: 'inline-block',
                padding: '0.2em 0.6em',
                borderRadius: '0.5em',
                background: blog.status === 'Published' ? '#4caf50' : blog.status === 'Draft' ? '#ffc107' : '#9e9e9e',
                color: '#fff',
                fontSize: '0.9em',
                marginBottom: '1em'
            }}>{blog.status}</span>
            <p>{blog.content}</p>
            <button style={{ marginTop: '2em' }} onClick={() => navigate('/')}>Back to List</button>
        </div>
    );
}

export default BlogView;
