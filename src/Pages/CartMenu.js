import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function CartMenu() {
 let [data, setdata] = useState([]);
 let [total, settotal] = useState(0);

 useEffect(() => {
  var userId = localStorage.getItem('UserId');
  var token = localStorage.getItem('token');
  axios.get(`http://localhost:2200/cart/get/${userId}`, {
   headers: { "Authorization": `${token}` }
  })
  .then(function (response) {
   console.log(response.data);
   setdata(response.data.cart_data);
   localStorage.setItem('itemId', null);
   })
   .catch(function (error) {
    console.log(error);
   })
  }, []);
  useEffect(() => {
   const sum = data.reduce((a, v) => a + v.total_price, 0);
   settotal(sum);
 }, [data]);

 const deletecart = (n) => {
  localStorage.setItem('itemId', n);
  var userId = localStorage.getItem('UserId');
  var token = localStorage.getItem('token');
  var itemId = localStorage.getItem('itemId');
  Promise.all([
   axios.delete(`http://localhost:2200/cart/delete/${itemId}`, {
    headers: { "Authorization": `${token}` }
   }),
   axios.get(`http://localhost:2200/cart/get/${userId}`, {
    headers: { "Authorization": `${token}` }
   })
    .then(function (response) {
     console.log(response.data);
     setdata(response.data.cart_data);
     localStorage.setItem('itemId', null);
     localStorage.setItem('total', data.reduce((a, v) => a = a + v.total_price, 0))
    })
    .catch(function (error) {
     console.log(error);
    })
  ])
 }
 console.log(data);
 if (data.length === 0) {
  return  (
   <>
    <div className="spacer-banner"></div>
    <div className="spacer">
    <h3>Shopping Cart</h3>
    <div className="spacer container">
     <p>Your cart is currently empty.</p>
     <p>Continue browsing <a href="/shop" className='text-primary'> here.</a></p>
    </div>
    </div>

   </>
  )
} else {
 return (
  <>
   <div className="spacer-banner"></div>
     <h3 className='mb-5'>Shopping Cart</h3>
     <Container>
     <table width="100%" align='center' cellPadding={15}>
      <tr className='text-center'>
       <th width="8%">Image</th>
       <th>Name</th>
       <th>price</th>
       <th>Quantity</th>
       <th>Total</th>
       <th>Remove</th>
      </tr>
      {
       data?.map((item) => {
        return (
         <>
         <tr>
          <td className='p-0'>
           <img src={item.thumb} alt="" width="100%" />
          </td>
          <td>
           <p>{item.name}</p>
           </td>
           <td>
           <p>${item.price}.00</p>
           </td>
           <td>
           <p>{item.quantity}</p>
           </td>
           <td>
            <p>{item.total_price}</p>
           </td>
          <th>
           <RiDeleteBin6Line className='fs-5' onClick={() => deletecart(item._id)} />
          </th>
      </tr>
         </>
        )
       })
      }
     </table>
       <a className='text-uppercase fs-6 b bg-black text-white mt-5' href='/shop'>Continue shopping</a>
     <div className="cart-footer my-5">
      <table width="100%">
      <div className="px-5">
      <h6 className='text-uppercase mt-5 mb-2'>cart totals</h6>
      <hr />
      <div className='d-flex'>
       <h4 className='me-5 pe-5'>Total: </h4>
       <h4 className='text ms-5 ps-5'>${total}.00</h4>
      </div>
      <div className="my-4">
       <a className='text-uppercase fs-6 b bg-black text-white' href='/checkOut'> proceed to CheckOut</a>
      </div>
      </div>
      </table>
     </div>
     </Container>
  </>
 )
}
}