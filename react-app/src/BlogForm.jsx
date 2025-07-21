import React from 'react';
import { useLocation } from 'react-router-dom';

function BlogForm({ formConfig, formData, submitting, onChange, onSubmit }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const blogType = params.get('type') || '';
    const filteredFields = formConfig.filter(field => field.blogType === blogType);

    // Wrap onSubmit to inject type before submit and convert number fields
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataWithType = { ...formData, type: blogType };
        // Convert number fields to numbers
        filteredFields.forEach(field => {
            if (field.fieldType === 'number' && dataWithType[field.fieldKey] !== undefined && dataWithType[field.fieldKey] !== '') {
                dataWithType[field.fieldKey] = Number(dataWithType[field.fieldKey]);
            }
        });
        onSubmit(dataWithType);
    };

    return (
        <form onSubmit={handleSubmit}>
            {filteredFields.map(field => (
                <div key={field.id} style={{ marginBottom: '1em' }}>
                    <label htmlFor={field.fieldKey}>{field.fieldName}</label><br />
                    {field.fieldType === 'textarea' ? (
                        <textarea
                            name={field.fieldKey}
                            id={field.fieldKey}
                            value={formData[field.fieldKey] || ''}
                            onChange={onChange}
                            rows={4}
                            style={{ width: '100%' }}
                        />
                    ) : field.fieldName === 'Status' ? (
                        <select
                            name={field.fieldKey}
                            id={field.fieldKey}
                            value={formData[field.fieldKey] || 'Draft'}
                            onChange={onChange}
                            style={{ width: '100%' }}
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
                            onChange={onChange}
                            style={{ width: '100%' }}
                        />
                    )}
                </div>
            ))}
            <button type="submit" disabled={submitting}>Create</button>
        </form>
    );
}

export default BlogForm;
