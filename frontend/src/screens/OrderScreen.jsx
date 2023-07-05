import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation
} from '../slices/ordersApiSlice'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import moment from 'moment'

export default function OrderScreen() {
  const { id: orderId } = useParams()
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId)
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery()
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD'
          }
        })
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending'
        })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch])

  // // refactored useEffect
  // useEffect(() => {
  //   if (errorPayPal || loadingPayPal || !paypal.clientId || !order || order.isPaid || window.paypal) {
  //     return // No need to proceed further
  //   }
  // 
  //   const loadPayPalScript = async () => {
  //     paypalDispatch({
  //       type: 'resetOptions',
  //       value: {
  //         'client-id': paypal.clientId,
  //         currency: 'USD'
  //       }
  //     })
  //     paypalDispatch({
  //       type: 'setLoadingStatus',
  //       value: 'pending'
  //     })
  //   }
  //   loadPayPalScript()
  // }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch])

  const createOrder = async (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success('Payment successful')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    })
  }

  // const onApproveTest = async () => {
  //   await payOrder({
  //     orderId,
  //     details: { payer: {} }
  //   })
  //   refetch()
  //   toast.success('Payment successful')
  // }

  const onError = (err) => {
    toast.error(err.message)
  }

  const formatDate = (dateString) => {
    const date = moment.utc(dateString)
    return date.format('MMMM D, YYYY, h:mm:ss A')
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order delivered')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error}
    </Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:{' '}</strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email:{' '}</strong>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>
              </p>
              <p>
                <strong>Address:{' '}</strong>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}-{order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {formatDate(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not Delivered
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:{' '}</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {formatDate(order.paidAt)}
                </Message>
              ) : (
                <Message variant='danger'>
                  Not Paid
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>
                  Order is empty
                </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        variant='dark'
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        test pay order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {/* MARK AS DELIVERED PLACEHOLDER */}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' variant='primary' onClick={deliverOrderHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
