import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

export default function HomeScreen() {
  const { data: products, isLoading, isError, error } = useGetProductsQuery()
  // console.log('products: >>>>>>>>>', products)

  let content = null
  if (isLoading) {
    content = <Loader />
  }
  if (isError) {
    content = (
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    )
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <h2>No products found</h2>
  }
  if (!isLoading && !isError && products?.length > 0) {
    content = (
      <Row>
        {products.map((product, index) => (
          <Col key={product._id || index} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <>
      <h1>Latest Products</h1>
      {content}
    </>
  )
}
