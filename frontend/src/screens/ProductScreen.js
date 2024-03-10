import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col , Button, Card, Image } from 'react-bootstrap';
import products from '../products.js';
import Rating from '../components/Rating.js'
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';



function ProductScreen({ match }) {
  const {id} = useParams();
  const product= products.find((p) => p._id === id  )
  return (
    <div>
      <Link to ='/' className='btn btn-light my-3'>Go Back </Link>
      <Row>
       <Col md={6}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={3}>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>

          <ListGroup.Item>
          <Rating value={product.rating} text={`(${product.numReviews})`} color={'#fae845'}/>
          </ListGroup.Item>

          {/* <ListGroup.Item>
            <h5>Price: ₹{product.price}</h5> 
          </ListGroup.Item> */}

          <ListGroup.Item>
            <h5>Description: </h5>
            {product.description}
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
              <Col> {product.countInStock >0 ? 'In Stock' : 'Out of Stock'}</Col>
            </Row>
          </ListGroup.Item>

        
          <ListGroup.Item>
            <Button className='btn-block w-100' type='button' disabled={product.countInStock <1}>Add to Cart</Button>
          </ListGroup.Item>

        </ListGroup>
        </Card>
      </Col>


      </Row>
    </div>
  )
}

export default ProductScreen


//rfce