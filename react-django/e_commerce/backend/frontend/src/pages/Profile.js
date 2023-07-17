import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import Message from "../components/Message";
import Loading from "../components/Loading";

import { getUserOrders } from "../redux/actions/orderActions";
import { getUserDetails, updateUser } from "../redux/actions/userActions";

import { USER_UPDATE_RESET } from "../redux/constants/userConstants";


const Profile = () => {

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { success } = useSelector(state => state.userUpdateReducer);
    const { orders } = useSelector(state => state.orderUserListReducer);
    const { loading, error, user } = useSelector(state => state.userDetailsReducer);

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        }
        else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails("profile"));
                dispatch(getUserOrders());
            }
            else {
                const [fname, lname] = user.name.split(" ");
                setFormData({
                    ...formData,
                    _id: user._id,
                    first_name: fname,
                    last_name: lname,
                    email: user.email,
                    password: "",
                    confirm_password: ""
                })
            }
        }
    }, [dispatch, navigate, user, userInfo, success])

    const changeHandler = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            setMessage("Passwords do not match.");
        }
        else {
            setMessage("");
            dispatch(updateUser(formData));
        }
    }

    return (
        <Row>
            {loading
                ? <Loading />
                : <>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    <Col md={3} xl={3}>
                        <h2>Profile</h2>

                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId="first_name">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.first_name ? formData.first_name : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="last_name" className="my-2">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.last_name ? formData.last_name : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="my-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={formData.email ? formData.email : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="my-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.password ? formData.password : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="confirm_password" className="my-2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={formData.confirm_password ? formData.confirm_password : ""}
                                    onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                />
                            </Form.Group>

                            <Button className="my-2" type="submit">Update</Button>
                        </Form>
                    </Col>
                    <Col md={6} xl={9}>
                        <h2>Orders</h2>
                        <Table hover responsive className="text-center" bordered>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.total}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "❌"}</td>
                                            <td>{order.isDelivered ? "✅" : "❌"}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button type="button">Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </>
            }
        </Row>
    )
}

export default Profile