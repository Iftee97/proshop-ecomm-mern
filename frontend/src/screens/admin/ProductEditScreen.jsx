import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import GoBackBtn from '../../components/GoBackBtn'
import { toast } from 'react-toastify'

export default function ProductEditScreen() {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId)
  const [updateProduct, { isLoading: updateProductLoading }] = useUpdateProductMutation()
  const [uploadProductImage, { isLoading: uploadImageLoading }] = useUploadProductImageMutation()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const uploadImageHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
      })
      toast.success('Product updated successfully!')
      refetch()
      navigate('/admin/product-list')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <>
      <GoBackBtn />
      <FormContainer>
        <h1>Edit Product</h1>
        {updateProductLoading && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='file'
                label='Choose Image'
                onChange={uploadImageHandler}
              />
              {uploadImageLoading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type='submit'
              variant='dark'
              className='my-2'
              disabled={updateProductLoading}
            >
              {updateProductLoading ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
