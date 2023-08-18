import React from 'react'
import { Link } from 'react-router-dom'

export default function Placed() {
 return (
  <>
  <div className="place text-center">
  <h1 className='mb-5'>Your Order is placed</h1>
   <div class="contanier-1">
    <div class="main">
     <div class="road"  >
      <ul>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
      </ul>
      <div class="bus">
       <div class="back">
        <div class="back1door"></div>
        <div class="back2door"></div>
        <div class="join"></div>
       </div>
       <div class="front">
        <div class="black"></div>
        <div class="light1"></div>
        <div class="light2"></div>
       </div>
      </div>
      <div class="gift"></div>
     </div>
    </div>
   
   </div>
   <h4 className='cnt'><Link to={'/shop'}>Continue Shopping</Link></h4>
   </div>
  </>
 )
}
