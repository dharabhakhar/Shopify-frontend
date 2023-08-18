import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { BiCartAdd, BiHeart, BiSearchAlt } from "react-icons/bi";
import { MdDone } from 'react-icons/md';

export default function Seller() {
  let [val, setval] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  let obj = [
    { img: require('../images/asset 37.jpeg'), off:"20", title:"Apple" },
    { img: require('../images/asset 38.jpeg'), off:"30", title:"Kiwi" },
    { img: require('../images/asset 39.jpeg'), off:"50", title:"Peach" },
    { img: require('../images/asset 40.jpeg'), off:"40", title:"Strawberry" }
  ]
  useEffect(() => {
    axios.get(`http://localhost:2200/all`)
      .then(function (response) {
        console.log(response.data.data);
        setval(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
  const handleAdd = (item) => {
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
  const handleAdd1 = (item) => {
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
      <div className="spacer reveal">
        <Container>
          <div className="header-seller text-center">
            <h3 className='text-uppercase fw-bold'>best seller</h3>
            <hr className='border-2 line-1' />
            <p className='text-secondary mt-3 fs-5'>Best Seller Product This Week!</p>
          </div>

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
                            <Link onClick={() => handleAdd(item)} className='text-black bg-white rounded-circle py-1 px-2 fs-4 me-3'><BiCartAdd /></Link>
                            <Link to={`/single/${item._id}`} className='text-black bg-white rounded-circle py-1 px-2 fs-4 me-3'><BiSearchAlt /></Link>
                            <Link onClick={() => handleAdd1(item)} className='text-black bg-white rounded-circle py-1 px-2 fs-4'><BiHeart /></Link>
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
          </Row>

        </Container>
      </div>
      <div className="reveal">
        <div className="seller-sec-2">
        <Row className='g-0'>
        {
          obj.map((sec, i) => {
            return (
              <>
              <Col sm={3}>
                <div className="sec2-image position-relative">
                  <img src={sec.img} alt="" width="100%" />
                  <div className="layer1-seller"></div>
                  <div className="sec2-image-detail position-absolute border-top border-black">
                      <p className='fs-5'>{sec.off}% OFF ALL</p>
                      <h4 className='fs-3 my-3 fw-bold'>{sec.title}</h4>
                      <Link to={'/shop'} className='button-1 m-0'>Shop Now</Link>
                  </div>
                </div>
                </Col>
              </>
            )
          })
        }
        </Row>
        </div>
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
