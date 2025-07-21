import React from 'react';
import { useLocation } from 'react-router-dom';

function BlogForm({ formConfig, formData, submitting, onChange, onSubmit }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const blogType = params.get('type') || '';
    const filteredFields = formConfig.filter(field => {
        if (field.blogType !== blogType) return false;
        const visibleStatuses = typeof field.visibleWhenStatus === 'string' ? field.visibleWhenStatus.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(field.visibleWhenStatus) ? field.visibleWhenStatus.filter(Boolean) : null;
        // Only show field if visibleStatuses exists, has length > 0, and includes 'Draft'
        return visibleStatuses && visibleStatuses.length > 0 && visibleStatuses.includes('Draft');
    });

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
            {filteredFields.map(field => {
                // Required logic: only required if requiredWhenStatus exists, has length > 0, and includes 'Draft'
                const requiredStatuses = typeof field.requiredWhenStatus === 'string' ? field.requiredWhenStatus.split(',').map(s => s.trim()).filter(Boolean) : Array.isArray(field.requiredWhenStatus) ? field.requiredWhenStatus.filter(Boolean) : null;
                const isRequired = requiredStatuses && requiredStatuses.length > 0 && requiredStatuses.includes('Draft');
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
                                onChange={onChange}
                                rows={4}
                                style={{ width: '100%' }}
                                required={isRequired}
                            />
                        ) : field.fieldName === 'Status' ? (
                            <select
                                name={field.fieldKey}
                                id={field.fieldKey}
                                value={'Draft'}
                                style={{ width: '100%' }}
                                disabled
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
                                onChange={onChange}
                                style={{ width: '100%' }}
                                required={isRequired}
                            />
                        )}
                    </div>
                );
            })}
            <button type="submit" disabled={submitting}>Create</button>
        </form>
    );
}

export default BlogForm;
