import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

function BlogView() {
  const { id } = useParams()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const blogType = params.get('type') || ''
  const [blog, setBlog] = useState(null)
  const [formConfig, setFormConfig] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5258/blogs/${id}?type=${blogType}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setBlog(data)
        setLoading(false)
      })
      .catch(() => {
        setBlog(null)
        setLoading(false)
      })
  }, [id, blogType])

  useEffect(() => {
    fetch('http://localhost:5258/blog-form-config')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setFormConfig(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        setFormConfig([])
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Blog not found.</p>

  // Filter fields by blogType, visibleWhenStatus, and order
  const status = blog?.status ?? ''
  const filteredFields = formConfig
    .filter((field) => {
      if (field.blogType !== blogType) return false
      const visibleStatuses =
        typeof field.visibleWhenStatus === 'string'
          ? field.visibleWhenStatus
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(field.visibleWhenStatus)
          ? field.visibleWhenStatus.filter(Boolean)
          : null
      // Only show field if visibleStatuses exists, has length > 0, and includes current status
      return (
        visibleStatuses &&
        visibleStatuses.length > 0 &&
        visibleStatuses.includes(status)
      )
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Helper to get value from blog object, supporting nested keys
  const getValue = (fieldKey) => {
    if (fieldKey.includes('.')) {
      const [parent, child] = fieldKey.split('.')
      return blog[parent]?.[child] ?? ''
    }
    return blog[fieldKey] ?? ''
  }

  return (
    <div style={{ maxWidth: 600, margin: '2em auto' }}>
      <h1>{getValue('title')}</h1>
      {filteredFields.map((field) => (
        <div key={field.id} style={{ marginBottom: '1em' }}>
          <label style={{ fontWeight: 'bold' }}>{field.fieldName}:</label>
          <br />
          {field.fieldName === 'Status' ? (
            <span
              style={{
                display: 'inline-block',
                padding: '0.2em 0.6em',
                borderRadius: '0.5em',
                background:
                  getValue(field.fieldKey) === 'Published'
                    ? '#4caf50'
                    : getValue(field.fieldKey) === 'Draft'
                    ? '#ffc107'
                    : '#9e9e9e',
                color: '#fff',
                fontSize: '0.9em',
                marginBottom: '1em'
              }}
            >
              {getValue(field.fieldKey)}
            </span>
          ) : (
            <span>{getValue(field.fieldKey)}</span>
          )}
        </div>
      ))}
      <button style={{ marginTop: '2em' }} onClick={() => navigate('/')}>
        Back to List
      </button>
    </div>
  )
}

export default BlogView
