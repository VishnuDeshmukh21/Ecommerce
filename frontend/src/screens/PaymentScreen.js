import React , {useState, useEffect} from 'react'
import { Col , Row,Button,Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {  useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps  from '../components/CheckoutSteps'


function PaymentScreen() {
   const navigate = useNavigate()
  const dispatch = useDispatch()

  const [paymentMmethod,setPaymentMethod] = useState("PayPal")

   const cart = useSelector(state=> state.cart)
  const {shippingAddress} = cart 

  if(!shippingAddress.address){
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMmethod))

    navigate('/placeorder')

  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}> 
        <Form.Group>
        <Form.Label as ='legend'> Select Method</Form.Label>
        <Col>
        <Form.Check type = 'radio' label='PayPal or Credit Card' id='PayPal' name='paymentMmethod' checked onChange={(e)=>{setPaymentMethod(e.target.value)}}>

        </Form.Check>
        </Col>

        </Form.Group>

        <Button type='submit' variant='primary'> Next</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
