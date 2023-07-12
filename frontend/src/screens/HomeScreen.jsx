import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import GoBackBtn from '../components/GoBackBtn'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

export default function HomeScreen() {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, isError, error } = useGetProductsQuery({ pageNumber, keyword })
  const { page, pages, products } = data || {}

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
      <>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <GoBackBtn />
        )}
        <Meta />
        <h1 className='mb-3'>
          Latest Products
        </h1>
        <Row>
          {products.map((product, index) => (
            <Col key={product._id || index} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ''}
        />
      </>
    )
  }

  return (
    <>
      {content}
    </>
  )
}
