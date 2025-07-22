import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function EditBlogForm({ formConfig, setBlogs, blogType }) {
    const { id } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type') || blogType;
    const [formData, setFormData] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Track status as a state field
    const [status, setStatus] = useState('');
    const [filteredFields, setFilteredFields] = useState([]);
    useEffect(() => {
        setStatus(formData.status ?? '');
    }, [formData]);

    useEffect(() => {
        const fields = formConfig
            .filter(field => {
                if (field.blogType !== type) return false;
                const visibleStatuses = typeof field.visibleWhenStatus === 'string' ? field.visibleWhenStatus.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(field.visibleWhenStatus) ? field.visibleWhenStatus.filter(Boolean) : null;
                // Only show field if visibleStatuses exists, has length > 0, and includes current status
                return visibleStatuses && visibleStatuses.length > 0 && visibleStatuses.includes(status);
            })
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setFilteredFields(fields);
    }, [formConfig, type, status]);

    useEffect(() => {
        fetch(`http://localhost:5258/blogs/${id}?type=${type}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    // Flatten nested fields for formData using all fields in formConfig
                    const flatData = {};
                    formConfig.forEach(field => {
                        if (field.fieldKey.includes('.')) {
                            const [parent, child] = field.fieldKey.split('.');
                            flatData[field.fieldKey] = data[parent]?.[child] ?? '';
                        } else {
                            flatData[field.fieldKey] = data[field.fieldKey] ?? '';
                        }
                    });
                    setFormData(flatData);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, type, formConfig]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Transform flat formData to nested object for dot notation keys
        const nestedData = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.');
                if (!nestedData[parent]) nestedData[parent] = {};
                nestedData[parent][child] = value;
            } else {
                nestedData[key] = value;
            }
        });
        // Convert number fields to numbers
        filteredFields.forEach(field => {
            if (field.fieldType === 'number') {
                if (field.fieldKey.includes('.')) {
                    const [parent, child] = field.fieldKey.split('.');
                    if (nestedData[parent] && nestedData[parent][child] !== undefined && nestedData[parent][child] !== '') {
                        nestedData[parent][child] = Number(nestedData[parent][child]);
                    }
                } else {
                    if (nestedData[field.fieldKey] !== undefined && nestedData[field.fieldKey] !== '') {
                        nestedData[field.fieldKey] = Number(nestedData[field.fieldKey]);
                    }
                }
            }
        });
        setSubmitting(true);
        fetch(`http://localhost:5258/blogs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nestedData)
        })
            .then(res => res.ok ? res.json() : null)
            .then(updatedBlog => {
                if (updatedBlog) {
                    setBlogs(prev => prev.map(b => b.id === updatedBlog.id ? updatedBlog : b));
                    navigate(`/view/${id}?type=${type}`);
                }
                setSubmitting(false);
            })
            .catch(() => setSubmitting(false));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: 600, margin: '2em auto' }}>
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                {filteredFields.map(field => {
                    const editStatuses = typeof field.editWhenStatus === 'string' ? field.editWhenStatus.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(field.editWhenStatus) ? field.editWhenStatus.filter(Boolean) : null;
                    const requiredStatuses = typeof field.requiredWhenStatus === 'string' ? field.requiredWhenStatus.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(field.requiredWhenStatus) ? field.requiredWhenStatus.filter(Boolean) : null;
                    // Only allow edit if editStatuses exists and has length > 0 and includes current status
                    const canEdit = editStatuses && editStatuses.length > 0 && editStatuses.includes(status);
                    // Only required if requiredStatuses exists and has length > 0 and includes current status
                    const isRequired = requiredStatuses && requiredStatuses.length > 0 && requiredStatuses.includes(status);
                    return (
                        <div key={field.id} style={{ marginBottom: '1em' }}>
                            <label htmlFor={field.fieldKey}>
                                {field.fieldName}
                                {isRequired && (
                                    <span style={{ color: 'red', marginLeft: 4 }}>*</span>
                                )}
                            </label><br />
                            {field.fieldType === 'textarea' ? (
                                <textarea
                                    name={field.fieldKey}
                                    id={field.fieldKey}
                                    value={formData[field.fieldKey] || ''}
                                    onChange={handleChange}
                                    rows={4}
                                    style={{ width: '100%' }}
                                    disabled={!canEdit}
                                    required={isRequired}
                                />
                            ) : field.fieldName === 'Status' ? (
                                <select
                                    name={field.fieldKey}
                                    id={field.fieldKey}
                                    value={formData[field.fieldKey] || 'Draft'}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    disabled={!canEdit}
                                    required={isRequired}
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            ) : (
                                <input
                                    type={field.fieldType}
                                    name={field.fieldKey}
                                    id={field.fieldKey}
                                    value={formData[field.fieldKey] || ''}
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    disabled={!canEdit}
                                    required={isRequired}
                                />
                            )}
                        </div>
                    );
                })}
                <button type="submit" disabled={submitting}>Update</button>
            </form>
            <button style={{ marginTop: '2em' }} onClick={() => navigate(`/view/${id}?type=${type}`)}>Cancel</button>
        </div>
    );
}

export default EditBlogForm;
