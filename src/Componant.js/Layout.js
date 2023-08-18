import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosArrowUp } from "react-icons/io";

export default function Layout() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', scrollFunction);

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
  <button onClick={scrollToTop} id="myBtn" title="Go to top" style={{ display: showButton ? 'block' : 'none' }}>
        <IoIosArrowUp />
      </button>
    <Header/>
    <Outlet/>
    <Footer/>

    
    </>
  )
}
