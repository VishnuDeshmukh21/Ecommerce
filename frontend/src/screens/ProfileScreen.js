import React , {useState, useEffect} from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Col , Row, Form ,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,updateProfile  } from '../actions/userActions'
import {  useNavigate } from 'react-router-dom';
import {USER_PROFILE_UPDATE_RESET } from '../constants/userConstants'


function ProfileScreen() {
    const dispatch = useDispatch()
    const [first_name,setFirstName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const [updated, setUpdated] = useState(false)

    const userDetails = useSelector(state=>state.userDetails)
    const { error , loading ,user} = userDetails
    
    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo} = userLogin

    const userProfileUpdate = useSelector(state=>state.userProfileUpdate )
    const { success} = userProfileUpdate
    useEffect(()=> {
      if(!userInfo){
        navigate('/login')
      }
      else{
        if(!user || !user.name || success){
          dispatch({type:USER_PROFILE_UPDATE_RESET})
        dispatch(getUserDetails('profile'))

        }
        else{
          setFirstName(user.name)
        setEmail(user.email)
        }

      }
    },[dispatch,navigate,user,userInfo,success]) 
    
    const submitHandler = (e) =>{
      e.preventDefault()
      if (password!==confirmPassword){
        setMessage("Passwords do not  match");
      }
      else{
      dispatch(updateProfile({
        "id":user._id,
        "first_name": first_name,
        "email":email,
        "password":password
    }  

      ))
      setUpdated(true)
      setMessage("")
    }

    } 

    return (

      <Row>
        <Col md={5}>
      <FormContainer>
      <h1>Profile</h1>
      {message && ( <Message variant='danger'> {message}</Message>  
)} 
      {error && <Message variant='danger'> {error}</Message>}
      {loading && <Loader/>}

      <Form onSubmit={submitHandler}>

      <Form.Group  controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control  required type='name' placeholder='Enter Name' value = {first_name} onChange={(e)=> setFirstName(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group  controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control  required type='email' placeholder='Enter Email' value = {email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group  controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control  type='password' placeholder='Enter Password' value = {password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group  controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control  type='confirmpassword' placeholder='Enter Password' value = {confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group controlId='checkbox' className='py-3'>
        <Form.Check
          type='checkbox'
          label='Agree to Changes'
          required
        />
      </Form.Group>

        <Button type='submit ' variant='primary' className='my-3' >Update</Button>

      </Form>
      { updated && (
      <Message variant='success'> Update Successful</Message>
    )}
  
      
    </FormContainer>
   
    </Col>

    <Col md={6}>
      <h2> My Orders</h2>
    </Col>
    </Row>
    )
 
  
}

export default ProfileScreen
