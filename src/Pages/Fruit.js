import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Fruit() {
 var obj = [
  { img: require('../images/asset 19.jpeg'), name: "Peach" },
  { img: require('../images/asset 21.jpeg'), name: "Lemons" },
  { img: require('../images/asset 23.jpeg'), name: "Passion Fruit" },
  { img: require('../images/asset 20.jpeg'), name: "Mulberry" },
  { img: require('../images/asset 22.jpeg'), name: "Strawberry" },
  { img: require('../images/asset 24.jpeg'), name: "Pomegranate" },
 ]
 return (
  <>
   <section className='reveal'>
    <div className="spacer">
     <Container>
      <Row>
       <Col sm={4}>
        <div className="sec-fruit-image position-relative">
         <img src={require('../images/asset 18.jpeg')} alt="" width="100%" />
         <div className="sec-fruit-detail position-absolute">
          <span className='text-uppercase bg-black text-white py-1 px-3'>up to 30% off</span>
          <h5>Fresh Fruit</h5>
          <span>
           <a href="/shop" className='button-1'>Shop Now</a>
          </span>
         </div>
        </div>
       </Col>
       <Col sm={8}>
        <Row className='g-3'>
         {
          obj.map((item, i) => {
           return (
            <>
             <Col sm={4}>
              <Link to='/shop'>
              <div className="sec-fruit border position-relative p-2">
               <div className="sec-fruit-image1">
                <img src={item.img} alt="" />
               </div>
               <div className="sec-fruit-name position-absolute">
                <h5 className='text-center mb-3 text-black'>{item.name}</h5>
               </div>
              </div>
              </Link>
             </Col>
            </>
           )
          })
         }
        </Row>
       </Col>
      </Row>
     </Container>
    </div>
   </section>

   <section className='reveal'>
    <Container>
     <div className="sec-2-image position-relative text-white">
     <img src={require('../images/asset 46.jpeg')} width="100%" alt="" />
     <div className="sec-2-detail position-absolute">
     <h2 className='h1'>Rewards Just For Shopping!</h2>
     <p>Don’t forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!</p>
     </div>
     </div>
     </Container>
   </section>
  </>
 )
}
