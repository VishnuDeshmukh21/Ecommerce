import React , {useState, useEffect} from 'react'
import { Col , Row,Button,Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {  useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps  from '../components/CheckoutSteps'


function ShippingScreen() {
  const cart = useSelector(state=> state.cart)
  const {shippingAddress} = cart 

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress && shippingAddress.address ? shippingAddress.address : "");
  const [city, setCity] = useState(shippingAddress && shippingAddress.city ? shippingAddress.city : "")
  const [postalCode, setPostalCode] = useState(shippingAddress && shippingAddress.postalCode ?shippingAddress.postalCode : "")
  const [country, setCountry] = useState(shippingAddress && shippingAddress.country ?shippingAddress.country:"")

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode,country}))
    navigate('/payment')
  }


  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping Details</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group  controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control  required type='text' placeholder = "Enter Address"value = {address ? address: ''} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control  required type='text' placeholder = "Enter Postal Code"value = {postalCode? postalCode: ''} onChange={(e)=> setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control  required type='text' placeholder = "Enter City"value = {city ? city: ''} onChange={(e)=> setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control  required type='text' placeholder = "Enter Country"value = {country ?country: ''} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
        </Form.Group>

      <Button type='submit ' variant='primary' className='my-3' >Next</Button>

      </Form>


      
    </FormContainer>
  )
}

export default ShippingScreen
