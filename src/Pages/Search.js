import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Offcanvas, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Search({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setsearch] = useState("");
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:2200/search/${search}`)
      .then(function (response) {
        console.log(response.data);
        setdata(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [search])

  return (
    <>
      <span onClick={handleShow}>
        <BsSearch />
      </span>
      <Offcanvas show={show} onHide={handleClose} {...props} className="text-center">
        <Offcanvas.Header closeButton className='head-title'>
          <Offcanvas.Title className='mx-auto'>
            <span className="h2 fw-bold">
              Start typing and hit Enter
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='box-box'>
          <div>
            <div class=" ms-0 input-box d-flex align-items-center justify-item-center">
              <span><BsSearch /></span>
              <input type="text" placeholder="Search here..." value={search} onChange={(e) => setsearch(e.target.value)} />
              <button class="button m-0">Search</button>
            </div>
            <div className="detail my-4">
              <Row className='g-2'>
                {
                  data?.map((item) => {
                    return (
                      <>
                        <Col sm={4}>
                          <Link to={`/single/${item._id}`} onClick={() => handleClose()} className="bg-white d-flex rounded shadow text-black text-start">
                           
                              <div className="search-image">
                                <img src={item.thumb} width="100%" alt="" className='rounded-start' />
                              </div>
                              <div className="detail">
                                <p>{item.name}</p>
                                <p>${item.price}.00</p>
                              </div>
                          </Link>
                        </Col>
                      </>
                    )
                  })
                }
              </Row>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
