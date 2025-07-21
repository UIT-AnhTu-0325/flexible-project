import React from 'react';

function BlogForm({ formConfig, formData, submitting, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            {formConfig.map(field => (
                <div key={field.id} style={{ marginBottom: '1em' }}>
                    <label htmlFor={field.fieldName}>{field.fieldName}</label><br />
                    {field.fieldType === 'textarea' ? (
                        <textarea
                            name={field.fieldName}
                            id={field.fieldName}
                            value={formData[field.fieldName] || ''}
                            onChange={onChange}
                            rows={4}
                            style={{ width: '100%' }}
                        />
                    ) : field.fieldName === 'Status' ? (
                        <select
                            name={field.fieldName}
                            id={field.fieldName}
                            value={formData[field.fieldName] || 'Draft'}
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
                            name={field.fieldName}
                            id={field.fieldName}
                            value={formData[field.fieldName] || ''}
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
