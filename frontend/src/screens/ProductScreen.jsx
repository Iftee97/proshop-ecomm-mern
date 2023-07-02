import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Spinner } from 'react-bootstrap'
import { BsChevronLeft } from 'react-icons/bs'
import Rating from '../components/Rating'
import axios from 'axios'

export default function ProductScreen() {
  const [product, setProduct] = useState({})
  const { id: productId } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`)
      setProduct(data)
    }
    fetchProduct()
  }, [productId])

  console.log('product: >>>>>>>>>', product)
  const { image, name, rating, numReviews, price, description, countInStock } = product

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
              <ListGroup.Item>
                <Button
                  type='button'
                  variant="dark"
                  className='btn btn-dark'
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
