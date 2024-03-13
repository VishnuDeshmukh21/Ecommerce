import React , {useState , useEffect}from 'react';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap';
// import products from '../products.js';
import Product from '../components/Product'


export default function HomeScreen() {

  const [products, setProducts]=useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('api/products/');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error (e.g., display an error message to the user)
      }
    }
    fetchProducts();
  }, []);
  
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xL={3}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
