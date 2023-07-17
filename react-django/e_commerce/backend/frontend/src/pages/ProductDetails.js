import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";

import Rating from "../components/Rating";
import Loading from "../components/Loading";
import Message from "../components/Message";

import { listProductDetails, createProductReview } from "../redux/actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/productConstants";

const ProductDetails = () => {

    // 1 is the default because it's the minimum we can put
    const [qty, setQty] = useState(1);
    const [reviewData, setReviewData] = useState({})

    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state.userLoginReducer);
    const { error, loading, product } = useSelector(state => state.productDetailsReducer);
    const {
        error: errorCreateReview,
        loading: loadingCreateReview,
        success: successCreateReview
    } = useSelector(state => state.productReviewCreateReducer);

    useEffect(() => {

        if (successCreateReview) {
            setReviewData({});
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }

        dispatch(listProductDetails(productId))
    }, [dispatch, productId, successCreateReview])

    const changeHandler = (key, value) => {
        setReviewData({ ...reviewData, [key]: value, })
    }

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        if(reviewData.rating > 0) {
            dispatch(createProductReview(productId, reviewData));
        }
    }

    return (
        <>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {
                loading
                    ? <Loading />
                    : error
                        ? <Message variant="danger">{error}</Message>
                        : <>
                            <Row>

                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant="flush">

                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating rating={product.rating} numReviews={product.numReviews} color={"#f8e825"} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col><strong>${product.price}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>{product.countInStock ? "In Stock" : "Out of Stock"}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {
                                                product.countInStock > 0 &&
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col xs="auto" className="my-1">
                                                            <Form.Select
                                                                value={qty}
                                                                onChange={e => {
                                                                    setQty(e.target.value);
                                                                }}
                                                            >
                                                                {
                                                                    // creates an array out of a number
                                                                    // values are filled from 0 to number - 1
                                                                    [...Array(product.countInStock).keys()].map((num) => {
                                                                        return <option value={num + 1} key={num + 1}>{num + 1}</option>
                                                                    })
                                                                }
                                                            </Form.Select>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            }

                                            <ListGroup.Item>
                                                <Row>
                                                    <Button
                                                        className="btn-block"
                                                        type="button"
                                                        disabled={!product.countInStock}
                                                        onClick={addToCartHandler}
                                                    >
                                                        Add to cart
                                                    </Button>
                                                </Row>
                                            </ListGroup.Item>


                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="my-5">
                                    <h4>Reviews</h4>
                                    {
                                        product.reviews.length === 0
                                            ? <Message variant="info">No reivews yet!</Message>
                                            : <>
                                                <ListGroup variant="flush">
                                                    {product.reviews.map(review => {
                                                        return (
                                                            <ListGroup.Item key={review._id}>
                                                                <strong>{review.name}</strong>
                                                                <Rating rating={review.rating} color={"#f8e825"} />
                                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                                <p>{review.review}</p>
                                                            </ListGroup.Item>
                                                        )
                                                    })}

                                                    <ListGroup.Item>
                                                        <h4>Write a review</h4>
                                                        {successCreateReview && <Message variant="success">Review created!</Message>}
                                                        {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                                                        {!userInfo
                                                            ? <Message variant="info">
                                                                <Link to="/login">Login to leave a review.</Link>
                                                            </Message>
                                                            : <Form onSubmit={reviewSubmitHandler}>
                                                                <Form.Group controlId="rating" className="my-2">
                                                                    <Form.Label>Rating</Form.Label>
                                                                    <Form.Select onChange={(e) => changeHandler(e.target.id, e.target.value)}>
                                                                        <option value={""}>Select a Rating</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                    </Form.Select>
                                                                </Form.Group>

                                                                <Form.Group controlId="review" className="my-2">
                                                                    <Form.Label>Review</Form.Label>
                                                                    <Form.Control
                                                                        value={reviewData.review}
                                                                        as="textarea"
                                                                        placeholder="Leave a comment here"
                                                                        style={{ height: '100px' }}
                                                                        onChange={(e) => changeHandler(e.target.id, e.target.value)}
                                                                    />
                                                                </Form.Group>

                                                                <Button disabled={loadingCreateReview} variant="dark" type="submit">Submit</Button>
                                                            </Form>
                                                        }
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </>
                                    }
                                </Col>
                            </Row>
                        </>
            }
        </>
    )
}

export default ProductDetails