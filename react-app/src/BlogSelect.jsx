import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

function BlogSelect({ field, value, onChange, disabled, required }) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This endpoint should be made dynamic in a real-world scenario,
    // possibly passed down through the field configuration.
    fetch(`http://localhost:5258/blogs?type=Travel`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setOptions(data)
        setLoading(false)
      })
      .catch(() => {
        setOptions([])
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Loading options...</p>
  }

  return (
    <Form.Select
      name={field.fieldKey}
      id={field.fieldKey}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      required={required}
    >
      <option value=''>-- Select --</option>
      {options.map((option) => (
        // Assuming the blog objects have 'id' and 'title' properties.
        // This should be adjusted if the API response is different.
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </Form.Select>
  )
}

export default BlogSelect
