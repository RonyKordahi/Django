import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { login } from "../redux/actions/userActions";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(state => state.userLoginReducer);

    const redirect = location.search ? location.search.split("=")[1] : "";

    useEffect(() => {
        if (userInfo) {
            navigate(`/${redirect}`);
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Container>
            {loading
                ? <Loading />
                : <>
                    {error && <Message variant="danger">{error}</Message>}
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <h1>Sign In</h1>

                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId="email" className="py-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="py-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit">Sign In</Button>

                            </Form>

                            <Row className="py-3">
                                <Col>
                                    New Customer? <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>Signup</Link>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default Login