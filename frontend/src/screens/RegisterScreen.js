import React , {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Col , Row, Form ,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import {  useNavigate } from 'react-router-dom';

function RegisterScreen() {
  const [name , setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const dispatch = useDispatch()

  const navigate = useNavigate();
  const redirect= navigate.search ? navigate.search.split('=')[1] : '/login'

  const userRegister = useSelector(state => state.userRegister)
  const { error , loading ,userRegisterInfo} = userRegister

  useEffect(()=>{
    if(userRegisterInfo){
      navigate(redirect)
    }
  },[navigate,userRegisterInfo,redirect])
  const submitHandler = (e) =>{
    e.preventDefault()

    if (password!==confirmPassword){
      setMessage("Passwords do not  match");
    }
    else{


    dispatch(register(name,email,password))

    
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && ( <Message variant='danger'> {message}</Message>  
)} 
      {error && <Message variant='danger'> {error}</Message>}
      {loading && <Loader/>}

      <Form onSubmit={submitHandler}>

      <Form.Group  controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control  required type='name' placeholder='Enter Name' value = {name} onChange={(e)=> setName(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group  controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control  required type='email' placeholder='Enter Email' value = {email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password' placeholder='Enter Password' value = {password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required type='confirmpassword' placeholder='Enter Password' value = {confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit ' variant='primary' className='my-3' >Sign Up</Button>

      </Form>

      <Row className='py-3'>
        <Col>
        Already Registered? <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>

      </Row>

      
    </FormContainer>
  )
}

export default RegisterScreen
