import React from 'react'
import { Card } from 'react-bootstrap'
import  Rating from './Rating'
//imd
import { Link } from 'react-router-dom'
import { Col,Row } from 'react-bootstrap'

function Product({ product }) {
  return (
    <Card className='my-3 p-2 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.detailImage}/>
      </Link>
      <Card.Body>
        <Row >
          <Col className="overflow-hidden text-truncate">
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div' ><strong>{product.name}</strong></Card.Title>
      </Link>
      </Col>
      <Col>
      <Card.Text as='h4' className='text-end'>
        {/* <div className='my-3'> */}
        ₹{product.price}
        {/* </div> */}
      </Card.Text>
      </Col>
      </Row>
     
      <Card.Text as='div' className='col-md-6'>
        {/* <div className='my-3'> */}
          <Rating value={product.rating} text={`(${product.numReviews !== null ?product.numReviews: 0   })`} color={'#fae845'}/>
        {/* </div> */}
      </Card.Text> 


   
      </Card.Body>
      
     
      
    </Card>
  )
}

export default Product
