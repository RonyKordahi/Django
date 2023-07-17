import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { register } from "../redux/actions/userActions";

const Signup = () => {

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(state => state.userRegisterReducer);

    const redirect = location.search ? location.search.split("=")[1] : "";

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
    }, [navigate, userInfo, redirect])

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirm_password) {
            setMessage("Passwords do not match.");
        }
        else {
            dispatch(register(formData));
        }
    }

    return (
        <Container>
            {loading
                ? <Loading />
                : <>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <h1>Sign In</h1>

                            <Form onSubmit={submitHandler} onChange={(e) => changeHandler(e.target.id, e.target.value)}>

                                <Form.Group controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={formData.first_name}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="last_name" className="my-2">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        value={formData.last_name}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="email" className="my-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        value={formData.email}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="my-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="confirm_password" className="my-2">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.confirm_password}
                                        required
                                    />
                                </Form.Group>

                                <Button className="my-2" type="submit">Sign In</Button>

                            </Form>

                            <Row className="my-2">
                                <Col>
                                    Existing user? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default Signup