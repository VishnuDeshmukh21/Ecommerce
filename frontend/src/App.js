//imp
//imd
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'
import './bootstrap.min.css'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Routes>
          <Route path="/" element={< HomeScreen/>} exact/>
          <Route path="/product/:id" element={ <ProductScreen/>}/>

        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;