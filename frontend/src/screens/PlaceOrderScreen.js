import React , {useState, useEffect} from 'react'
import { Col , Row,Button,ListGroup,Image,Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps  from '../components/CheckoutSteps'
import Message  from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

function PlaceOrderScreen() {
  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {shippingAddress,paymentMethod,cartItems} = cart
  
  cart.itemsPrice = cart.cartItems.reduce((acc,item)=>
    acc + item.price* item.qty,0
  ).toFixed(2)

  cart.shippingPrice=(cart.itemsPrice > 100 ? 0: 25).toFixed(2)
  cart.taxPrice=( (0.08)* cart.itemsPrice ).toFixed(2)

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

 

  useEffect( ()=>{

    if (!paymentMethod) {
      navigate('/payment');
    }

    if(success){
      
      navigate(`/order/${order._id}`)
      dispatch({type:ORDER_CREATE_RESET})
      dispatch({type:CART_CLEAR_ITEMS})
     
    }
  },[success,navigate])


  const placeOrder = ()=>{
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice:cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,

    }))
  }


  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping:</strong> 
                {shippingAddress.address}, {shippingAddress.city}, 
                {'  '},
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> 
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              { cart.cartItems.length ===0 ?<Message variant='info'> Your Cart is Empty</Message>: (

                <ListGroup variant='flush'>
                {cartItems.map((item, index)=>(
                  <ListGroup.Item key={index}>
                    <Row>
                    <Col md={1}>
                      <Image src={item.detailImage} alt={item.name} fluid rounded/>
                    </Col>

                    <Col md={3}>
                        <Link to ={`/product/${item.product}`}> {item.name}</Link>
                    </Col>

                    <Col md={4}>
                        {item.qty } X ₹{item.price} =  ₹{(item.qty * item.price).toFixed(2)}
                    </Col>

                    <Col md={3}>
                      
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
            <ListGroup varaint='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>


              <ListGroup.Item>
                <Row>
                  <Col> Items:</Col>
                  <Col> ₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Shipping</Col>
                  <Col> ₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Tax</Col>
                  <Col> ₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              
              <ListGroup.Item>
                <Row>
                  <Col> Total Price</Col>
                  <Col> ₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              <ListGroup.Item>
                { error && (
                  <Message variant='danger'>{error}</Message>
                )}
              </ListGroup.Item>
              
              <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems ===0} onClick={placeOrder}>  Place Order</Button>
              </ListGroup.Item>


            </ListGroup>
          </Card>
        </Col>

      </Row>
    </div>
  )
}

export default PlaceOrderScreen
