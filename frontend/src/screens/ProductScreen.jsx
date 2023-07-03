import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { BsChevronLeft } from 'react-icons/bs'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

export default function ProductScreen() {
  const [qty, setQty] = useState(1)
  const { id: productId } = useParams()
  const { data: product, isLoading, isError, error } = useGetProductDetailsQuery(productId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

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
  if (!isLoading && !isError && product) {
    const { name, image, rating, numReviews, price, description, countInStock } = product
    content = (
      <Row>
        <Col md={5}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={rating} text={`${numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {/* only allow to select as many as available in stock */}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  variant='dark'
                  className='btn btn-dark'
                  disabled={countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Link to='/' className='btn btn-light my-3 inline-block'>
        <span className='d-flex align-items-center'>
          <BsChevronLeft />
          <span className='ms-1'>
            Go Back
          </span>
        </span>
      </Link>
      {content}
    </>
  )
}
