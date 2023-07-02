import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

export default function HomeScreen() {
  const { data: products, isLoading, isError } = useGetProductsQuery()

  let content = null
  if (isLoading) {
    content = <h2>Loading...</h2>
  }
  if (isError) {
    content = <h2>Error...</h2>
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
