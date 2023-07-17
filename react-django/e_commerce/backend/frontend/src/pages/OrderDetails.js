import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

import Message from "../components/Message";
import Loading from "../components/Loading";
import { StyledLink } from "../styles/styled-components";

import { getOrderDetails, payOrder, deliverOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../redux/constants/orderConstants";

const OrderDetails = () => {

    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { order, error, loading } = useSelector(state => state.orderDetailsReducer);

    // destructuring + renaming
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPayReducer);
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliverReducer);


    useEffect(() => {
        
        if(!userInfo) {
            navigate("/login");
        }

        if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, order, orderId, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }

    const successDeliverHandler = () => {
        dispatch(deliverOrder(orderId, order));
    }

    return (

        loading
            ? <Loading />
            : error
                ? <Message variant="danger">{error}</Message>
                : <>
                    <Row>
                        {/* left side (cart details) */}
                        <Col md={8}>
                            <h1>Order: {order._id}</h1>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p><strong>Email: </strong>{order.user.email}</p>
                                    <p>
                                        <strong>Shipping:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postal_code}, {order.shippingAddress.country}
                                    </p>
                                    {
                                        order.isDelivered
                                            ? <Message variant={"success"}>Delivered on {order.deliveredAt}</Message>
                                            : <Message variant={"warning"}>Order has not been delivered yet.</Message>
                                    }
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </p>
                                    {
                                        order.isPaid
                                            ? <Message variant={"success"}>Paid on {new Date(order.paidAt).toString()}</Message>
                                            : <Message variant={"warning"}>Order has not been paid yet.</Message>
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Ordered Items</h2>
                                    {
                                        !order.orderItems.length
                                            ? <Message variant="info">Your cart is empty.</Message>
                                            : <ListGroup variant="flush">
                                                {order.orderItems.map(orderItem => {
                                                    return (
                                                        <ListGroup.Item key={orderItem.product}>
                                                            <Row>
                                                                <Col md={1}>
                                                                    <Image src={orderItem.image} alt={orderItem.name} fluid rounded />
                                                                </Col>

                                                                <Col md={7} className="text-center">
                                                                    <StyledLink to={`/product/${orderItem.product}`}>{orderItem.name}</StyledLink>
                                                                </Col>
                                                                <Col md={4} className="text-end">
                                                                    {orderItem.qty} x ${orderItem.price} = ${(orderItem.price * orderItem.qty).toFixed(2)}
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
                                            <Col className="text-end">${order.subtotal}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col className="text-end">${order.shipping}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col className="text-end">${order.tax}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col className="text-end">${order.total}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {
                                        !order.isPaid && <ListGroup.Item>
                                            <Row>
                                                {loadingPay && <Loading />}
                                                {/* paypal from course not working, too much effort to look up real stuff */}
                                                <Button
                                                    type="button"
                                                    onClick={() => successPaymentHandler("success")}
                                                >
                                                    PayPal
                                                </Button>
                                            </Row>
                                        </ListGroup.Item>
                                    }

                                    {
                                        !order.isDelivered
                                        && userInfo
                                        && userInfo.isAdmin
                                        && order.isPaid
                                        && <ListGroup.Item>
                                            <Row>
                                                {loadingDeliver && <Loading />}
                                                {/* paypal from course not working, too much effort to look up real stuff */}
                                                <Button
                                                    type="button"
                                                    onClick={successDeliverHandler}
                                                >
                                                    Mark as delivered
                                                </Button>
                                            </Row>
                                        </ListGroup.Item>
                                    }

                                    {
                                        error && <ListGroup.Item>
                                            <Row>
                                                <Message variant="danger">{error}</Message>
                                            </Row>
                                        </ListGroup.Item>
                                    }

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
    )
}

export default OrderDetails;