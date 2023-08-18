import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import img1 from '../images/img1.svg'
import img2 from '../images/img2.svg'
import img3 from '../images/img3.svg'
import img4 from '../images/img4.svg'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import Deal from './Deal';
import { MdDone } from 'react-icons/md';

export default function Single() {
  const [modalShow, setModalShow] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  let [val, setval] = useState(1);
  let [data, setdata] = useState('');
  let [load, setload] = useState(false);
  var obj = [
    { img: img1, name: 'worldwide shipping' },
    { img: img2, name: 'free 60-day returns' },
    { img: img3, name: '24 month warranty' },
    { img: img4, name: '100% secure checkout' }
  ]

  useEffect(() => {
    axios.get(`http://localhost:2200/single/${id}`)
      .then(function (response) {
        console.log(response.data.single_data);
        setdata(response.data.single_data);
        setload(true);
        var name = response.data.single_data.name;
        localStorage.setItem('title', name);
        const image = response.data.single_data.thumb;
        localStorage.setItem('image', image)
        const price = response.data.single_data.price;
        localStorage.setItem('price', price)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id])

  const handleClick = (image) => {
    setdata({ ...data, thumb: image });
  }

  const handleAdd = () => {
    const title = localStorage.getItem('title');
    const image = localStorage.getItem('image');
    const price = localStorage.getItem('price');
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');
    axios.post('http://localhost:2200/cart/', {
      userId: userId,
      name: title,
      price: price,
      thumb: image,
      quantity: val
    },
      {
        headers: { "Authorization": `${token}` }
      })
      .then(function (response) {
        console.log(response.data);
        setval(1);
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
  const handleAdd1 = () => {
    const title = localStorage.getItem('title');
    const image = localStorage.getItem('image');
    const price = localStorage.getItem('price');
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');
    axios.post('http://localhost:2200/wish/', {
      userId: userId,
      name: title,
      price: price,
      thumb: image,
      quantity: val
    },
      {
        headers: { "Authorization": `${token}` }
      })
      .then(function (response) {
        console.log(response.data);
        setval(1);
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

  const increase = () => {
    setval(val + 1);
  }
  const decrease = () => {
    if (val === 1) {
      setval(1);
    } else {
      setval(val - 1);
    }
  }

  if (load === true) {
    return (
      <>
        <div className="spacer-banner"></div>
        <div className="spacer">
          <Container>
            <Row>
              <Col sm={7}>
                <div className="single-image">
                  <img src={data.thumb} alt="" />
                </div>
                <div className="thumb-image-single d-flex mt-3">
                  {
                    data.images.map((item, i) => {
                      return (
                        <>
                          <div className="thumb-image me-3">
                            <img src={item} alt="" width="100%" onClick={() => handleClick(item)} />
                          </div>
                        </>
                      )
                    })
                  }
                </div>
              </Col>
              <Col sm={5}>
                <div className="single-data ps-5">
                  <div className="single-data-title">
                    <h3>{data.name}</h3>
                  </div>
                  <div className="single-data-price">
                    <p>${data.price}.00 USD</p>
                  </div>
                  <hr className='mt-5' />
                  <div className="single-data-desc">
                    <p className='text-secondary'>{data.desc}</p>
                  </div>
                  <h5 className='my-4 sold fw-bold'><span>16</span> sold in last <span>9</span> Hours</h5>
                  <h6 className='pt-2 mb-5 single-data-option'>
                    <a href="/delivery" className='fw-bold text-black me-3'>Delivery & Return</a>
                    <a href="/delivery" className='fw-bold text-black'>Ask a Question</a>
                  </h6>
                  <span className='border px-3 py-1 border-black fs-4 me-1' onClick={() => increase()}>+</span>
                  <span className='border px-3 py-1 border-black fs-4 me-1'>{val}</span>
                  <span className='border px-3 py-1 border-black fs-4 me-5' onClick={() => decrease()}>-</span>
                  <span className="button-1 me-3" onClick={() => handleAdd()}>Add To Cart
                  </span><br /><br /><br />
                  <span className="button-1 me-3" onClick={() => handleAdd1()}>Add To Whislist
                  </span>
                  <span className="button-1" onClick={() => navigate('/cart')}>Go To Cart</span>
                  <h6 className='my-4 sold fw-bold'>Real time <span>9</span> Visitor right now</h6>
                  <p>Category: <span className='text-secondary'>{data.category}</span></p>

                </div>
              </Col>
            </Row>

            <div className="spacer reveal">
              <Row className='g-3'>
                {
                  obj.map((n) => {
                    return (
                      <>
                        <Col sm={3} >
                          <div className='border p-4'>
                            <div className="obj-image">
                              <img src={n.img} alt="" width="100%" className='text-warning' />
                            </div>
                            <p className='fw-bold text-uppercase mt-3 single-data-letter text-center'>{n.name}</p>
                          </div>
                        </Col>
                      </>
                    )
                  })
                }
              </Row>
            </div>
          </Container>
          <hr className='m-0 reveal text-secondary' />
          <Container className='reveal'>
            <Tabs
              defaultActiveKey="desc"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="desc" title="Description">
                <span className='text-secondary fs-6'>{data.desc}</span>
                <Row className='mt-4'>
                  <Col sm={5}>
                    <div className="tab-image">
                      <img src={data.images[2]} alt="" width="100%" />
                    </div>
                  </Col>
                  <Col sm={7} className='p-5'>
                    <p className='text-uppercase'>Brand</p>
                    <hr className='line mt-1' />
                    <p className='text-secondary fs-6'>With eye-catching artwork, step-by-step diagrams, and illustrations that break down complicated ideas into manageable concepts, The Science Book will have readers conversant in genetic engineering, black holes, and global warming in no time. Along the way are found mini-biographies of the most well-known scientists, and a glossary of helpful scientific terms. For students, and students of the world, there is no better way to explore the fascinating, strange, and mysterious world of science than in The Science Book.</p>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="add" title="ADDITIONAL INFORMATION">
                <Row>
                  <Col sm={8} className='p-5'>
                    <p className='text-uppercase'>Brand</p>
                    <hr className='line mt-1' />
                    <p className='text-secondary fs-6'>With eye-catching artwork, step-by-step diagrams, and illustrations that break down complicated ideas into manageable concepts, The Science Book will have readers conversant in genetic engineering, black holes, and global warming in no time. Along the way are found mini-biographies of the most well-known scientists, and a glossary of helpful scientific terms. For students, and students of the world, there is no better way to explore the fascinating, strange, and mysterious world of science than in The Science Book.</p>
                    <p className='text-uppercase mt-4'>Descripion</p>
                    <hr className='line mt-1' />
                    <p className='text-secondary fs-6'>{data.desc}</p>
                  </Col>
                  <Col sm={4}>
                    <img src={data.thumb} alt="" width="100%" />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="review" title="REVIEW" ></Tab>
            </Tabs>
          </Container>
          <div className="reveal">
            <hr className='text-secondary' />
            <div className="footer-icons icons d-flex ">
              <p className='fs-6 me-3'><FaTwitter /></p>
              <p className='fs-6 me-3'><FaFacebookF /></p>
              <p className='fs-6 me-3'><FaInstagram /></p>
            </div>
            <hr className='text-secondary' />
          </div>
          <Deal />
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

}