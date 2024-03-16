import React , {useState , useEffect}from 'react';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap';
// import products from '../products.js';
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'


import { useDispatch, useSelector, UseSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

export default function HomeScreen() {

  const dispatch = useDispatch()

  const productList = useSelector(state=> state.productList)
  const { error, loading, products} = productList
  useEffect(() => {

    dispatch(listProducts())




  }, [dispatch]);
  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xL={3}>
              <Product product={product}/>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
          }  
