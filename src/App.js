import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';

function App() {
  return (
    <Router> 
      <Navbar/>  
      <Container customClass='minHeight'>
        <Routes>
          <Route path= "/" element={<Home/>}/> 
          <Route path= "/company" element={<Company/>}/> 
          <Route path= "/projects" element={<Projects/>}/> 
          <Route path= "/newProject" element={<NewProject/>}/>    
          <Route path= "/contact" element={<Contact/>}/> 
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
