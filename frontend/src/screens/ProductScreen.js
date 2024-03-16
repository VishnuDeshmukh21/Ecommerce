import React , {useState , useEffect}from 'react';
import {Link} from 'react-router-dom'
import { Row, Col , Button, Card, Image , Form } from 'react-bootstrap';
import Rating from '../components/Rating.js'
import { useParams, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { listProductDetails } from '../actions/productActions.js'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
  const [qty,setQty] = useState(1)
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const productDetail = useSelector(state=> state.productDetails)
  const { error, loading, product} = productDetail

  useEffect(() => {
    dispatch(listProductDetails(id))

  }, [dispatch,id]);

  const addToCartHandler= ()=>{
    navigate(`/cart/${id} ? qty=${qty}`)
    console.log("fadg", id)
  }

  // const product= products.find((p) => p._id === id  )
  return (
    <div>

      <Link to ='/' className='btn btn-light my-3'>Go Back </Link>
      { loading ?(
      <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ):(
        <Row>
        <Col md={6}>
         <Image src={product.detailImage} alt={product.name} fluid/>
       </Col>
       <Col md={3}>
 
         <ListGroup variant="flush">
           <ListGroup.Item>
             <h3>{product.name}</h3>
           </ListGroup.Item>
 
           <ListGroup.Item>
           <Rating value={product.rating} text={`(${product.numReviews !== null ?product.numReviews: 0   })`} color={'#fae845'}/>
           </ListGroup.Item>
 
           {/* <ListGroup.Item>
             <h5>Price: ₹{product.price}</h5> 
           </ListGroup.Item> */}
 
           {/* <ListGroup.Item>
             <h5>Description: </h5>
             {product.description}
           </ListGroup.Item> */}
           <ListGroup.Item>
   <h5>Description:</h5>
   {typeof product.description === 'string' ? (
     <div dangerouslySetInnerHTML={{ __html: product.description }} />
   ) : (
     <p>{product.description}</p>
   )}
 </ListGroup.Item>
 
 
         </ListGroup>
       </Col>
       
       <Col md={3}>
     <Card>
         <ListGroup variant="flush">
           <ListGroup.Item>
             <Row>
               <Col> Price:</Col>
               <Col><strong> ₹{product.price}</strong></Col>
             </Row>
           </ListGroup.Item>
 
           <ListGroup.Item>
             <Row>
               <Col> Status: </Col>
               <Col> {product.quantityAvailable >0 ? 'In Stock' : 'Out of Stock'}</Col>
             </Row>
           </ListGroup.Item>
 
         {product.quantityAvailable > 0 && (

          <ListGroup.Item>
            <Row>
              <Col> QTY</Col>
              <Col xs='auto' className='my-1'>
              <Form.Control as ='select' value={qty}  className="form-select" onChange={(e)=> setQty(e.target.value)}>
                {
                  [...Array(product.quantityAvailable).keys()].map((x)=>(
                    <option key={x +1} value={x+1}>
                      { x+1 }
                    </option>
                  ))
                }
                </Form.Control>
                </Col>
            </Row>
          </ListGroup.Item>
         )}

           <ListGroup.Item>
             <Button  onClick={addToCartHandler}  className='btn-block w-100' type='button' disabled={product.quantityAvailable <1}>Add to Cart</Button>
           </ListGroup.Item>
 
         </ListGroup>
         </Card>
       </Col>
 
 
       </Row>
      )
      }
     
    </div>
  )
}

export default ProductScreen


//rfce