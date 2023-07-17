import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { StyledLink } from "../styles/styled-components";

import Message from "../components/Message";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const Cart = () => {

    const { productId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cartReducer);

    // check done in ProductDetails.js, guaranteed to always have a number
    const qty = Number(location.search.split("=")[1]);

    useEffect(() => {

        if (productId) {
            dispatch(addToCart(productId, qty));
        }

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    !cartItems.length
                        ? <Message variant="info">Your cart is empty! <Link to="/">Go back.</Link></Message>
                        : <ListGroup variant="flush">
                            {cartItems.map(item => {
                                return (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col md={3}>
                                                <StyledLink to={`/product/${item.product}`}>{item.name}</StyledLink>
                                            </Col>

                                            <Col md={2}>
                                                ${item.price}
                                            </Col>

                                            <Col md={3}>
                                                <Form.Select
                                                    value={item.qty}
                                                    onChange={e => {
                                                        dispatch(addToCart(item.product, Number(e.target.value)))
                                                    }}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((num) => {
                                                            return <option value={num + 1} key={num + 1}>{num + 1}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Col>

                                            <Col md={1}>
                                                <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className="fa-solid fa-trash" />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            $ ({cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)})
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Button
                                    type="button"
                                    disabled={!cartItems.length}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart