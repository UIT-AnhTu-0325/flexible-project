

import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BlogTable from './BlogTable';
import BlogView from './BlogView';
import BlogForm from './BlogForm';
import EditBlogForm from './EditBlogForm';
import './App.css';


function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formConfig, setFormConfig] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [blogType, setBlogType] = useState('Travel');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5258/blogs?type=${blogType}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, [blogType]);

  useEffect(() => {
    fetch('http://localhost:5258/blog-form-config')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setFormConfig(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setFormConfig([]);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
    // Transform flat data to nested object
    const nestedData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        if (!nestedData[parent]) nestedData[parent] = {};
        nestedData[parent][child] = value;
      } else {
        nestedData[key] = value;
      }
    });
    setSubmitting(true);
    fetch('http://localhost:5258/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nestedData)
    })
      .then(res => res.ok ? res.json() : null)
      .then(newBlog => {
        if (newBlog) setBlogs(prev => [...prev, newBlog]);
        setFormData({});
        setSubmitting(false);
        navigate('/');
      })
      .catch(() => setSubmitting(false));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div style={{ marginBottom: '1em' }}>
              <label htmlFor="blogType">Blog Type: </label>
              <select
                id="blogType"
                value={blogType}
                onChange={e => setBlogType(e.target.value)}
                style={{ marginLeft: '0.5em', padding: '0.3em' }}
              >
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <BlogTable
              blogs={blogs}
              loading={loading}
              onView={id => navigate(`/view/${id}?type=${blogType}`)}
              onEdit={id => navigate(`/edit/${id}?type=${blogType}`)}
            />
            <button style={{ marginTop: '2em' }} onClick={() => navigate(`/create?type=${blogType}`)}>Create Blog</button>
          </div>
        }
      />
      <Route
        path="/view/:id"
        element={<BlogView />}
      />
      <Route
        path="/create"
        element={
          <div>
            <h2>Create Blog</h2>
            <BlogForm
              formConfig={formConfig}
              formData={formData}
              submitting={submitting}
              onChange={handleChange}
              onSubmit={handleSubmit}
              blogType={blogType}
            />
            <button style={{ marginTop: '2em' }} onClick={() => navigate('/')}>Back to List</button>
          </div>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <EditBlogForm
            formConfig={formConfig}
            blogs={blogs}
            setBlogs={setBlogs}
            blogType={blogType}
          />
        }
      />
    </Routes>
  );
}

export default App;
