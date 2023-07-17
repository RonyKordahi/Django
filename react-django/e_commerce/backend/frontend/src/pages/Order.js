import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { StyledLink } from "../styles/styled-components";

import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";

const Order = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, shippingAddress, paymentMethod } = useSelector(state => state.cartReducer);
    const { order, error, success } = useSelector(state => state.orderCreateReducer);

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    const shipping = (subtotal > 100 ? 0 : 10).toFixed(2);
    const tax = (subtotal * 0.15).toFixed(2);
    const total = (parseFloat(tax) + parseFloat(shipping) + parseFloat(subtotal)).toFixed(2);

    useEffect(() => {
        if (!paymentMethod) {
            navigate("/payment");
        }
    }, [])

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            subtotal,
            shipping,
            tax,
            total,
        }))
    }

    return (
        <>
            <CheckoutSteps s1 s2 s3 s4 />
            <Row>
                {/* left side (cart details) */}
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postal_code}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong> {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered Items:</h2>
                            {
                                !cartItems.length
                                    ? <Message variant="info">Your cart is empty.</Message>
                                    : <ListGroup variant="flush">
                                        {cartItems.map(cartItem => {
                                            return (
                                                <ListGroup.Item key={cartItem.product}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                                                        </Col>

                                                        <Col md={7} className="text-center">
                                                            <StyledLink to={`/product/${cartItem.product}`}>{cartItem.name}</StyledLink>
                                                        </Col>
                                                        <Col md={4} className="text-end">
                                                            {cartItem.qty} x ${cartItem.price} = ${(cartItem.price * cartItem.qty).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        })}
                                    </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/* right side (order summary) */}
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Subtotal:</Col>
                                    <Col className="text-end">${subtotal}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col className="text-end">${shipping}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col className="text-end">${tax}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col className="text-end">${total}</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                error && <ListGroup.Item>
                                    <Row>
                                        <Message variant="danger">{error}</Message>
                                    </Row>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        type="button"
                                        disabled={!cartItems.length}
                                        onClick={placeOrder}
                                    >
                                        Place Order
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Order;