import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Company from './components/pages/Company'
import NewProject from './components/pages/NewProject'
import Projets from './components/pages/Projets'

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
    return (
        <Router>
            <Navbar/>
            <Container customClass="min-height">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/company' element={<Company />} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='/newproject' element={<NewProject />} />
                    <Route exact path='/projets' element={<Projets />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    );
}

export default App;
