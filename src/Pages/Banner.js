import { Carousel } from 'react-bootstrap'
import React from 'react'

export default function Banner() {
 return (
  <>
   <div className="spacer-banner"></div>
   <div className="banner">
    <Carousel>
     <Carousel.Item>
      <div className="banner-image">
      <img src={require('../images/asset 15.jpeg')} alt="" />
      </div>
      <Carousel.Caption>
       <div className="banner-detail">
        <span>Style Destination</span>
        <h2>Clean Fresh Fruit</h2>
        <p>From planter materials to style options, discover which <br /> planter is best for your space.</p>
        <div className="">
         <a href="/shop" className='text-white button'>Shop Now</a>
        </div>
       </div>
      </Carousel.Caption>
     </Carousel.Item>
     <Carousel.Item>
      <div className="banner-image">
      <img src={require('../images/asset 17.jpeg')} alt="" />
      </div>
      <Carousel.Caption>
       <div className="banner-detail">
        <span className='text-black'>Style Destination</span>
        <h2 className='text-black'>Smoothie Delicious</h2>
        <p className='text-black'>From planter materials to style options, discover which <br /> planter is best for your space.</p>
        <div>
         <a href="/shop" className='text-white button-1'>Shop Now</a>
        </div>
       </div>
      </Carousel.Caption>
     </Carousel.Item>
     
    </Carousel>
   </div>
  </>
 )
}
