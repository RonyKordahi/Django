import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";

import { saveShippingAddress } from "../redux/actions/cartActions";

const Shipping = () => {

    const { shippingAddress } = useSelector(state => state.cartReducer);

    const [formData, setFormData] = useState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postal_code: shippingAddress.postal_code,
        country: shippingAddress.country,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData));
        navigate("/payment");
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <CheckoutSteps s1 s2 />
                    <h1>Shipping</h1>
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId="address" className="my-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                value={formData.address ? formData.address : ""}
                                onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="city" className="my-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={formData.city ? formData.city : ""}
                                onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="postal_code" className="my-3">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                value={formData.postal_code ? formData.postal_code : ""}
                                onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="country" className="my-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={formData.country ? formData.country : ""}
                                onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button className="my-3" type="submit">Continue</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Shipping