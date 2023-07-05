import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export default function ProductListScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  // console.log('products: >>>>>>>>>>', products)

  const createProductHandler = () => {
    console.log('createProductHandler')
  }

  const deleteHandler = (id) => {
    console.log('deleteHandler')
  }

  return (
    <>
      <Row className='d-flex align-items-center'>
        <Col>
          <h1>All Products</h1>
        </Col>
        <Col className='text-end'>
          <Button
            variant='dark'
            className='my-3'
            onClick={createProductHandler}
          >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}
