import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'

const EditFeeModal = ({ blog, show, onClose, onSave }) => {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (blog) {
      setFormData({
        airTicketFee: blog.airTicketFee ?? '',
        hotelFee: blog.hotelFee ?? ''
      })
    }
  }, [blog])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Fees for: {blog?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Air Ticket Fee</Form.Label>
            <Form.Control
              type='text'
              name='airTicketFee'
              value={formData.airTicketFee || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Hotel Fee</Form.Label>
            <Form.Control
              type='text'
              name='hotelFee'
              value={formData.hotelFee || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function SubBlogList({ value, onChange, disabled }) {
  const [subBlogs, setSubBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5258/blogs?type=Travel')
      .then((res) => (res.ok ? res.json() : []))
      .then((travelBlogs) => {
        const existingDataMap = new Map(
          (Array.isArray(value) ? value : []).map((b) => [b.id, b])
        )

        const mergedBlogs = travelBlogs.map((fetchedBlog) => {
          const existingData = existingDataMap.get(fetchedBlog.id)
          return existingData
            ? { ...fetchedBlog, ...existingData }
            : fetchedBlog
        })

        setSubBlogs(mergedBlogs)
      })
      .catch(() => {
        setSubBlogs([])
      })
  }, [value])

  const handleRowClick = (blog) => {
    if (!disabled) {
      setSelectedBlog(blog)
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedBlog(null)
  }

  const handleSave = (updatedFees) => {
    const updatedSubBlogs = subBlogs.map((b) =>
      b.id === selectedBlog.id ? { ...b, ...updatedFees } : b
    )
    setSubBlogs(updatedSubBlogs)

    const purchaseLines = updatedSubBlogs
      .filter((b) => b.airTicketFee || b.hotelFee)
      .map(({ id, airTicketFee, hotelFee }) => ({
        id,
        airTicketFee: airTicketFee || '',
        hotelFee: hotelFee || ''
      }))

    onChange({
      target: { name: 'blogData.purchaseLines', value: purchaseLines }
    })
    handleCloseModal()
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Air Ticket Fee</th>
            <th>Hotel Fee</th>
          </tr>
        </thead>
        <tbody>
          {subBlogs.map((blog) => (
            <tr
              key={blog.id}
              onClick={() => handleRowClick(blog)}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
            >
              <td>{blog.title}</td>
              <td>{blog.airTicketFee}</td>
              <td>{blog.hotelFee}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedBlog && (
        <EditFeeModal
          blog={selectedBlog}
          show={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default SubBlogList
