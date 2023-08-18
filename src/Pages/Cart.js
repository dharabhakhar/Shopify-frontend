import React, { useEffect } from 'react';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsCart } from 'react-icons/bs';
import { Col, Row } from 'react-bootstrap';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';

export default function Cart({ ...props }) {
  const [show, setShow] = useState(false);
  let [data, setdata] = useState([]);
  let [total, settotal] = useState(0);

  useEffect(() => {
    const sum = data.reduce((a, v) => a + v.total_price, 0);
    settotal(sum);
  }, [data]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
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
  };

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

  return (
    <>

      <span onClick={handleShow} className="fs-5">
        <BsCart />
      </span>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            {
              data?.map((item) => {
                return (
                  <>
                    <Col sm={4}>
                      <img src={item.thumb} alt="" width="100%" />
                    </Col>
                    <Col sm={6}>
                      <h4>{item.name}</h4>
                      <p>QTY: {item.quantity}</p>
                      <p>${item.price}.00</p>
                    </Col>
                    <Col sm={2}>
                      <RiDeleteBin6Line className='fs-5' onClick={() => deletecart(item._id)} />
                    </Col>
                    <hr className='mt-2' />
                  </>
                )
              })
            }
          </Row>
          <div className="spacer-banner"></div>
          <div className="cart-footer position-fixed">
            <div className="d-flex justify-content-between p-3 bg-white">
              <h4>Total: </h4>
              <h4 className='text'>${total}.00</h4>
            </div>
            <div className="d-flex">
              <a className='text-uppercase fs-6 b bg-dark text-white' href='/cart'>View Cart</a>
              <a className='text-uppercase fs-6 b bg-black text-white' href='/checkOut'>Check Out</a>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  )
}
