import React, { useState, useEffect, useMemo } from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

function BlogTableSelect({ field, value, onChange, disabled }) {
  const [showModal, setShowModal] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5258/blogs?type=Travel')
      .then((res) => (res.ok ? res.json() : []))
      .then(setBlogs)
      .catch(() => setBlogs([]))
  }, [])

  useEffect(() => {
    if (value) {
      const blog = blogs.find((b) => b.id === value)
      setSelectedBlog(blog)
    } else {
      setSelectedBlog(null)
    }
  }, [value, blogs])

  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('author', {
        header: 'Author',
        cell: (info) => info.getValue()
      })
    ],
    [columnHelper]
  )

  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const handleSelect = (blog) => {
    onChange({ target: { name: field.fieldKey, value: blog.id } })
    setSelectedBlog(blog)
    setShowModal(false)
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        variant='outline-secondary'
        className='w-100 text-start'
      >
        {selectedBlog ? selectedBlog.title : 'Select a Blog'}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Select a Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => handleSelect(row.original)}
                  style={{ cursor: 'pointer' }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BlogTableSelect
