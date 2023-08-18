import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaInternetExplorer, FaLocationArrow, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
    <footer>
      <div className="bg-secondary bg-opacity-10">
        <div class="container spacer">
          <div className="row">
            <div className="col-3">
              <div className="logo-footer mb-3">
                <img src={require('../images/logo.webp')} alt="" />
              </div>
              <span>Subscribe our newsletter and get <br /> discount 30% off</span>
              <div className="email mt-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter Your Email"
                    aria-describedby="basic-addon2"
                    className='email-input'
                  />
                  <InputGroup.Text id="basic-addon2" className='bg-black'><FaLocationArrow className='text-white'/></InputGroup.Text>
                </InputGroup>
              </div>
              <div className="footer-icons d-flex">
                <p className='fs-6 me-3'><FaTwitter/></p>
                <p className='fs-6 me-3'><FaFacebookF/></p>
                <p className='fs-6 me-3'><FaInstagram/></p>
                <p className='fs-6'><FaInternetExplorer/></p>
              </div>
            </div>
            <div className="col-3">
              <h5 className='fw-bold'>Customer Care</h5>
              <hr className='border-1 line' />
              <p className='mb-2 mt-5'>About Us</p>
              <p className='mb-2'>Privacy Policy</p>
              <p className='mb-2'>Terms & Conditions</p>
              <p className='mb-2'>Products Return</p>
              <p>Wholesale Policy</p>
            </div>
            <div className="col-3">
              <h5 className='fw-bold'>Quick Shop</h5>
              <hr className='border-1 line' />
              <p className='mb-2 mt-5'>Pagination</p>
              <p className='mb-2'>Terms &  Condition</p>
              <p className='mb-2'>Contacts</p>
              <p className='mb-2'>Products Return</p>
              <p>Home Page</p>
            </div>
            <div className="col-3">
              <h5 className='fw-bold'>Company</h5>
              <hr className='border-1 line' />
              <p className='mb-2 mt-5'>Menu Items</p>
              <p className='mb-2'>Privacy Policy</p>
              <p className='mb-2'>Terms & Conditions</p>
              <p className='mb-2'>Products Return</p>
              <p>Wholesale Policy</p>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}
