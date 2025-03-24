import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AuthPage from './Components/AuthPage';
import Finger from './Components/Finger';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

function App() {
  return (
  <>
  
    <Router>
    < Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<AuthPage/>} />
        <Route path='/finger' element={<Finger/>} />
      </Routes>
      <Footer />
    </Router>
    
  </>
  );
}

export default App;
