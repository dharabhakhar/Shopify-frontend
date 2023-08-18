import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiCartAdd, BiHeart, BiSearchAlt, BiChevronRight } from "react-icons/bi";
import { MdDone } from 'react-icons/md';

export default function Shop() {
  const [modalShow, setModalShow] = useState(false);
  let [val, setval] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:2200/all`)
      .then(function (response) {
        console.log(response.data.data);
        setval(response.data.data);
        localStorage.setItem('npage', response.data.totalpage);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
  const npage = localStorage.getItem('npage');
  const numbers = [];
  for (let number = 1; number <= npage; number++) {
    numbers.push(
      <>
        {number}
      </>
    );
  }
  const changePage = (n) => {
    localStorage.setItem("page", n.props.children);
    var page = localStorage.getItem("page");
    axios.get(`http://localhost:2200/all/?page_no=${page}`)
      .then(function (response) {
        setval(response.data.data);
        // localStorage.setItem('npage', response.data.totalpage);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const handleAdd = (item) =>{
    const title = item.name;
    const image = item.thumb;
    const price = item.price;
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');
    axios.post('http://localhost:2200/cart/', {
      userId: userId,
      name: title,
      price: price,
      thumb: image,
      quantity: 1
    },
      {
        headers: { "Authorization": `${token}` }
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "Success" || response.data.status === "cart updated") {
          setModalShow(true);
        } else {
          setModalShow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const handleAdd1 = (item) =>{
    const title = item.name;
    const image = item.thumb;
    const price = item.price;
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');
    axios.post('http://localhost:2200/wish/', {
      userId: userId,
      name: title,
      price: price,
      thumb: image,
      quantity: 1
    },
      {
        headers: { "Authorization": `${token}` }
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "Success" || response.data.status === "wishlist updated") {
          setModalShow(true);
        } else {
          setModalShow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return (
    <>
      {/* <div className="spacer-banner"></div> */}
      <div className="shop-banner p-5">
        <div className="text-white shop-detail text-center pt-5">
          <p className='fs-1 pt-5 fw-bold'>Products</p>
          <span> Home <BiChevronRight /> Products</span>
        </div>
      </div>

      {/* product list */}
      <div className="spacer reveal">
        <Container>
          <Row>
            {
              val.map((item, i) => {
                return (
                  <>
                    <Col sm={3}>
                      <div className="seller-section text-center mt-5">
                        <div className="seller-image position-relative">
                          <img src={item.thumb} alt="" />
                          <div className="layer-seller">
                            <Link onClick={()=>handleAdd(item)} className='text-black bg-white rounded-circle py-1 px-2 fs-4 me-3'><BiCartAdd /></Link>
                            <Link to={`/single/${item._id}`} className='text-black bg-white rounded-circle py-1 px-2 fs-4 me-3'><BiSearchAlt /></Link>
                            <Link onClick={()=>handleAdd1(item)} className='text-black bg-white rounded-circle py-1 px-2 fs-4'><BiHeart /></Link>
                          </div>
                        </div>
                        <h6 className='mt-3 mb-2 fw-bold fs-5'>{item.name}</h6>
                        <p>${item.price}.00</p>
                      </div>
                    </Col>
                  </>
                )
              })
            }
            <nav>
              <ul className={`pagination page`}>
                {
                  numbers.map((n, i) => (
                    <li className={`page-item`} aria-current="page">
                      <Link className='page-link' onClick={() => changePage(n)}>{n}</Link>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </Row>
        </Container>
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='model-box'
          >
            <Modal.Body>
              <h5 className='text-danger'><MdDone />Added to cart successfully</h5>
            </Modal.Body>
          </Modal>
      </div>
    </>
  )
}