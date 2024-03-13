import React from 'react'
import { Card } from 'react-bootstrap'
import  Rating from './Rating'
//imd
import { Link } from 'react-router-dom'

function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image}/>
      </Link>
      <Card.Body>
      <Link to={`/product/${product._id}`}>
        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
      </Link>
     
      <Card.Text as='div' className='col-md-6'>
        <div className='my-3'>
          <Rating value={product.rating} text={`(${product.numReviews !== null ?product.numReviews: 0   })`} color={'#fae845'}/>
        </div>
      </Card.Text> 


      <Card.Text as='h3'>
        <div className='my-3'>
        ₹{product.price}
        </div>
      </Card.Text>
      </Card.Body>
      
     
      
    </Card>
  )
}

export default Product
