//imp
//imd
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'
import './bootstrap.min.css'
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <Router>
      <Header />
      <main class="py-3">
        <Container>
        <Routes>
          <Route path='/' Component={ HomeScreen} exact/>
        </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
