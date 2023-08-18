import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BiChevronRight } from 'react-icons/bi'

export default function About() {
 return (
  <>
   <div className="shop-banner p-5">
    <div className="text-white shop-detail text-center pt-5">
     <p className='fs-1 pt-5 fw-bold'>About Us</p>
     <span> Home <BiChevronRight /> About Us</span>
    </div>
   </div>

   <div className="section my-5">
    <Container>
     <Row>
      <Col sm={6}>
       <div className="spacer">
        <div className="spacer">
         <h3 className='h1 fw-bold'>Our Story</h3>
         <div className="d-flex align-items-center">
          <hr className='line-1 m-0 border-3 d-inline-block' />
          <span className='ms-3 about-line'>THE HIGH STRESS FAVOUTIRE</span>
         </div>
         <div className="about-para mt-5">
          <p>Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam. Aenean massa.<br /><br />In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
         </div>
        </div>
       </div>
      </Col>
      <Col sm={6}>
       <img src={require('../images/about1.webp')} width="100%" alt="" />
      </Col>
     </Row>
    </Container>
   </div>

   <div className="section my-5">
    <Container>
     <Row>
      <Col sm={6}>
       <img src={require('../images/about2.webp')} width="100%" alt="" />
      </Col>
      <Col sm={6}>
       <div className="spacer">
        <div className="spacer">
         <h3 className='h1 fw-bold'>Who We Are ?</h3>
         <div className="d-flex align-items-center">
          <hr className='line-1 m-0 border-3 d-inline-block' />
          <span className='ms-3 about-line'>THE HIGH STRESS FAVOUTIRE</span>
         </div>
         <div className="about-para mt-5">
          <p>Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam. Aenean massa.<br /><br />In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
         </div>
        </div>
       </div>
      </Col>
     </Row>
    </Container>
   </div>
  </>
 )
}
