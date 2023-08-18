import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BiChevronRight } from 'react-icons/bi'
import { FaFacebookF, FaInstagram, FaInternetExplorer, FaTwitter } from 'react-icons/fa6'

export default function Contact() {
 return (
  <>
   <div className="shop-banner p-5">
    <div className="text-white shop-detail text-center pt-5">
     <p className='fs-1 pt-5 fw-bold'>Contact Us</p>
     <span> Home <BiChevronRight /> Contact Us</span>
    </div>
   </div>

   <div className="section spacer">
    <Container>
     <Row className="bg-secondary bg-opacity-10">
      <Col sm={6}>
       <div className='px-5'>
        <div className="spacer">
        <span className='about-line text-black fs-6'>CONTACT INFORMATION</span>
        <hr className='line-1 ms-0 mt-3 border-3' />
        <div className="about-para my-5">
          <p>We do not sell product from our corporate headquarters in New York City. If you want to visit, please reach out to our customer service team first.<br/><br/>1201 Broadway<br/>Suite 600</p>
         </div>
        <span className='about-line text-black fs-6'>FOLLOW US</span>
        <hr className='line-1 ms-0 mt-3 border-3' />
        <div className="footer-icons d-flex mt-4">
                <p className='fs-6 me-3'><FaTwitter/></p>
                <p className='fs-6 me-3'><FaFacebookF/></p>
                <p className='fs-6 me-3'><FaInstagram/></p>
                <p className='fs-6'><FaInternetExplorer/></p>
              </div>
        </div>
       </div>

      </Col>
      <Col sm={6}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.4862871992395!2d72.88689767471465!3d21.212556880483113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f7a31c50185%3A0x87232d67295bc2a3!2sYogi%20Chowk%2C%20Sanman%20Society%2C%20Vrundavan%20Society%2C%20Yoginagar%20Society%2C%20Surat%2C%20Gujarat%20395010!5e0!3m2!1sen!2sin!4v1692350171879!5m2!1sen!2sin" width="600" height="480" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </Col>
     </Row>
    </Container>
   </div>
  </>
 )
}
