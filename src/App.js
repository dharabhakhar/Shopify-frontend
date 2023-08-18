import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Componant.js/Layout';
import Shop from './Pages/Shop';
import Single from './Pages/Single';
import CartMenu from './Pages/CartMenu';
import CheckOut from './Pages/CheckOut';
import Placed from './Pages/Placed';
import Wishlist from './Pages/Wishlist';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/single/:id' element={<Single/>}/>
          <Route path='/cart' element={<CartMenu/>}/>
          <Route path='/wish' element={<Wishlist/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Route>
        <Route path='/checkOut' element={<CheckOut/>}/>
        <Route path='/placed' element={<Placed/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
