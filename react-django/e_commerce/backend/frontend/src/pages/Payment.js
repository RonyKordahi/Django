import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";

import { savePaymentMethod } from "../redux/actions/cartActions";

const Payment = () => {

    // Set to PayPal by default because it's the only option right now
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector(state => state.cartReducer);

    useEffect(() => {
        if (!Object.keys(shippingAddress).length) {
            navigate("/shipping")
        }

    }, [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/order");
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <CheckoutSteps s1 s2 s3 />
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId="paypal" className="my-3">
                            <Form.Label as="legend">Payment Method</Form.Label>
                            <Col>
                                <Form.Check
                                    type="radio"
                                    label="PayPal"
                                    name="payment_method"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    value="PayPal"
                                    checked
                                >

                                </Form.Check>
                            </Col>
                        </Form.Group>

                        <Button className="my-3" type="submit">Place Order</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Payment;