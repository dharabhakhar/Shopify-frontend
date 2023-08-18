import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch } from "react-icons/bs";
import { IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import Cart from '../Pages/Cart';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Search from '../Pages/Search';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [modalShow, setModalShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailError1, setEmailError1] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const patt3 = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const heart = () =>{
    navigate('/wish');
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };
  const handleEmailChange1 = (e) => {
    setEmail1(e.target.value);
    setEmailError1('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  const handlePasswordChange1 = (e) => {
    setPassword1(e.target.value);
    setPasswordError1('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setEmailError('Enter Your Email');
      return false;
    }
    else if (patt3.test(email) === false) {
      setEmailError('Enter Valid Email');
      return false;
    }
    else if (password === '') {
      setPasswordError('Enter Your Password');
      return false;
    }
    else {
      axios.post('http://localhost:2200/users/', {
        email: email,
        password: password
      })
        .then(function (response) {
          console.log(response.data.login_data[0]._id);
          setText(response.data.status);
          if (response.data.status === "success") {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('UserId', response.data.login_data[0]._id)
            setModalShow(false)
          } else {
            setModalShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
  const handleRegister = (e) => {
    e.preventDefault();

    if (email1 === '') {
      setEmailError1('Enter Your Email');
      return false;
    }
    else if (patt3.test(email1) === false) {
      setEmailError1('Enter Valid Email');
      return false;
    }
    else if (password1 === '') {
      setPasswordError1('Enter Your Password');
      return false;
    }
    else {
      axios.post('http://localhost:2200/users/register', {
        email: email1,
        password: password1
      })
        .then(function (response) {
          console.log(response.data);
          setText1(response.data.status);
          if (response.data.status === "success") {
            setRegisterShow(false)
            setModalShow(true);
          } else {
            setRegisterShow(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const show = () => {
    if (showPassword) {
      return <i className="text-secondary"><FaEyeSlash /></i>;
    } else {
      return <i className="text-secondary"><FaEye /></i>;;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector('.sticky');
    const scrollTop = window.scrollY;
    scrollTop >= 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
  };
  return (
    <>
      <header>
        <div className="sticky">
          <div className="bg-white py-3">
            <div className="container d-flex align-items-center justify-content-between">
              <div className="logo-header">
                <img src={require('../images/logo.webp')} alt="" />
              </div>
              <nav class="navbar-expand-lg py-0 d-inline-block">
                <div class="container-fluid px-0">
                  <button class="navbar-toggler p-0 btn-1" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0 main_menu">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/about">About Us</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href='/shop'>Shop</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/contact">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="header-icon">
                <span className='fs-5 me-3'>
                <Search placement={'top'} name={'top'} />
                </span>
                <span className='fs-5 me-3' onClick={() => setModalShow(true)}><IoPersonOutline /></span>
                <span className='fs-4 me-3' onClick={()=>heart()}><IoHeartOutline /></span>
                <span className='fs-5'>
                  <Cart placement={'end'} name={'end'} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  size="30px" />
                <label>Email</label>
                <span className="error">{emailError}</span>
                <br />
                <br />
              </div>
              <div className="user-box">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  size="30px" />
                <i className="eye" onClick={togglePasswordVisibility}>{show()}</i>
                <label>Password</label>
                <span className="error">{passwordError}</span>
                <br />
                <br />
              </div>
              <div className="user_box mb-3">
                <span className="error">{text}</span>
              </div>
              <input type="submit" className="mx-auto d-block fs-5 bg-transparent border-0 text-white" value="Submit" />
              <hr />
              <div className="register d-flex">
                <h6>Don`t Have Account</h6>
                <h6 className='ms-auto bt' onClick={()=>setRegisterShow(true)}>Register</h6>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={registerShow}
        onHide={() => setRegisterShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="login-box">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="user-box">
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  value={email1}
                  onChange={handleEmailChange1}
                  size="30px" />
                <label>Email</label>
                <span className="error">{emailError1}</span>
                <br />
                <br />
              </div>
              <div className="user-box">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  value={password1}
                  onChange={handlePasswordChange1}
                  size="30px" />
                <i className="eye" onClick={togglePasswordVisibility}>{show()}</i>
                <label>Password</label>
                <span className="error">{passwordError1}</span>
                <br />
                <br />
              </div>
              <div className="user_box mb-3">
                <span className="error">{text1}</span>
              </div>
              <input type="submit" className="mx-auto d-block fs-5 bg-transparent border-0 text-white" value="Submit" />
              <hr />
              <div className="register d-flex">
                <h6>Don`t Have Account</h6>
                <h6 className='ms-auto bt' onClick={()=>setRegisterShow(true)}>Register</h6>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
