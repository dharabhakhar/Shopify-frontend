import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { BsChevronLeft } from "react-icons/bs";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
  const steps = ['Information', 'Shipping', 'Payment'];
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [number, setnumber] = useState(0);
  const [email, setemail] = useState('');
  const [country, setcountry] = useState('');
  const [name, setname] = useState('');
  const [add, setadd] = useState('');
  const [city, setcity] = useState('');
  const [zip, setzip] = useState('');
  const [state, setstate] = useState('');
  const [total, settotal] = useState('');
  const [final, setfinal] = useState('');
  const [data, setdata] = useState([]);
  const [code, setCode] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (email !== '' && country !== '' && name !== '' && add !== '' && city !== '' && zip !== '' && state !== '') {
      setCode(1);
    } else {
      setCode(0);
    }
    const sum = data.reduce((a, v) => a + v.total_price, 0);
    settotal(sum);
    setfinal(parseInt(sum) + 19);
  }, [email, country, name, add, city, zip, state, data])

  useEffect(() => {
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');
    axios.get(`http://localhost:2200/cart/get/${userId}`, {
      headers: { "Authorization": `${token}` }
    })
      .then(function (response) {
        console.log(response.data.cart_data);
        setdata(response.data.cart_data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var userId = localStorage.getItem('UserId');
    var token = localStorage.getItem('token');

    const productData = data.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      total_price: item.total_price
    }));
    axios.post(`http://localhost:2200/order/`, {
      userName: name,
      userEmail: email,
      userId: userId,
      product: productData,
      address: add,
      city: city,
      state: state,
      zipcode: zip,
      country: country
    }, {
      headers: { "Authorization": `${token}` }
    })
      .then(function (response) {
        console.log(response.data.order_data);
        if(response.data.status === 'success'){
          data.forEach(item => {
            axios.delete(`http://localhost:2200/cart/delete/${item._id}`, {
              headers: { Authorization: token }
            })
            .then(function (response) {
              console.log('Item deleted successfully', response.data);
            })
            .catch(function (error) {
              console.log('Error deleting item', error);
            });
          });
          navigate('/placed')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleNext = (event) => {
    event.preventDefault();
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    setnumber(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setnumber((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    setnumber(step);
  };

  const getstepcontent = (step) => {
    switch (step) {
      case 0:
        return (
          <form class="form-group mt-5">
            <h4>Contact</h4>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3 text-secondary"
            >
              <Form.Control type="email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="name@example.com" />
            </FloatingLabel>
            <h4 className='mb-2'>Shipping Address</h4>
            <select name="" id="" className='w-100 py-2 px-3' onChange={(e) => setcountry(e.target.value)}>
              <option value="0" disabled selected>--- Select Country ---</option>
              <option value="India">India</option>
            </select>
            <FloatingLabel
              controlId="floatingInput"
              label="Name"
              className="my-3 text-secondary"
            >
              <Form.Control type="text" value={name} onChange={(e) => { setname(e.target.value) }} placeholder="abc" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Address"
              className="text-secondary"
            >
              <Form.Control type="text" value={add} onChange={(e) => { setadd(e.target.value) }} placeholder="abc" />
            </FloatingLabel>
            <Row className='my-3'>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="City"
                  className="text-secondary"
                >
                  <Form.Control type="text" value={city} onChange={(e) => { setcity(e.target.value) }} placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="State"
                  className="mb-3 text-secondary"
                >
                  <Form.Control type="email" value={state} onChange={(e) => { setstate(e.target.value) }} placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Zip code"
                  className="mb-3 text-secondary"
                >
                  <Form.Control type="email" value={zip} onChange={(e) => { setzip(e.target.value) }} placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
            </Row>
            <input type="submit" value="Continue to Shipping" className='d-block ms-auto border-0 bg-black text-white py-2 px-4' disabled={code === 0} onClick={(e) => handleNext(e)} />
          </form>
        );
      case 1:
        return (
          <form class="form-group mt-5">
            <div className="border p-3">
              <p>Contact : <span className='text-lowercase'>{email}</span></p>
              <hr />
              <p>ship to : {add},{city},{state},{country},{zip}</p>
            </div>
            <h4 className='my-4'>Shipping Method</h4>
            <div className="border d-flex justify-content-center p-3">
              <p>Standard : </p><span className='text-lowercase ms-auto'>$19.00</span>
            </div>
            <div className="d-flex justify-content-center my-4">
              <div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    <BsChevronLeft />Return To Information
                  </Button>
                </Box>
              </div>
              <input type="submit" value="Continue to Payment" className='d-block ms-auto border-0 bg-black text-white py-2 px-4' onClick={(e) => handleNext(e)} />
            </div>
          </form>
        );
      case 2:
        return (
          <form class="form-group mt-5">
            <div className="border p-3">
              <p>Contact : <span className='text-lowercase'>{email}</span></p>
              <hr />
              <p>ship to : {add},{city},{state},{country},{zip}</p>
              <hr />
              <p>Method : Standard $19.00</p>
            </div>
            <h4 className='my-4'>Payment Method</h4>
            <div className="border d-flex justify-content-center p-3">
              <p>cash on delivery </p><span className='text-lowercase ms-auto'><MdOutlineRadioButtonChecked /></span>
            </div>
            <div className="d-flex justify-content-center my-4">
              <div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    <BsChevronLeft />Return To Shipping
                  </Button>
                </Box>
              </div>
              <input type="submit" value="Place Order" className='d-block ms-auto border-0 bg-black text-white py-2 px-4' onClick={(e) => handleSubmit(e)} />
            </div>
          </form>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <>
      <Row className='m-0'>
        <Col sm={7} className='spacer'>
          <Box sx={{ width: '80%', margin: 'auto' }}>
            <h2 className='mb-3'>Fiuce - Fruits Organic Food Responsive Shopify Theme </h2>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            <div>
              <Typography>{getstepcontent(number)}</Typography>
            </div>


          </Box>
        </Col>
        <div className="vr p-0"></div>
        <Col className='p-0 border-left bg-secondary bg-opacity-10'>
          <div className="spacer px-5">
            <Row>
              {
                data?.map((item) => {
                  return (
                    <>
                      <Col sm={2}>
                        <img src={item.thumb} alt="" width="100%" />
                      </Col>
                      <Col sm={7}>
                        <h6>{item.name}</h6>
                        <p>QTY: {item.quantity}</p>
                        <p>${item.price}.00</p>
                      </Col>
                      <Col sm={3}>
                        <p>${item.total_price}.00</p>
                      </Col>
                      <hr className='mt-2' />
                    </>
                  )
                })
              }
            </Row>
            <Row>
              <Col sm={9}><h6>Subtotal : </h6></Col>
              <Col sm={3}>${total}.00</Col>
            </Row>
            <Row>
              <Col sm={9}><h6>Shipping : </h6></Col>
              <Col sm={3}>$19.00</Col>
            </Row>
            <Row className='my-2'>
              <Col sm={9}><h4>Total : </h4></Col>
              <Col sm={3}>${final}.00</Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  )
}
