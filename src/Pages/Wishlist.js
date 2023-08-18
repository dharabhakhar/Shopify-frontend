import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Wishlist() {
 let [data, setdata] = useState([]);

 useEffect(() => {
  var userId = localStorage.getItem('UserId');
  var token = localStorage.getItem('token');
  axios.get(`http://localhost:2200/wish/get/${userId}`, {
   headers: { "Authorization": `${token}` }
  })
   .then(function (response) {
    console.log(response.data);
    setdata(response.data.list_data);
    localStorage.setItem('itemId', null);
   })
   .catch(function (error) {
    console.log(error);
   })
 }, []);

 const deletecart = (n) => {
  localStorage.setItem('itemId', n);
  var userId = localStorage.getItem('UserId');
  var token = localStorage.getItem('token');
  var itemId = localStorage.getItem('itemId');
  Promise.all([
   axios.delete(`http://localhost:2200/wish/delete/${itemId}`, {
    headers: { "Authorization": `${token}` }
   }),
   axios.get(`http://localhost:2200/wish/get/${userId}`, {
    headers: { "Authorization": `${token}` }
   })
    .then(function (response) {
     console.log(response.data);
     setdata(response.data.list_data);
     localStorage.setItem('itemId', null);
    })
    .catch(function (error) {
     console.log(error);
    })
  ])
 }
 console.log(data);
 if (data.length === 0) {
  return (
   <>
    <div className="spacer-banner"></div>
    <div className="spacer">
     <h3>Your Whislist</h3>
     <div className="spacer container">
      <p>Your wishlist is currently empty.</p>
      <p>Continue browsing <a href="/shop" className='text-primary'> here.</a></p>
     </div>
    </div>

   </>
  )
 } else {
  return (
   <>
    <div className="spacer-banner"></div>
    <h3 className='mb-5'>Your Whislist</h3>
    <Container>
     <table width="100%" align='center' cellPadding={15}>
      <tr className='text-center'>
       <th width="8%">Image</th>
       <th>Name</th>
       <th>price</th>
       <th>Quantity</th>
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
           <th>
            <RiDeleteBin6Line className='fs-5' onClick={() => deletecart(item._id)} />
           </th>
          </tr>
         </>
        )
       })
      }
     </table>
     <a className='text-uppercase fs-6 b bg-black text-white my-5' href='/shop'>Continue shopping</a>
    </Container>
   </>
  )
 }

}
